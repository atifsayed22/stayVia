import { Link } from "react-router-dom";
import { buildStars, formatPrice } from "../../utils/listingUtils";

export default function ListingCard({ listing }) {
  const image = listing.images?.[0]?.url;
  const location =
    listing.location ||
    [listing.address?.city, listing.address?.country].filter(Boolean).join(", ");

  return (
    <Link to={`/listings/${listing._id}`} className="group block">
      <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={listing.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-sm backdrop-blur">
            {listing.category || "Stay"}
          </div>
        </div>

        <div className="space-y-2.5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-900">
                {listing.title}
              </h3>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {location || "Location unavailable"}
              </p>
            </div>
            <div className="shrink-0 rounded-xl bg-slate-50 px-2.5 py-1.5 text-right">
              <div className="text-sm font-semibold text-slate-900">
                ₹ {formatPrice(listing.price)}
              </div>
              <div className="text-xs text-slate-500">/ night</div>
            </div>
          </div>

          <p className="line-clamp-1 text-sm leading-5 text-slate-600">
            {listing.description}
          </p>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
            <div className="text-slate-700">
              <span className="font-semibold">
                {listing.avgRating ?? "New"}
              </span>{" "}
              <span className="text-slate-400">
                {listing.avgRating
                  ? `(${listing.ratingCount}) ${buildStars(listing.avgRating)}`
                  : "No reviews yet"}
              </span>
            </div>
            <span className="font-semibold text-rose-500">View details</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
