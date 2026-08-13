require("dotenv").config();

const mongoose = require("mongoose");
const { Worker } = require("bullmq");
const Booking = require("../models/booking");
const ReservationSlot = require("../models/reservationSlot");

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
});

const worker = new Worker(
  "booking-expiration",
  async (job) => {
    const { bookingId } = job.data;

    console.log("Expiration job received");
    console.log("Booking ID:", bookingId);

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      console.log("Booking not found");
      return;
    }

    console.log("Booking status:", booking.status);
    console.log("Payment status:", booking.paymentStatus);

    if (booking.status === "confirmed" &&  booking.paymentStatus === "paid") {
      console.log("Booking already paid/confirmed. Nothing to do.");
      return;
    }

    // Booking payment has not been completed, so we can expire the booking

    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Delete reservation slots
        await ReservationSlot.deleteMany(
          {
            booking: booking._id,
          },
          {
            session,
          },
        );

        // Mark booking as expired
        booking.status = "expired";

        await booking.save({ session });
      });

      console.log(`Booking ${bookingId} expired successfully`);
    } finally {
      await session.endSession();
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});
