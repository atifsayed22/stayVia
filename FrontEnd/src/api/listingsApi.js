const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function fetchJsonOrThrow(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    throw new Error('Listing endpoint does not return JSON yet')
  }

  if (!response.ok) {
    throw new Error('Failed to load listings')
  }

  return response.json()
}

export function fetchListings() {
  return fetchJsonOrThrow(`${API_BASE_URL}/listing`)
}

export function fetchListingById(id) {
  return fetchJsonOrThrow(`${API_BASE_URL}/listing/${id}`)
}