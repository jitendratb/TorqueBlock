import Link from 'next/link'
import { FaFire } from 'react-icons/fa'


export default function HeroSearchChips({ popular = [] }) {
  return (
    <nav
      aria-label="Popular searches"
      className='mt-3 flex gap-2 overflow-x-auto scrollbar-hide  md:justify-center md:overflow-visible'
    >
      {popular.map((q, i) => {
        const tabletHidden = i >= 3 ? 'md:hidden lg:inline-flex' : ''
        return (
          <Link
            key={q}
            href={`/search?q=${encodeURIComponent(q)}`}
            style={{ animationDelay: `${i * 60}ms` }}
            className={`animate-fade-in-up inline-flex items-center gap-1 shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white/85 backdrop-blur transition-colors hover:border-orange-500/40 hover:bg-white/[0.16] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${tabletHidden}`}
          >
            <FaFire aria-hidden="true" className='text-orange-500' />
            {q}
          </Link>
        )
      })}
    </nav>
  )
}
