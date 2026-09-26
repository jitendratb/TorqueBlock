// Server-side fetcher for the live Google rating shown in the hero.
//
// Trustindex has no public REST API for a widget's aggregate score, but the
// loader builds each widget from a static, cacheable HTML file on their CDN
// (see loader.js -> getWidgetUrl + "content.html"). That file carries the
// rendered rating and review count, so we fetch it on the server, parse the
// two figures, and let Next cache the result (ISR) for an hour.
//
// Anything unexpected (network error, markup change) resolves to nulls so the
// caller can fall back to the manual values in socialProof.js — the hero must
// never break because a third party changed their HTML.

// Same widget id used by the embedded loader in trustindexService.js.
const WIDGET_ID = '1ced8246880d851ac056a341c19'
const CONTENT_URL = `https://cdn.trustindex.io/widgets/${WIDGET_ID.slice(0, 2)}/${WIDGET_ID}/content.html`

const RATING_RE = /ti-header-rating">\s*([\d.]+)\s*</i
const REVIEWS_RE = /ti-header-rating-reviews">\s*([\d,]+)\s*reviews/i

const EMPTY = { rating: null, reviews: null, reviewCount: null }

/**
 * Fetch and parse the live Google rating + review count from the Trustindex
 * widget content. Cached for an hour via the Next data cache.
 *
 * @returns {Promise<{rating: string|null, reviews: string|null, reviewCount: number|null}>}
 *   rating   - e.g. "4.9" (string, as displayed)
 *   reviews  - e.g. "2,417" (grouped for display)
 *   reviewCount - e.g. 2417 (raw number)
 */
export async function getTrustindexStats() {
  try {
    const res = await fetch(CONTENT_URL, {
      // Revalidate hourly; shares the home page's ISR window.
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
    // Timeout, network failure, or DOM shape change — caller uses fallbacks.
    return EMPTY
  }
}
