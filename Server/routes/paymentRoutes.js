const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const wrapAsync = require("../utils/wrapAsync");
const payment = require("../controller/paymentController");


router.post("/bookings/:bookingId/orders", protect, wrapAsync(payment.createOrder));

module.exports = router;
