import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiBookOpen, FiMapPin, FiUsers } from 'react-icons/fi'
import { MdOutlineSmartDisplay } from 'react-icons/md'
import { FaMotorcycle, FaRegHandshake, FaRegLightbulb } from 'react-icons/fa'
import JoinTbrnButton from '@/components/molecules/JoinTbrnButton'

const EXPLORE_HREF = '/tbrn'

const BACKGROUND_IMAGE = 'https://cdn.torqueblock.com/torqueblock9-8.webp'

const PHOTOS = [
    {
        src: 'https://cdn.torqueblock.com/images-6-5.webp',
        alt: 'Rider seated on a black and green Kawasaki',
        className: 'z-10 col-start-1 col-end-8 row-start-3 row-end-7',
        imageClassName: 'object-[center_50%]',
        sizes: '(max-width: 1023px) 58vw, 26vw',
    },
    {
        src: 'https://cdn.torqueblock.com/513910180_18507484615039332_1120044797685231742_n-2.webp',
        alt: 'Rider standing on a misty green mountain trail',
        className: 'col-start-6 col-end-9 row-start-1 row-end-4',
        imageClassName: 'object-[center_40%]',
        sizes: '(max-width: 1023px) 25vw, 12vw',
    },
    {
        src: 'https://cdn.torqueblock.com/473371233_3606197776342779_5375249406800229080_n-1.webp',
        alt: 'Rider in a green helmet and goggles on an adventure bike at sunset',
        className: 'z-10 col-start-8 col-end-13 row-start-5 row-end-7',
        imageClassName: 'object-[35%_35%]',
        sizes: '(max-width: 1023px) 42vw, 19vw',
    },
    {
        src: 'https://cdn.torqueblock.com/images-3-4.webp',
        alt: 'Rider in a riding jacket in front of snow-capped mountains',
        className: 'col-start-1 col-end-6 row-start-1 row-end-3',
        imageClassName: 'object-[center_30%]',
        sizes: '(max-width: 1023px) 42vw, 19vw',
    },
    {
        src: 'https://cdn.torqueblock.com/whatsapp-image-2026-10-23-at-63854-pm-6.webp',
        alt: 'Rider posing on a KTM Duke',
        className: 'col-start-9 col-end-13 row-start-1 row-end-3',
        imageClassName: 'object-[center_35%]',
        sizes: '(max-width: 1023px) 33vw, 15vw',
    },
    {
        src: 'https://cdn.torqueblock.com/587651251_17886344211397147_7913687044721114136_n-3.webp',
        alt: 'Riders on a beach beside their adventure motorcycle',
        className: 'col-start-9 col-end-13 row-start-3 row-end-5',
        imageClassName: 'object-[center_50%]',
        sizes: '(max-width: 1023px) 33vw, 15vw',
    },
]

const FEATURES = [
    { icon: FiBookOpen, title: 'Practical Insights', text: 'Tyre guides, reviews and real riding experiences.' },
    { icon: FiUsers, title: 'A Growing Community', text: 'Connect riders and creators across India.' },
    { icon: MdOutlineSmartDisplay, title: 'Useful Content', text: 'Videos, articles and tips for every kind of rider.' },
    { icon: FaRegHandshake, title: 'Opportunities', text: 'Collaborations and earning potential for approved creators.' },
]

const HIGHLIGHTS = [
    { icon: FaMotorcycle, title: 'All Riding Segments', text: 'Street, Touring, Adventure, Off-road and Track.' },
    { icon: FaRegLightbulb, title: 'Rider-Focused Content', text: 'Practical. Honest. Real-world.' },
    { icon: FiUsers, title: 'Riders & Creators', text: 'Relevant audiences. Genuine influence.' },
    { icon: FiMapPin, title: 'Pan-India Network', text: 'Connecting motorcycle riders and creators across India.' },
]

function RidersNetworkBanner() {
    return (
        <div className='relative space-y-4'>
            <div className='relative grid gap-4 lg:grid-cols-[1.1fr_1fr]'>
                <div className='flex flex-col'>
                    <div className='flex items-center gap-3'>
                        {/* <span aria-hidden='true' className='h-px w-8 bg-gradient-to-r from-transparent to-orange-500/70 md:w-12' /> */}
                        <span className='text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]'>
                            Torque Block Riders Network
                        </span>
                        {/* <span aria-hidden='true' className='h-px w-8 bg-gradient-to-l from-transparent to-orange-500/70 md:w-12' /> */}
                    </div>

                    <h2 className='mt-4 text-[1.75rem] sm:text-4xl font-black uppercase leading-[0.95] tracking-tight'>
                        <span className='block sm:inline'>Real Riders.</span>{' '}
                        <span className='block sm:inline'>Real Knowledge.</span>
                        <span className='block text-orange-500'>
                            <span className='block sm:inline'>A Stronger</span>{' '}
                            <span className='block sm:inline'>Riding Community.</span>
                        </span>
                    </h2>

                    <p className='mt-4 max-w-xl text-sm md:text-base text-zinc-300'>
                        A network of motorcycle riders and creators sharing practical knowledge,
                        riding experiences and insights to help riders make better decisions.
                    </p>

                    <ul className='mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
                        {FEATURES.map(({ icon: Icon, title, text }) => (
                            <li key={title} className='xl:border-l xl:border-white/10 xl:pl-4 xl:first:border-l-0 xl:first:pl-0'>
                                <Icon aria-hidden='true' className='text-3xl text-orange-500' />
                                <h3 className='mt-3 text-sm font-bold'>{title}</h3>
                                <p className='mt-1 text-xs text-zinc-400'>{text}</p>
                            </li>
                        ))}
                    </ul>

                    <div className='mt-8 grid gap-5 sm:grid-cols-2'>
                        <div className='text-center'>
                            <Link
                                href={EXPLORE_HREF}
                                className='group flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-2 lg:py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950'
                            >
                                Explore TBRN
                                <FiArrowRight aria-hidden='true' className='transition-transform group-hover:translate-x-1' />
                            </Link>
                        </div>
                        <div className='text-center'>
                            <JoinTbrnButton
                                source='home_banner'
                                className='group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-orange-500 px-6 py-2 lg:py-4 text-sm font-bold uppercase tracking-wider text-orange-500 transition-colors hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950'
                            >
                                Become a TBRN Creator
                                <FiArrowRight aria-hidden='true' className='transition-transform group-hover:translate-x-1' />
                            </JoinTbrnButton>
                        </div>
                    </div>
                </div>

                <div className='grid aspect-[3/2] grid-cols-12 grid-rows-6 gap-1.5 sm:gap-2 md:aspect-auto md:h-[440px] md:gap-3 lg:h-auto lg:min-h-[360px]'>
                    {PHOTOS.map((photo) => (
                        <div
                            key={photo.src}
                            className={`relative overflow-hidden rounded-xl border border-white/15 shadow-2xl shadow-black/60 md:rounded-2xl ${photo.className}`}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes={photo.sizes}
                                className={`object-cover ${photo.imageClassName}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <ul className='relative grid grid-cols-1 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm sm:grid-cols-2 sm:divide-y-0  lg:grid-cols-4 lg:divide-x'>
                {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                    <li key={title} className='flex items-center gap-4 p-2 lg:p-4'>
                        <Icon aria-hidden='true' className='shrink-0 text-3xl text-orange-500' />
                        <div>
                            <h3 className='text-sm font-bold'>{title}</h3>
                            <p className='lg:mt-1 text-xs text-zinc-400'>{text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RidersNetworkBanner
