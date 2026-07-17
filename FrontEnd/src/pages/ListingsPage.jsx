import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ListingCard from '../components/listings/ListingCard'
import ListingFilters from '../components/listings/ListingFilters'
import { useListingsData } from '../hooks/useListingsData'

export default function ListingsPage() {
  const [searchParams] = useSearchParams()
  const { listings, loading } = useListingsData()

  const filteredListings = useMemo(() => {
    const search = (searchParams.get('search') || '').toLowerCase().trim()
    const maxPrice = Number(searchParams.get('maxPrice') || 0)
    const minRating = Number(searchParams.get('minRating') || 0)

    return listings.filter((listing) => {
      const matchesSearch = !search || [listing.title, listing.location, listing.country].some((field) => field.toLowerCase().includes(search))
      const matchesPrice = !maxPrice || Number(listing.price) <= maxPrice
      const matchesRating = !minRating || Number(listing.avgRating || 0) >= minRating

      return matchesSearch && matchesPrice && matchesRating
    })
  }, [listings, searchParams])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-500">Browse stays</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Clean card layout with real-life booking intent</h1>
          </div>
          <p className="max-w-xl text-sm text-slate-500">
            This layout already matches the current listing structure so it can switch to backend JSON later without changing the UI contract.
          </p>
        </div>

        <ListingFilters key={searchParams.toString()} />

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-[420px] animate-pulse rounded-[1.75rem] bg-white" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredListings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}