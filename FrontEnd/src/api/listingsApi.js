const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export async function fetchListings() {
  const response = await fetch(`${API_BASE_URL}/listing`)
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    throw new Error('Listing endpoint does not return JSON yet')
  }

  if (!response.ok) {
    throw new Error('Failed to load listings')
  }

  return response.json()
}