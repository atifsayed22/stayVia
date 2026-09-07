const razorpay = require("../utils/razorpay");
const Booking = require("../models/booking");
const ReservationSlot = require("../models/reservationSlot");
const mongoose = require("mongoose");
const crypto = require("crypto");

const paymentAmountFor = (booking) => Math.round(booking.totalPrice * 100);

const refundCapturedPayment = async (paymentId, amount) => {
  try {
    await razorpay.payments.refund(paymentId, { amount });
  } catch (error) {
    console.error("Unable to refund payment automatically:", error);
  }
};

module.exports.createOrder = async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findOne({
    _id: bookingId,
    guest: req.user._id,
    status: "pending",
    paymentStatus: "pending",
    expiresAt: { $gt: new Date() },
  });

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found, expired, or already paid",
    });
  }

  let order;

  if (booking.razorpayOrderId) {
    try {
      order = await razorpay.orders.fetch(booking.razorpayOrderId);
    } catch (error) {
      order = null;
    }
  }

  if (!order) {
    const newOrder = await razorpay.orders.create({
      amount: paymentAmountFor(booking),
      currency: "INR",
      receipt: `booking_${booking._id}`,
      notes: { bookingId: booking._id.toString() },
    });

    const savedBooking = await Booking.findOneAndUpdate(
      {
        _id: booking._id,
        status: "pending",
        paymentStatus: "pending",
        expiresAt: { $gt: new Date() },
        razorpayOrderId: null,
      },
      { $set: { razorpayOrderId: newOrder.id } },
      { new: true },
    );

    if (!savedBooking) {
      return res.status(409).json({
        success: false,
        message: "Booking changed while preparing payment. Please try again.",
      });
    }

    order = newOrder;
  }

  if (order.amount !== paymentAmountFor(booking) || order.currency !== "INR") {
    return res.status(409).json({
      success: false,
      message: "Payment amount does not match the booking.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Payment order ready",
    order: { id: order.id, amount: order.amount, currency: order.currency },
    expiresAt: booking.expiresAt,
    expiresInSeconds: Math.max(
      0,
      Math.floor((booking.expiresAt.getTime() - Date.now()) / 1000),
    ),
  });
};

module.exports.verifyPayment = async (req, res) => {
  const { bookingId } = req.params;
  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = req.body;

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({
      success: false,
      message: "Payment details are required",
    });
  }

  const booking = await Booking.findOne({ _id: bookingId, guest: req.user._id });

  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }

  if (
    booking.status === "confirmed" &&
    booking.paymentStatus === "paid" &&
    booking.paymentId === paymentId
  ) {
    return res.status(200).json({
      success: true,
      message: "Payment was already verified",
      booking: {
        id: booking._id,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        paymentId: booking.paymentId,
      },
    });
  }

  if (booking.status !== "pending" || booking.paymentStatus !== "pending") {
    return res.status(409).json({
      success: false,
      message: "This booking can no longer accept payment.",
    });
  }

  if (booking.razorpayOrderId !== orderId) {
    return res.status(400).json({
      success: false,
      message: "Payment order does not match this booking",
    });
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const signaturesMatch =
    signature.length === generatedSignature.length &&
    crypto.timingSafeEqual(Buffer.from(generatedSignature), Buffer.from(signature));

  if (!signaturesMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment signature",
    });
  }

  const payment = await razorpay.payments.fetch(paymentId);

  if (
    payment.order_id !== orderId ||
    payment.amount !== paymentAmountFor(booking) ||
    payment.currency !== "INR"
  ) {
    return res.status(400).json({
      success: false,
      message: "Payment details do not match the booking",
    });
  }

  if (payment.status !== "captured") {
    return res.status(409).json({
      success: false,
      message: "Payment has not been captured yet",
    });
  }

  const session = await mongoose.startSession();
  let confirmedBooking;

  try {
    await session.withTransaction(async () => {
      const activeBooking = await Booking.findOne({
        _id: bookingId,
        guest: req.user._id,
        status: "pending",
        paymentStatus: "pending",
        razorpayOrderId: orderId,
        expiresAt: { $gt: new Date() },
      }).session(session);

      if (!activeBooking) return;

      const reservedSlotCount = await ReservationSlot.countDocuments({
        booking: activeBooking._id,
      }).session(session);

      if (reservedSlotCount !== activeBooking.nights) return;

      confirmedBooking = await Booking.findOneAndUpdate(
        {
          _id: activeBooking._id,
          status: "pending",
          paymentStatus: "pending",
          expiresAt: { $gt: new Date() },
        },
        {
          $set: {
            paymentId,
            paymentStatus: "paid",
            status: "confirmed",
          },
        },
        { new: true, session },
      );
    });
  } finally {
    await session.endSession();
  }

  if (!confirmedBooking) {
    await refundCapturedPayment(paymentId, payment.amount);
    return res.status(409).json({
      success: false,
      message: "The reservation expired before payment was confirmed. Your payment will be refunded.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    booking: {
      id: confirmedBooking._id,
      status: confirmedBooking.status,
      paymentStatus: confirmedBooking.paymentStatus,
      paymentId: confirmedBooking.paymentId,
    },
  });
};

module.exports.handleWebhook = async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(req.body)
    .digest("hex");

  if (
    !signature ||
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature))
  ) {
    return res.status(400).json({ success: false, message: "Invalid webhook signature" });
  }

  const event = JSON.parse(req.body.toString("utf8"));

  if (event.event !== "payment.captured") {
    return res.status(200).json({ success: true });
  }

  const payment = event.payload?.payment?.entity;

  if (!payment?.order_id || !payment.id) {
    return res.status(400).json({ success: false, message: "Invalid payment event" });
  }

  const booking = await Booking.findOne({ razorpayOrderId: payment.order_id });

  if (!booking) {
    return res.status(200).json({ success: true });
  }

  if (booking.status === "confirmed" && booking.paymentStatus === "paid") {
    return res.status(200).json({ success: true });
  }

  const session = await mongoose.startSession();
  let confirmedBooking;

  try {
    await session.withTransaction(async () => {
      const activeBooking = await Booking.findOne({
        _id: booking._id,
        status: "pending",
        paymentStatus: "pending",
        razorpayOrderId: payment.order_id,
        expiresAt: { $gt: new Date() },
      }).session(session);

      if (!activeBooking) return;

      const slotCount = await ReservationSlot.countDocuments({
        booking: activeBooking._id,
      }).session(session);

      if (slotCount !== activeBooking.nights) return;

      confirmedBooking = await Booking.findOneAndUpdate(
        {
          _id: activeBooking._id,
          status: "pending",
          paymentStatus: "pending",
          expiresAt: { $gt: new Date() },
        },
        {
          $set: {
            paymentId: payment.id,
            paymentStatus: "paid",
            status: "confirmed",
          },
        },
        { new: true, session },
      );
    });
  } finally {
    await session.endSession();
  }

  if (!confirmedBooking) {
    await refundCapturedPayment(payment.id, payment.amount);
  }

  return res.status(200).json({ success: true });
};