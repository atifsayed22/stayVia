import { useEffect, useState } from "react";
import { getHostBookings } from "../../services/bookingService";

const formatDate = (value) => new Date(value).toLocaleDateString();

export default function HostBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getHostBookings()
      .then((data) => {
        if (active) setBookings(data || []);
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              "Failed to load your bookings.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>
        <p className="mt-2 text-slate-500">
          Reservations received for your listings.
        </p>
      </div>

      {loading && <p className="mt-8 text-slate-500">Loading bookings...</p>}
      {error && <p className="mt-8 text-red-600">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p className="mt-8 text-slate-500">No bookings yet.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Guest</th>
                <th className="px-5 py-4">Listing</th>
                <th className="px-5 py-4">Stay</th>
                <th className="px-5 py-4">Guests</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">
                      {booking.guest?.username || "Guest"}
                    </div>
                    <div className="text-slate-500">{booking.guest?.email}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    {booking.listing?.title || "Listing unavailable"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{booking.guests}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                    ₹ {booking.totalPrice}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium capitalize text-slate-900">
                      {booking.status}
                    </div>
                    <div className="text-xs capitalize text-slate-500">
                      Payment: {booking.paymentStatus}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
