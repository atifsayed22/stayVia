const razorpay  = require('../utils/razorpay');
const Booking = require('../models/booking');
const crypto = require("crypto");


module.exports.createOrder = async (req , res)=>{
    const {bookingId} = req.params ; 
   

    const booking  = await Booking.findById(bookingId);

    if(!booking){
        return res.status(404).json({
            success : false , 
            message : "Booking not found"
        })
    }

    if(!booking.guest.equals(req.user._id)){
        return res.status(403).json({
            success : false , 
            message : "You are not authorized to create order for this booking"
        })
    }
    //booking shoule be in pending state to create order
    if(booking.status !== 'pending'){
        return res.status(400).json({
            success : false ,
            message : "Booking is not in pending state"
        })
    }

    //payment should be pending 

    if(booking.paymentStatus !=='pending'){
        return res.status(400).json({
            success : false , 
            message : 'payment is already done for this booking'
        })
    }

    //booking should not be expired
    if(booking.expiresAt && booking.expiresAt < new Date()){
        return res.status(400).json({
            success : false , 
            message : 'Booking is expired'
        })
    }

    // 7. Create Razorpay order
    const amount = Math.round(booking.totalPrice * 100);
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `booking_${booking._id}`,
      notes: {
        bookingId: booking._id.toString(),
      },
    });

     // 8. Save Razorpay order ID
    booking.razorpayOrderId = order.id;

    await booking.save();


     return res.status(201).json({
      success: true,
      message: "Payment order created successfully",
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
}



module.exports.verifyPayment = async (req, res) => {
  const { bookingId } = req.params;

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature
  ) {
    return res.status(400).json({
      success: false,
      message: "Payment details are required",
    });
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }

  // Make sure this booking belongs to the logged-in user
  if (!booking.guest.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to verify this payment",
    });
  }

  // Make sure the Razorpay order belongs to this booking
  if (booking.razorpayOrderId !== razorpay_order_id) {
    return res.status(400).json({
      success: false,
      message: "Payment order does not match this booking",
    });
  }

  // Create the signature expected from Razorpay
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(
      `${razorpay_order_id}|${razorpay_payment_id}`
    )
    .digest("hex");

  // Compare signatures
  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment signature",
    });
  }

  // Payment is verified
  booking.paymentId = razorpay_payment_id;
  booking.paymentStatus = "paid";
  booking.status = "confirmed";

  await booking.save();

  return res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    booking: {
      id: booking._id,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      paymentId: booking.paymentId,
    },
  });
};