const Booking = require("../models/booking");
const Listing = require("../models/listing");
const ReservationSlot = require("../models/reservationSlot");
const bookingQueue = require("../queues/bookingQueue");
const mongoose = require("mongoose");

module.exports.checkAvailability = async (req, res) => {
  const { listingId } = req.params;
  const { checkIn, checkOut } = req.query;

  if (!checkIn || !checkOut) {
    return res.status(400).json({
      success: false,
      message: "check-in and check-out  dates are required",
    });
  }

  const requestedCheckIn = new Date(checkIn);
  const requestedCheckOut = new Date(checkOut);

  if (
    Number.isNaN(requestedCheckIn.getTime()) ||
    Number.isNaN(requestedCheckOut.getTime())
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid Booking dates",
    });
  }

  if (requestedCheckIn >= requestedCheckOut) {
    return res.status(400).json({
      success: false,
      message: "Check-out must be after check-in.",
    });
  }

  const listing = await Listing.findById(listingId);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "listing Not found",
    });
  }

  const overlappingBooking = await Booking.findOne({
    listing: listingId,
    $or: [
      { status: "confirmed" },
      {
        status: "pending",
        paymentStatus: "pending",
        expiresAt: { $gt: new Date() },
      },
    ],
    checkIn: {
      $lt: requestedCheckOut,
    },
    checkOut: {
      $gt: requestedCheckIn,
    },
  });

  const canRetryOwnBooking =
    overlappingBooking &&
    overlappingBooking.guest.equals(req.user._id) &&
    overlappingBooking.status === "pending" &&
    overlappingBooking.paymentStatus === "pending" &&
    overlappingBooking.checkIn.getTime() === requestedCheckIn.getTime() &&
    overlappingBooking.checkOut.getTime() === requestedCheckOut.getTime() &&
    overlappingBooking.expiresAt > new Date();

  return res.status(200).json({
    success: true,
    available: !overlappingBooking || canRetryOwnBooking,
  });
};

module.exports.createBooking = async (req, res) => {
  const { listingId, checkIn, checkOut, guests } = req.body;

  // 1 . validate required fields
  if (!listingId || !checkOut || !checkIn || !guests) {
    return res.status(400).json({
      success: false,
      message: "Listing, check-in, check-out and guests are required",
    });
  }

  //2  . validate dates

  const requestedCheckIn = new Date(checkIn);
  const requestedCheckOut = new Date(checkOut);

  if (
    Number.isNaN(requestedCheckIn.getTime()) ||
    Number.isNaN(requestedCheckOut.getTime())
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid booking dates",
    });
  }

  if (requestedCheckIn >= requestedCheckOut) {
    return res.status(400).json({
      success: false,
      message: "Check-out must be after check-in",
    });
  }

  // 3 . find listings

  const listing = await Listing.findById(listingId);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  // 4 . validate guests
  if (guests < 1 || guests > listing.maxGuests) {
    return res.status(400).json({
      success: false,
      message: `This listing allows maximum ${listing.maxGuests} guests`,
    });
  }

  const existingPendingBooking = await Booking.findOne({
    guest: req.user._id,
    listing: listingId,
    checkIn: requestedCheckIn,
    checkOut: requestedCheckOut,
    status: "pending",
    paymentStatus: "pending",
    expiresAt: { $gt: new Date() },
  });

  if (existingPendingBooking) {
    return res.status(200).json({
      success: true,
      message: "Existing booking reservation can be paid again",
      booking: existingPendingBooking,
      reused: true,
    });
  }

  // -----------------------------------------
  // 5. Calculate nights
  // -----------------------------------------

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const nights = Math.ceil(
    (requestedCheckOut - requestedCheckIn) / millisecondsPerDay,
  );

  // -----------------------------------------
  // 6. Calculate price on backend
  // -----------------------------------------

  const pricePerNight = listing.price;

  const subtotal = pricePerNight * nights;

  const totalPrice = subtotal;

  // -----------------------------------------
  // 7. Start MongoDB transaction
  // -----------------------------------------

  const session = await mongoose.startSession();

  try {
    let createdBooking;

    await session.withTransaction(async () => {
      const expiredBookings = await Booking.find({
        listing: listingId,
        status: "pending",
        paymentStatus: "pending",
        expiresAt: { $lte: new Date() },
        checkIn: { $lt: requestedCheckOut },
        checkOut: { $gt: requestedCheckIn },
      })
        .select("_id")
        .session(session);

      const expiredBookingIds = expiredBookings.map((booking) => booking._id);

      if (expiredBookingIds.length > 0) {
        await ReservationSlot.deleteMany(
          { booking: { $in: expiredBookingIds } },
          { session },
        );
        await Booking.updateMany(
          { _id: { $in: expiredBookingIds }, status: "pending" },
          { $set: { status: "expired" } },
          { session },
        );
      }

      // -----------------------------------------
      // Create booking
      // -----------------------------------------

      // create a expiration time for payment if the booking is not confirmed within 15 minutes

      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      const [booking] = await Booking.create(
        [
          {
            guest: req.user._id,
            listing: listingId,

            checkIn: requestedCheckIn,
            checkOut: requestedCheckOut,

            guests,

            pricePerNight,
            nights,
            subtotal,
            totalPrice,

            status: "pending",
            paymentStatus: "pending",
            expiresAt,
          },
        ],
        { session },
      );

      // -----------------------------------------
      // Generate reservation slots
      // -----------------------------------------

      const slots = [];

      for (
        let date = new Date(requestedCheckIn);
        date < requestedCheckOut;
        date.setUTCDate(date.getUTCDate() + 1)
      ) {
        slots.push({
          listing: listingId,
          booking: booking._id,
          date: new Date(date),
        });
      }

      // -----------------------------------------
      // Claim reservation slots
      // -----------------------------------------

      await ReservationSlot.insertMany(slots, {
        session,
        ordered: true,
      });

      createdBooking = booking;
    });

    await bookingQueue.add(
      "expire-booking",
      {
        bookingId: createdBooking._id.toString(),
      },
      {
        delay: 15 * 60 * 1000,
      },
    );
    // -----------------------------------------
    // Transaction successful
    // -----------------------------------------

    return res.status(201).json({
      success: true,
      message: "Dates reserved successfully",
      booking: createdBooking,
    });
  } catch (error) {
    // -----------------------------------------
    // Duplicate reservation
    // -----------------------------------------

    if (error.code === 11000) {
      const retryableBooking = await Booking.findOne({
        guest: req.user._id,
        listing: listingId,
        checkIn: requestedCheckIn,
        checkOut: requestedCheckOut,
        status: "pending",
        paymentStatus: "pending",
        expiresAt: { $gt: new Date() },
      });

      if (retryableBooking) {
        return res.status(200).json({
          success: true,
          message: "Existing booking reservation can be paid again",
          booking: retryableBooking,
          reused: true,
        });
      }

      return res.status(409).json({
        success: false,
        message: "These dates are no longer available",
      });
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

//Get all bookings for a user
module.exports.getUserBookings = async (req, res) => {
  const guest = req.user._id;

  const bookings = await Booking.find({
    guest,
    $or: [
      {
        paymentStatus: "paid",
        status: { $in: ["confirmed", "completed"] },
      },
      {
        status: "pending",
        paymentStatus: "pending",
        expiresAt: { $gt: new Date() },
      },
    ],
  })
    .select(
      "listing checkIn checkOut guests pricePerNight nights totalPrice status paymentStatus paymentId expiresAt createdAt",
    )
    .populate("listing", "title images address")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    bookings,
  });
};

// Get bookings for listings owned by the logged-in host
module.exports.getHostBookings = async (req, res) => {
  const bookings = await Booking.find({
    paymentStatus: "paid",
    status: { $in: ["confirmed", "completed"] },
  })
    .populate({
      path: "listing",
      match: { owner: req.user._id },
      select: "title images address price",
    })
    .populate("guest", "username email")
    .select(
      "guest listing checkIn checkOut guests pricePerNight nights subtotal totalPrice status paymentStatus createdAt expiresAt",
    )
    .sort({ createdAt: -1 });

  const hostBookings = bookings.filter((booking) => booking.listing);

  return res.status(200).json({
    success: true,
    bookings: hostBookings,
  });
};

// get a specific booking by id for a user 

module.exports.getBookingById = async(req ,res) =>{
  const { bookingId } = req.params;
  const guest = req.user._id;

  const booking  = await Booking.findOne({
    _id: bookingId,
    guest :  guest , 
    status: {
      $in: ["confirmed", "completed"],
    },
    paymentStatus: "paid",
  })    .select(
      "listing checkIn checkOut guests pricePerNight nights subtotal totalPrice status paymentStatus paymentId createdAt"
    )
    .populate(
      "listing",
      "title images address"
    );


    if( !booking){
      return res.status(404).json({
        success: false,
        message: "Booking not found ",
      });
    }

    return res.status(200).json({
      success: true , 
      booking 
    })
}