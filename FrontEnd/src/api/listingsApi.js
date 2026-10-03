const API_BASE_URL = import.meta.env.VITE_API_URL

if (!API_BASE_URL) {
  throw new Error('VITE_API_URL must be set when building the frontend')
}

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