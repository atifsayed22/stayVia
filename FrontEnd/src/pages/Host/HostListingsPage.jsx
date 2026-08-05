import { Link } from "react-router-dom";

import { useHostListings } from "../../hooks/useHostListings";

// import HostListingGrid from "../../components/Host/HostListingGrid";
import EmptyListings from "../../components/Host/EmptyListings";
import HostListingGrid from "../../components/Host/HostListingsGrid";

export default function HostListingsPage() {
  const { listings, deleteListing } = useHostListings();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Listings</h1>

          <p className="mt-2 text-slate-500">
            Manage all your hosted properties.
          </p>
        </div>

        <Link
          to="/host/listings/new"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
        >
          + Add Listing
        </Link>
      </div>

      {/* Listing Count */}
      <div className="mt-8">
        <p className="text-sm text-slate-500">
          {listings.length} {listings.length === 1 ? "Listing" : "Listings"}
        </p>
      </div>

      {/* Listings */}
      {listings.length === 0 ? (
        <EmptyListings />
      ) : (
        <HostListingGrid listings={listings} deleteListing={deleteListing} />
      )}
    </div>
  );
}
