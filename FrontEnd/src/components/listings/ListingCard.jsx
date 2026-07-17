import { Link } from 'react-router-dom'
import { buildStars, formatPrice } from '../../utils/listingUtils'

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing._id}`} className="group block">
      <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative">
          <img src={listing.imageUrl} alt={listing.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">
            {listing.category || 'Stay'}
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{listing.title}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {listing.location}, {listing.country}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-3 py-2 text-right">
              <div className="text-sm font-semibold text-slate-900">₹ {formatPrice(listing.price)}</div>
              <div className="text-xs text-slate-500">/ night</div>
            </div>
          </div>

          <p className="line-clamp-2 text-sm leading-6 text-slate-600">{listing.description}</p>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
            <div className="text-slate-700">
              <span className="font-semibold">{listing.avgRating ?? 'New'}</span>{' '}
              <span className="text-slate-400">{listing.avgRating ? `(${listing.ratingCount}) ${buildStars(listing.avgRating)}` : 'No reviews yet'}</span>
            </div>
            <span className="font-medium text-rose-500">View details</span>
          </div>
        </div>
      </article>
    </Link>
  )
}