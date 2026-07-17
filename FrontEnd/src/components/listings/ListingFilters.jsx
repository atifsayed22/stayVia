import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function ListingFilters() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(() => searchParams.get('search') || '')
  const [maxPrice, setMaxPrice] = useState(() => searchParams.get('maxPrice') || '')
  const [minRating, setMinRating] = useState(() => searchParams.get('minRating') || '')

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()

    if (search) params.set('search', search)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (minRating) params.set('minRating', minRating)

    navigate(`/listings${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end">
      <label className="grid gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Search</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          placeholder="Title, location, or country"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Max price</span>
        <input
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          type="number"
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
          placeholder="5000"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Min rating</span>
        <select
          value={minRating}
          onChange={(event) => setMinRating(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
        >
          <option value="">Any</option>
          <option value="5">5</option>
          <option value="4">4+</option>
          <option value="3">3+</option>
          <option value="2">2+</option>
        </select>
      </label>

      <button type="submit" className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
        Apply
      </button>
    </form>
  )
}