import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import ListingCard from "../components/listings/ListingCard";
import ListingFilters from "../components/listings/ListingFilters";
import { useListings } from "../hooks/useListings";

export default function ListingsPage() {
  const [searchParams] = useSearchParams();
  const { listings, loading, error } = useListings();

  // Filter listings based on URL search params
  const filteredListings = useMemo(() => {
    const search = (searchParams.get("search") || "").toLowerCase().trim();
    const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
    const minRating = Number(searchParams.get("minRating")) || 0;

    return listings.filter((listing) => {
      const searchableFields = [
        listing.title,
        listing.location,
        listing.country,
        listing.address,
        listing.propertyType,
        ...(listing.amenities || []),
      ];

      const matchesSearch =
        !search ||
        searchableFields.some((field) =>
          String(field ?? "").toLowerCase().includes(search)
        );

      const matchesPrice = Number(listing.price) <= maxPrice;
      const matchesRating = Number(listing.avgRating ?? 0) >= minRating;

      return matchesSearch && matchesPrice && matchesRating;
    });
  }, [listings, searchParams]);

  // Loading State
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[420px] animate-pulse rounded-3xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-xl font-semibold text-red-600">
            Unable to load listings
          </h2>

          <p className="mt-2 text-red-500">
            {typeof error === "string" ? error : error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-500">
            Browse stays
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Find your next stay
          </h1>

          <p className="mt-2 text-slate-500">
            Discover apartments, villas, cabins, and unique places to stay.
          </p>
        </div>

        {/* Filters */}
        <ListingFilters />

        {/* Empty State */}
        {filteredListings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No listings found
            </h2>

            <p className="mt-2 text-slate-500">
              Try changing your search or filter options.
            </p>
          </div>
        ) : (
          /* Listings Grid */
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredListings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}