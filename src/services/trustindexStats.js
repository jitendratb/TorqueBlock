
const WIDGET_ID = '1ced8246880d851ac056a341c19'
const CONTENT_URL = `https://cdn.trustindex.io/widgets/${WIDGET_ID.slice(0, 2)}/${WIDGET_ID}/content.html`

const RATING_RE = /ti-header-rating">\s*([\d.]+)\s*</i
const REVIEWS_RE = /ti-header-rating-reviews">\s*([\d,]+)\s*reviews/i

const EMPTY = { rating: null, reviews: null, reviewCount: null }

export async function getTrustindexStats() {
  try {
    const res = await fetch(CONTENT_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return EMPTY

    const html = await res.text()
    const ratingMatch = html.match(RATING_RE)
    const reviewsMatch = html.match(REVIEWS_RE)

    const reviewCount = reviewsMatch
      ? Number(reviewsMatch[1].replace(/,/g, ''))
      : null

    return {
      rating: ratingMatch ? ratingMatch[1] : null,
      reviews: reviewCount != null ? reviewCount.toLocaleString('en-IN') : null,
      reviewCount,
    }
  } catch {
    return EMPTY
  }
}
