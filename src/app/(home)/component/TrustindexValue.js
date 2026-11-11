import { cache } from 'react'
import { getTrustindexStats } from '@/services/trustindexStats'
import { RATING, REVIEWS } from './socialProof'

const getStats = cache(getTrustindexStats)

export default async function TrustindexValue({ field }) {
  const stats = await getStats()
  if (field === 'reviews') return stats.reviews ? `${stats.reviews}+` : REVIEWS
  return stats.rating ?? RATING
}
