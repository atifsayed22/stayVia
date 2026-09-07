require("dotenv").config();

const mongoose = require("mongoose");
const { Worker } = require("bullmq");
const Booking = require("../models/booking");
const ReservationSlot = require("../models/reservationSlot");

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
});

const redisConnection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD || undefined,
};

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

    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        const result = await Booking.updateOne(
          {
            _id: booking._id,
            status: "pending",
            paymentStatus: "pending",
            expiresAt: { $lte: new Date() },
          },
          { $set: { status: "expired" } },
          { session },
        );

        if (result.modifiedCount === 1) {
          await ReservationSlot.deleteMany(
            { booking: booking._id },
            { session },
          );
          console.log(`Booking ${bookingId} expired successfully`);
        } else {
          console.log(`Booking ${bookingId} was already completed or expired`);
        }
      });
    } finally {
      await session.endSession();
    }
  },
  {
    connection: redisConnection,
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});
