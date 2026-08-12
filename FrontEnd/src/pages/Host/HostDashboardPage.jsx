import { Link } from "react-router-dom";

import { useHostListings } from "../../hooks/useHostListings";
import HostStatCard from "../../components/Host/HostStatCard";

export default function HostDashboardPage() {
  const {
    listings,
    loading,
    error,
  } = useHostListings();

  // -------------------------
  // Statistics
  // -------------------------

  const totalListings = listings.length;
  console.log("toatl listings" , totalListings)

  const publishedListings = listings.filter(
    (listing) => listing.status === "published"
  ).length;

  const listingsWithReviews = listings.filter(
    (listing) => listing.reviewCount > 0
  );

  const averageRating =
    listingsWithReviews.length > 0
      ? (
          listingsWithReviews.reduce(
            (total, listing) =>
              total + (listing.averageRating || 0),
            0
          ) / listingsWithReviews.length
        ).toFixed(1)
      : "0.0";

  // -------------------------
  // Loading
  // -------------------------

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />

        <div className="mt-2 h-5 w-80 animate-pulse rounded bg-slate-200" />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-3xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  // -------------------------
  // Error
  // -------------------------

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-4 text-red-600">
          {error}
        </p>
      </div>
    );
  }

  // -------------------------
  // Dashboard
  // -------------------------

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here's an overview of your hosting business.
        </p>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <HostStatCard
          title="Total Listings"
          value={totalListings}
          description="Properties you currently manage"
        />

        <HostStatCard
          title="Published Listings"
          value={publishedListings}
          description="Currently visible to guests"
        />

        <HostStatCard
          title="Average Rating"
          value={`${averageRating} ⭐`}
          description="Across listings with reviews"
        />

      </div>

      {/* Quick Actions */}
      <div className="mt-10">

        <h2 className="text-xl font-semibold text-slate-900">
          Quick Actions
        </h2>

        <div className="mt-4 flex flex-wrap gap-4">

          <Link
            to="/host/listings/new"
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            + Add Listing
          </Link>

          <Link
            to="/host/listings"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Manage Listings
          </Link>

        </div>

      </div>

    </div>
  );
}