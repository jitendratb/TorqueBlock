import { GiCheckedShield } from 'react-icons/gi'
import { MdSupportAgent } from 'react-icons/md'
import { FaTruck, FaMapMarkedAlt } from 'react-icons/fa'

const ITEMS = [
  { icon: GiCheckedShield, label: '100% Genuine Products' },
  { icon: MdSupportAgent, label: 'Online Customer Support ' },
  { icon: FaTruck, label: 'Fast Delivery' },
  { icon: FaMapMarkedAlt, label: 'Pan India Delivery', desktopOnly: true },
]

function HeroTrustBar() {
  return (
    <div className='pt-4 w-full max-w-xl lg:max-w-4xl px-4 mx-auto'>
      <ul className='flex items-stretch justify-between gap-1.5 text-white'>
        {ITEMS.map(({ icon: Icon, label, desktopOnly }, i) => (
          <li
            key={label}
            className={`flex flex-1 flex-col items-center justify-center gap-1.5 px-1 text-center xl:flex-row xl:gap-2.5  ${desktopOnly ? 'hidden xl:flex' : ''}`}
          >
            <Icon aria-hidden='true' className='shrink-0 text-orange-500 text-xl xl:text-2xl drop-shadow' />
            <span className='text-[11px] sm:text-xs md:text-sm font-semibold leading-tight tracking-wide xl:whitespace-nowrap'>
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HeroTrustBar
