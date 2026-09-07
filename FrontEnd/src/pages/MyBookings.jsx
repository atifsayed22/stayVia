import { useEffect, useState } from "react";
import { useMyBookings } from "../hooks/useMyBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createPaymentOrder, verifyPayment } from "../services/paymentService";

const formatRemaining = (expiresAt, now) => {
  if (!now) return "--:--";

  const remainingSeconds = Math.max(
    0,
    Math.floor((new Date(expiresAt).getTime() - now) / 1000),
  );
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
};

export default function MyBookings() {
  const { bookings, error, loading } = useMyBookings();
  const navigate = useNavigate();
  const [now, setNow] = useState(0);
  const [paymentBookingId, setPaymentBookingId] = useState(null);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleContinuePayment = async (booking) => {
    setPaymentError("");
    setPaymentBookingId(booking._id);

    try {
      const paymentData = await createPaymentOrder(booking._id);
      const remainingSeconds = Math.max(
        1,
        Math.floor(
          paymentData.expiresInSeconds,
        ),
      );

      if (!window.Razorpay) {
        throw new Error("Payment service is unavailable. Please try again.");
      }

      const razorpay = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: paymentData.order.amount,
        currency: paymentData.order.currency,
        name: "StayVia",
        description: "Property Booking",
        timeout: remainingSeconds,
        order_id: paymentData.order.id,
        handler: async (response) => {
          try {
            await verifyPayment({
              bookingId: booking._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success("Booking confirmed successfully.");
            navigate(`/bookings/${booking._id}`);
          } catch (verificationError) {
            setPaymentError(
              verificationError.response?.data?.message ||
                "Payment could not be confirmed.",
            );
          } finally {
            setPaymentBookingId(null);
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentBookingId(null);
            setPaymentError(
              "Payment cancelled. Your reservation remains temporary until the timer ends.",
            );
          },
        },
      });

      razorpay.on("payment.failed", (response) => {
        setPaymentBookingId(null);
        setPaymentError(
          response.error?.description || "Payment failed. Please try again.",
        );
      });
      razorpay.open();
    } catch (paymentRequestError) {
      setPaymentBookingId(null);
      setPaymentError(
        paymentRequestError.response?.data?.message ||
          paymentRequestError.message ||
          "Unable to start payment.",
      );
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>

        <p className="mt-4 text-slate-500">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>

        <p className="mt-4 text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>

      {bookings?.length === 0 ? (
        <p className="mt-6 text-slate-500">You don't have any bookings yet.</p>
      ) : (
        <div className="mt-8 space-y-6">
          {paymentError && (
            <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {paymentError}
            </p>
          )}

          {bookings?.map((booking) => (
            
            <div
              key={booking._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
            
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{booking?.listing?.title}</h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {booking.listing?.address.city}, {booking.listing?.address.state}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    booking.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {booking.status === "pending" ? "Payment pending" : "Confirmed"}
                </span>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Check-in
                  </p>
                  <p className="mt-1">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Check-out
                  </p>
                  <p className="mt-1">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Guests
                  </p>
                  <p className="mt-1">{booking.guests}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="text-lg font-semibold">
                    ₹ {booking.totalPrice.toLocaleString("en-IN")}
                  </p>
                </div>
                {booking.status === "pending" ? (
                  <div className="text-right">
                    <p className="text-sm text-amber-700">
                      Pay within {formatRemaining(booking.expiresAt, now)}
                    </p>
                    <button
                      onClick={() => handleContinuePayment(booking)}
                      disabled={
                        paymentBookingId === booking._id ||
                        now > 0 && new Date(booking.expiresAt).getTime() <= now
                      }
                      className="mt-2 rounded-xl bg-rose-500 px-4 py-2 font-semibold text-white hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {paymentBookingId === booking._id
                        ? "Opening payment..."
                        : "Continue payment"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate(`/bookings/${booking._id}`)}
                    className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    View booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
