import { useMyBookings } from "../hooks/useMyBookings";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const { bookings, error, loading } = useMyBookings();
  const navigate = useNavigate();

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
          {bookings?.map((booking) => (
            <div
              key={booking._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{booking.listing.title}</h2>

              <p className="mt-1 text-sm text-slate-500">
                {booking.listing.address.city}, {booking.listing.address.state}
              </p>

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
                <button
                  onClick={() => navigate(`/bookings/${booking._id}`)}
                  className="..."
                >
                  View booking
                </button>

                <div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium capitalize">
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
