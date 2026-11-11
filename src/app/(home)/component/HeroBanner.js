import { getImageProps } from 'next/image';


export default function HeroBanner({ banner, topContent, bottomContent }) {
    if (!banner) return null;

    const commonProps = {
        alt: banner.alt,
        fill: true,
        loading: 'eager',
        sizes: '100vw',
        quality: 75,
    };

    const { props: desktopProps } = getImageProps({ ...commonProps, src: banner.image });
    const { props: mobileProps } = getImageProps({ ...commonProps, src: banner.mobileImage });

    return (
        <section className='relative w-full min-h-svh' aria-label="Hero Section">
            <picture>
                <source media="(min-width: 768px)" srcSet={desktopProps.srcSet} sizes={desktopProps.sizes} />
                <source media="(max-width: 767px)" srcSet={mobileProps.srcSet} sizes={mobileProps.sizes} />
                <img
                    {...mobileProps}
                    alt={banner.alt}
                    fetchPriority="high"
                    decoding="async"
                    style={{ ...mobileProps.style, objectFit: 'cover' }}
                    className="object-cover"
                />
            </picture>

            <span aria-hidden="true" className='pointer-events-none absolute inset-0 z-0 hero-scrim' />
            <span aria-hidden="true" className='pointer-events-none absolute inset-0 z-0 hero-vignette' />

            <div className='absolute inset-0 z-10 flex flex-col justify-start top-[120px] md:top-[150px] lg:top-0 lg:justify-center'>
                <div className='max-w-7xl lg:pb-18 w-full mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] items-center px-4 text-white'>
                    {topContent}
                </div>
            </div>

            <div className='absolute inset-0 z-10 flex flex-col items-center justify-end pb-4 lg:pb-12 pointer-events-none'>
                {bottomContent}
            </div>
        </section>
    );
}
