import { Link } from "react-router-dom";

export default function EmptyListings() {
  return (
    <div className="mt-12 rounded-3xl border-2 border-dashed border-slate-200 bg-white px-8 py-16 text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <span className="text-4xl">🏡</span>
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-slate-900">
        No Listings Yet
      </h2>

      <p className="mt-3 text-slate-500">
        Start hosting by creating your first property listing.
      </p>

      <Link
        to="/host/listings/new"
        className="mt-8 inline-flex rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
      >
        + Create Your First Listing
      </Link>
    </div>
  );
}