const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");
const wrapAsync = require("../utils/wrapAsync");
const booking = require("../controller/bookingController");

// Check whether a listing is available for a date range
router.get(
  "/availability/:listingId",
  protect,
  wrapAsync(booking.checkAvailability)
);
// Create booking
router.post(
  "/",
  protect,
  wrapAsync(booking.createBooking)
);
module.exports = router;