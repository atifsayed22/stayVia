export function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)
}

export function buildStars(rating) {
  const rounded = Math.round(Number(rating) || 0)
  return Array.from({ length: 5 }, (_, index) => (index < rounded ? '★' : '☆')).join(' ')
}

function toArray(value) {
  return Array.isArray(value) ? value : []
}

export function extractListings(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.listings)) {
    return payload.listings
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  return []
}

export function extractListing(payload) {
  if (!payload) {
    return null
  }

  if (payload.listing) {
    return payload.listing
  }

  if (payload.data && !Array.isArray(payload.data)) {
    return payload.data
  }

  return Array.isArray(payload) ? payload[0] : payload
}

export function normalizeListing(listing) {
  if (!listing) {
    return null
  }

  const reviews = toArray(listing.reviews)
  const photos = toArray(listing.photos)
  const primaryPhoto = photos[0] || listing.image?.url || listing.image || listing.coverImage || ''
  const propertyType = listing.propertyType || listing.typeOfPlace || listing.typeOfplace || listing.type || 'stay'
  const guestCount = listing.guestCount ?? listing.noOfGuest ?? listing.noOfGuests ?? listing.maxGuests ?? null
  const location = listing.location || listing.destination || listing.city || ''
  const address = listing.address || listing.destination || location || ''
  const country = listing.country || listing.countryName || ''
  const availability = listing.availability || listing.availableDates || listing.availabilityDates || null
  const avgRating =
    listing.avgRating ??
    (reviews.length
      ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
      : null)

  return {
    ...listing,
    _id: listing._id || listing.id || listing.slug || '',
    title: listing.title || listing.name || 'Untitled stay',
    description: listing.description || listing.descroption || '',
    photos,
    imageUrl: primaryPhoto || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    propertyType,
    guestCount,
    location,
    address,
    country,
    amenities: toArray(listing.amenities),
    availability,
    mapUrl: listing.mapUrl || listing.map || listing.mapLink || '',
    avgRating,
    ratingCount: reviews.length,
  }
}

export function normalizeListingCollection(payload) {
  return extractListings(payload).map(normalizeListing).filter(Boolean)
}