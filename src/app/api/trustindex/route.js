import { getTrustindexStats } from '@/services/trustindexStats'

// Cached JSON endpoint for the live Google rating/review count parsed from the
// Trustindex widget. Mirrors the home page's hourly ISR window so client-side
// consumers can read the same figures the server rendered.
export const revalidate = 3600

export async function GET() {
  const stats = await getTrustindexStats()
  return Response.json(stats)
}
