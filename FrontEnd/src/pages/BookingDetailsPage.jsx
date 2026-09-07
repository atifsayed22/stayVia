import { Link, useParams } from "react-router-dom";
import { useBookingDetails } from "../hooks/useBookingDetails";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatCurrency = (value) =>
  `₹ ${Number(value || 0).toLocaleString("en-IN")}`;

export default function BookingDetailsPage() {
  const { bookingId } = useParams();

  const {
    booking,
    loading,
    error,
  } = useBookingDetails(bookingId);

  if (loading) {
    return <div>Loading booking...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!booking) {
    return <div>Booking not found</div>;
  }

  const listing = booking.listing;
  const location = [listing?.address?.city, listing?.address?.state]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Booking confirmed
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Your stay is reserved
        </h1>
        <p className="mt-2 text-slate-600">
          Payment was received and your reservation is confirmed.
        </p>
        <p className="mt-4 text-sm text-slate-600">
          Booking reference: <span className="font-semibold text-slate-900">{booking._id}</span>
        </p>
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {listing?.images?.[0]?.url && (
          <img
            src={listing.images[0].url}
            alt={listing.title}
            className="h-56 w-full object-cover"
          />
        )}

        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-900">{listing?.title}</h2>
          {location && <p className="mt-1 text-slate-500">{location}</p>}

          <div className="mt-6 grid gap-5 border-y border-slate-100 py-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Check-in</p>
              <p className="mt-1 font-medium text-slate-900">{formatDate(booking.checkIn)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Check-out</p>
              <p className="mt-1 font-medium text-slate-900">{formatDate(booking.checkOut)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Guests</p>
              <p className="mt-1 font-medium text-slate-900">{booking.guests}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>{formatCurrency(booking.pricePerNight)} x {booking.nights} nights</span>
              <span>{formatCurrency(booking.subtotal)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-4 text-lg font-bold text-slate-900">
              <span>Total paid</span>
              <span>{formatCurrency(booking.totalPrice)}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
            <p>
              <span className="text-slate-500">Booking status</span>
              <br />
              <span className="font-semibold capitalize text-slate-900">{booking.status}</span>
            </p>
            <p>
              <span className="text-slate-500">Payment status</span>
              <br />
              <span className="font-semibold capitalize text-slate-900">{booking.paymentStatus}</span>
            </p>
            {booking.paymentId && (
              <p className="sm:col-span-2">
                <span className="text-slate-500">Payment reference</span>
                <br />
                <span className="break-all font-medium text-slate-900">{booking.paymentId}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      <Link
        to="/bookings"
        className="mt-6 inline-block font-semibold text-rose-600 hover:text-rose-700"
      >
        Back to my bookings
      </Link>
    </main>
  );
}