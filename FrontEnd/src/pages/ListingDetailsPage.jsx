import { Link, Navigate, useParams } from 'react-router-dom'
import { mockListings } from '../data/siteData'
import { formatPrice, normalizeListing } from '../utils/listingUtils'

export default function ListingDetailsPage() {
  const { id } = useParams()
  const listing = mockListings.map(normalizeListing).find((item) => item._id === id)

  if (!listing) {
    return <Navigate to="/listings" replace />
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <section className="space-y-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-500">Listing view</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">{listing.title}</h1>
            <p className="mt-2 text-slate-500">
              {listing.location}, {listing.country}
            </p>
          </div>

          <img src={listing.imageUrl} alt={listing.title} className="h-[420px] w-full rounded-[2rem] object-cover shadow-lg" />

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Rating</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{listing.avgRating ?? 'New'}</p>
              <p className="mt-1 text-sm text-slate-500">{listing.ratingCount || 'No'} reviews</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Hosted by</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">@{listing.owner?.username || 'host'}</p>
              <p className="mt-1 text-sm text-slate-500">Host profile ready</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">₹ {formatPrice(listing.price)}</p>
              <p className="mt-1 text-sm text-slate-500">per night</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">About this place</h2>
            <p className="mt-3 leading-7 text-slate-600">{listing.description}</p>
          </div>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Nightly price</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">₹ {formatPrice(listing.price)}</p>
              </div>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Available</div>
            </div>

            <div className="mt-6 grid gap-3">
              <button className="rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700">Reserve now</button>
              <button className="rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">Save listing</button>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Payment and availability handling will plug into this card later. The layout is already ready for Stripe and booking state.
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Host actions</h3>
            <div className="mt-4 grid gap-3">
              <button className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">Edit listing</button>
              <button className="rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-600">Delete listing</button>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8">
        <Link to="/listings" className="text-sm font-medium text-rose-500 hover:text-rose-600">
          Back to all listings
        </Link>
      </div>
    </div>
  )
}