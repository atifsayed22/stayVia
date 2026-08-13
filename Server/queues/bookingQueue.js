const { Queue } = require("bullmq");

const bookingQueue = new Queue("booking-expiration", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

module.exports = bookingQueue;