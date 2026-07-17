import { useEffect, useState } from 'react'
import { fetchListings } from '../api/listingsApi'
import { mockListings } from '../data/siteData'
import { normalizeListing } from '../utils/listingUtils'

const fallbackListings = mockListings.map(normalizeListing)

export function useListingsData() {
  const [state, setState] = useState({ listings: fallbackListings, loading: false, error: '' })

  useEffect(() => {
    let active = true

    const loadListings = async () => {
      try {
        const payload = await fetchListings()
        const source = Array.isArray(payload) ? payload : payload.listings || payload.data || []

        if (active && source.length > 0) {
          setState({ listings: source.map(normalizeListing), loading: false, error: '' })
        }
      } catch {
        if (active) {
          setState((current) => ({ ...current, loading: false }))
        }
      }
    }

    loadListings()

    return () => {
      active = false
    }
  }, [])

  return state
}