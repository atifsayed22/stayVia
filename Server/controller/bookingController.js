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
    status: {
      $in: ["pending", "confirmed"],
    },
    checkIn: {
      $lt: requestedCheckOut,
    },
    checkOut: {
      $gt: requestedCheckIn,
    },
  });

  return res.status(200).json({
    success: true,
    available: !overlappingBooking,
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

    // 4 . validate guests

    if (guests < 1 || guests > listing.maxGuests) {
      return res.status(400).json({
        success: false,
        message: `This listing allows maximum ${listing.maxGuests} guests`,
      });
    }
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
      // -----------------------------------------
      // Create booking
      // -----------------------------------------

      // create a expiration time for payment if the booking is not confirmed within 15 minutes

      const expiresAt = new Date(Date.now() + 120 * 1000);

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
        delay: 120 * 1000,
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
