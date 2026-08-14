import { useParams } from "react-router-dom";
import { useBookingDetails } from "../hooks/useBookingDetails";


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

  return (
    <div>
      <h1>{booking.listing.title}</h1>

      <p>
        {booking.listing.address.city},{" "}
        {booking.listing.address.state}
      </p>

      <p>
        Check-in:{" "}
        {new Date(booking.checkIn).toLocaleDateString()}
      </p>

      <p>
        Check-out:{" "}
        {new Date(booking.checkOut).toLocaleDateString()}
      </p>

      <p>Guests: {booking.guests}</p>

      <p>Total: ₹ {booking.totalPrice}</p>

      <p>Status: {booking.status}</p>

      <p>Payment: {booking.paymentStatus}</p>
    </div>
  );
}