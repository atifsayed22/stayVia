const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");
const wrapAsync = require("../utils/wrapAsync");
const booking = require("../controller/bookingController");
const payment = require("../controller/paymentController");

// Check whether a listing is available for a date range
router.get(
  "/availability/:listingId",
  protect,
  wrapAsync(booking.checkAvailability),
);
// Create booking
router.post("/", protect, wrapAsync(booking.createBooking));
router.post(
  "/:bookingId/payment/verify",
  protect,
  wrapAsync(payment.verifyPayment),
);
router.post("/:bookingId/payment", protect, wrapAsync(payment.createOrder));
module.exports = router;
