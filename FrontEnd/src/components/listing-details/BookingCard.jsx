import { useState } from "react";
import { formatPrice } from "../../utils/listingUtils";

import toast from "react-hot-toast";
import {
  checkAvailability,
  createBooking,
} from "../../services/bookingService";
import {
  createPaymentOrder,
  verifyPayment,
} from "../../services/paymentService";

export default function BookingCard({ listing }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [creatingBooking, setCreatingBooking] = useState(false);

  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      return 0;
    }

    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);

    const difference = end - start;

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  const totalPrice = nights * listing.price;

  // Check availability
  const handleCheckAvailability = async () => {
    setError("");
    setAvailability(null);

    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }

    if (checkIn >= checkOut) {
      setError("Check-out must be after check-in.");
      return;
    }

    try {
      setCheckingAvailability(true);
      const data = await checkAvailability(listing._id, checkIn, checkOut);

      setAvailability(data.available);
    } catch (error) {
      toast.error(error?.response?.data?.message);

      setError(error.response?.data?.message || "Failed to check availability");
    } finally {
      setCheckingAvailability(false);
    }
  };

  // create boooking
  const handleCreateBooking = async () => {
    setError("");

    if (!checkIn || !checkOut) {
      setError("Please select your dates.");
      return;
    }

    if (checkIn >= checkOut) {
      setError("Check-out must be after check-in.");
      return;
    }

    if (availability !== true) {
      setError("Please check availability first.");
      return;
    }

    try {
      setCreatingBooking(true);

      const data = await createBooking({
        listingId: listing._id,
        checkIn,
        checkOut,
        guests,
      });

      const bookingId = data.booking._id;

      console.log("Booking created successfully:", data);

      toast.success("Booking created Succesfully ");

      // For now, just verify the booking was created.
      const paymentData = await createPaymentOrder(bookingId);

      // Payment will be connected in the next step.
      const order = paymentData.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,
        currency: order.currency,

        name: "StayVia",
        description: "Property Booking",
        timeout: 15 * 60,

        order_id: order.id,

        handler: async function (response) {
          try {
            console.log("Payment successful:", response);

            const verification = await verifyPayment({
              bookingId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            console.log("Payment verification:", verification);
          } catch (error) {
            console.error("Payment verification failed:", error);

            setError(
              error.response?.data?.message || "Payment verification failed",
            );
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Create booking error:", error);

      if (error.response?.status === 409) {
        setAvailability(false);
        setError("These dates were just booked by someone else.");
      } else {
        setError(error.response?.data?.message || "Failed to create booking");
      }
    } finally {
      setCreatingBooking(false);
    }
  };

  return (
    <div className="sticky top-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
      {/* Price */}
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-slate-900">
          ₹ {formatPrice(listing.price)}
        </span>

        <span className="pb-1 text-slate-500">/ night</span>
      </div>

      {/* Booking Form */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-300">
        {/* Dates */}
        <div className="grid grid-cols-2">
          {/* Check In */}
          <div className="border-r border-b p-4">
            <label className="block text-xs font-semibold uppercase text-slate-500">
              Check In
            </label>

            <input
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setAvailability(null);
                setError("");
              }}
              className="mt-2 w-full border-none p-0 text-sm outline-none"
            />
          </div>

          {/* Check Out */}
          <div className="border-b p-4">
            <label className="block text-xs font-semibold uppercase text-slate-500">
              Check Out
            </label>

            <input
              type="date"
              value={checkOut}
              min={checkIn || undefined}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setAvailability(null);
                setError("");
              }}
              className="mt-2 w-full border-none p-0 text-sm outline-none"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="p-4">
          <label className="block text-xs font-semibold uppercase text-slate-500">
            Guests
          </label>

          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-2 w-full border-none bg-transparent outline-none"
          >
            {Array.from({ length: listing.maxGuests }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Guest{i > 0 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Check Availability */}
      {availability === true ? (
        <button
          onClick={handleCreateBooking}
          disabled={creatingBooking}
          className="mt-6 w-full rounded-xl bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {creatingBooking ? "Creating booking..." : "Reserve & Pay"}
        </button>
      ) : (
        <button
          onClick={handleCheckAvailability}
          disabled={checkingAvailability}
          className="mt-6 w-full rounded-xl bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {checkingAvailability ? "Checking..." : "Check Availability"}
        </button>
      )}

      {/* Error */}
      {error && (
        <p className="mt-3 text-center text-sm text-red-600">{error}</p>
      )}

      {/* Availability */}
      {availability === true && (
        <p className="mt-3 text-center text-sm font-medium text-green-600">
          ✓ These dates are available
        </p>
      )}

      {availability === false && (
        <p className="mt-3 text-center text-sm font-medium text-red-600">
          ✕ These dates are not available
        </p>
      )}

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="mt-8 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>
              ₹ {formatPrice(listing.price)} × {nights}{" "}
              {nights === 1 ? "night" : "nights"}
            </span>

            <span>₹ {formatPrice(totalPrice)}</span>
          </div>

          <hr />

          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>

            <span>₹ {formatPrice(totalPrice)}</span>
          </div>
        </div>
      )}

      {/* Current Stage Message */}
      <p className="mt-3 text-center text-sm text-slate-500">
        You won't be charged yet.
      </p>
    </div>
  );
}
