export function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)
}

export function buildStars(rating) {
  const rounded = Math.round(Number(rating) || 0)
  return Array.from({ length: 5 }, (_, index) => (index < rounded ? '★' : '☆')).join(' ')
}

export function normalizeListing(listing) {
  const reviews = listing.reviews || []
  const avgRating =
    listing.avgRating ??
    (reviews.length
      ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
      : null)

  return {
    ...listing,
    avgRating,
    ratingCount: reviews.length,
    imageUrl:
      listing.image?.url ||
      listing.image ||
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
  }
}