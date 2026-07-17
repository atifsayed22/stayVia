import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  const handleSearch = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const search = String(formData.get('search') || '').trim()
    navigate(search ? `/listings?search=${encodeURIComponent(search)}` : '/listings')
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#f7f7f7] text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-10 top-10 h-56 w-56 rounded-full bg-rose-500 blur-3xl" />
        <div className="absolute right-16 top-24 h-72 w-72 rounded-full bg-sky-500 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
            Travel, book, host
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Find stays that feel like the destination, not just a room.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            Clean browsing, host and traveler modes, location-aware search, and room to plug in payments later.
          </p>

          <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white p-3 text-slate-900 shadow-2xl shadow-black/10 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Search</p>
              <input
                name="search"
                placeholder="Try Goa, Jaipur, skyline loft..."
                className="mt-1 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
            <button type="submit" className="rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-700">
              Search stays
            </button>
          </form>

          <div className="mt-8 grid grid-cols-3 gap-3 text-sm text-white/80 sm:max-w-xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-2xl font-semibold text-white">1.2k+</div>
              <div>bookable listings</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-2xl font-semibold text-white">24h</div>
              <div>host response target</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="text-2xl font-semibold text-white">4.8</div>
              <div>average guest rating</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-white/10 bg-white p-4 text-slate-900 shadow-2xl shadow-black/20">
            <div className="overflow-hidden rounded-[1.5rem] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                alt="Featured stay"
                className="h-80 w-full object-cover"
              />
            </div>
            <div className="p-5">
              <p className="text-sm font-medium text-rose-500">Featured booking</p>
              <h2 className="mt-1 text-xl font-semibold">Beachfront Villa Escape</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A visual, calm card-first layout that matches the way people browse Airbnbs.
              </p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-slate-500">From</span>
                <span className="font-semibold text-slate-900">₹ 11,800 / night</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}