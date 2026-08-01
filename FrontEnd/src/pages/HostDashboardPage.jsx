import { Link } from 'react-router-dom'
import { currentUser } from '../data/siteData'
import { hostBookings, hostDashboardStats, hostQuickActions } from '../data/hostDashboardData'
import { useListings } from "../hooks/useListings";
import { formatPrice } from '../utils/listingUtils'

export default function HostDashboardPage() {
  const { listings ,   error } = useListings()

  if(error){
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  const featuredListing = listings[0]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <div className="rounded-[2.5rem] bg-[#111827] p-8 text-white shadow-2xl shadow-black/10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-300">Host dashboard</p>
            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight">Welcome back, @{currentUser.username}</h1>
                <p className="mt-3 max-w-2xl text-white/70">
                  Keep an eye on bookings, guest messages, pricing, and availability from one Airbnb-style control panel.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80">
                <div className="text-white/50">Next payout</div>
                <div className="mt-1 text-2xl font-semibold text-white">₹ 1,42,800</div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {hostDashboardStats.map((stat) => (
              <div key={stat.label} className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-500">{stat.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Upcoming bookings</h2>
                <p className="mt-1 text-sm text-slate-500">Track guest arrivals, payout amounts, and booking state.</p>
              </div>
              <Link to="/listings/new" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
                Add listing
              </Link>
            </div>

            <div className="mt-6 grid gap-4">
              {hostBookings.map((booking) => (
                <div key={booking.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{booking.guest}</p>
                      <p className="mt-1 text-sm text-slate-500">{booking.property}</p>
                    </div>
                    <div className="text-sm text-slate-600">{booking.dates}</div>
                    <div className="text-sm font-semibold text-slate-900">{booking.payout}</div>
                    <div className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                      {booking.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
            <div className="mt-4 grid gap-3">
              {hostQuickActions.map((action) => (
                <button key={action} type="button" className="rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                  {action}
                </button>
              ))}
            </div>
          </div>

          {featuredListing ? (
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
              <img src={featuredListing.imageUrl} alt={featuredListing.title} className="h-60 w-full object-cover" />
              <div className="p-6">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-rose-500">Featured listing</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{featuredListing.title}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {featuredListing.location}, {featuredListing.country}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                  <span>{featuredListing.propertyType || 'Stay'} · {featuredListing.guestCount || 2} guests</span>
                  <span>₹ {formatPrice(featuredListing.price)} / night</span>
                </div>
                <Link to={`/listings/${featuredListing._id}`} className="mt-5 inline-flex rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600">
                  View listing
                </Link>
              </div>
            </div>
          ) : null}

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Host mode</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Switch back to traveler mode any time to browse stays and book for yourself.
            </p>
            <Link to="/listings" className="mt-4 inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Browse traveler view
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}