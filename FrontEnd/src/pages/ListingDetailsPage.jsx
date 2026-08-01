import { Navigate, useParams } from "react-router-dom";

import { useListing } from "../hooks/useListing";

import ListingGallery from "../components/listing-details/ListingGallery";
import ListingInfo from "../components/listing-details/ListingInfo";
import Amenities from "../components/listing-details/Amenities";
import HouseRules from "../components/listing-details/HouseRules";
import BookingCard from "../components/listing-details/BookingCard";
import ReviewSection from "../components/listing-details/ReviewSection";
import LocationSection from "../components/listing-details/LocationSection";

export default function ListingDetailsPage() {
  const { id } = useParams();

  const {
    listing,
    loading,
    error,
  } = useListing(id);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="h-[70vh] animate-pulse rounded-3xl bg-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-xl font-semibold text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  if (!listing) {
    return <Navigate to="/listings" replace />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">

      <div className="grid gap-8 lg:grid-cols-[1.5fr_420px]">

        <section className="space-y-8">

          <ListingGallery listing={listing} />

          <ListingInfo listing={listing} />

          <Amenities listing={listing} />

          <HouseRules listing={listing} />

          <ReviewSection listingId={listing._id} />

          <LocationSection listing={listing} />

        </section>

        <aside>

          <BookingCard listing={listing} />

        </aside>

      </div>

    </div>
  );
}