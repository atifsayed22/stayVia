import API from "../api/axios";

export const createPaymentOrder = async (bookingId) => {
  const response = await API.post(
    `/booking/${bookingId}/payment`
  );

  return response.data;
};

export const verifyPayment = async ({
  bookingId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const response = await API.post(
    `/booking/${bookingId}/payment/verify`,
    {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }
  );

  return response.data;
};