import Breadcrumb from '@/components/atoms/BreadCrumb';
import WebPageSchema from '@/components/seo/WebPageSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import TyreClient from '../Components/TyreComponent/TyreClient';
import TyresPageBanner from '../Components/TyresPageBanner';
import CategoryService from '@/services/categoryService';
import RefreshButton from '../Components/RefreshButton';

export async function generateMetadata() {
    return {
        title: 'Buy Premium Motorcycle & Superbike Tyres Online India | Torque Block',
        description: 'Shop top-rated high-performance motorcycle tyres in India. Official partner for Pirelli, Michelin, Metzeler, Bridgestone & Dunlop. Pan-India shipping & expert fitment.',
        keywords: [
            'motorcycle tyres India',
            'superbike tyres India',
            'superbike tyres Bangalore',
            'buy motorcycle tyres online',
            'motorcycle tyres near me',
            'Pirelli tyres India',
            'Michelin tyres India',
            'Metzeler tyres India',
            'Bridgestone tyres India',
            'track day tyres India',
            'adventure motorcycle tyres'
        ],
        alternates: { canonical: 'https://www.torqueblock.com/tyres' },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
        },
        openGraph: {
            title: 'Buy Premium Motorcycle & Superbike Tyres Online India | Torque Block',
            description: 'Shop authentic high-performance motorcycle tyres in India. Official brand partner for Pirelli, Michelin, Metzeler & more. Expert fitment support.',
            url: 'https://www.torqueblock.com/tyres',
            siteName: 'Torque Block',
            locale: 'en_IN',
            type: 'website',
            images: [
                {
                    url: 'https://www.torqueblock.com/newlogo.webp',
                    width: 1200,
                    height: 630,
                    alt: 'Torque Block Premium Motorcycle Tyres India',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Buy Premium Motorcycle & Superbike Tyres Online India | Torque Block',
            description: 'Shop authentic high-performance motorcycle tyres in India. Pirelli, Michelin, Metzeler & more.',
            images: ['https://www.torqueblock.com/newlogo.webp'],
        },
    };
}

const BREADCRUMB_ITEMS = [{ label: 'Tyres', isLast: true }];

const TYRES_PAGE_FAQS = [
    {
        question: "Where can I buy authentic superbike and motorcycle tyres online in India?",
        answer: "You can buy 100% genuine motorcycle and superbike tyres online at Torque Block. We are authorized partners for leading global brands including Pirelli, Michelin, Metzeler, Bridgestone, and Dunlop, offering pan-India door delivery with full manufacturer warranties."
    },
    {
        question: "How do I choose the right tyre compound for my motorcycle?",
        answer: "Selecting the ideal tyre compound depends on your riding environment: Track & Racing tyres feature soft sticky compounds for maximum cornering grip; Sport & Street tyres balance fast warm-up with daily durability; Touring tyres use dual-compound technology for high mileage; and Adventure tyres offer optimized tread blocks for dual-sport capabilities."
    },
    {
        question: "Does Torque Block offer professional tyre fitment support?",
        answer: "Yes, Torque Block provides dedicated expert fitment assistance in Bangalore and through trusted partner networks across major Indian metros, including dynamic wheel balancing and precision mounting."
    },
    {
        question: "What tyre sizes are available for superstock and performance motorcycles?",
        answer: "We stock all popular performance sizes including Front (120/70 ZR17, 110/70 R17, 100/90-19) and Rear (180/55 ZR17, 190/55 ZR17, 200/55 ZR17, 150/60 R17) across soft, medium, and hard rubber compounds."
    }
];

export default async function TyresPage() {
    let categories = [];
    let hasError = false;

    try {
        const response = await CategoryService?.getCategory();
        categories = Array.isArray(response) ? response : [];
    } catch (error) {
        console.error('[TyresPage] Error fetching categories:', error);
        hasError = true;
    }

    const schemaItems = categories.map((cat) => ({
        name: cat?.name || 'Category',
        url: `/category/${cat?.identifier || cat?.slug || cat?._id || ''}`
    }));

    return (
        <main className="">
            <WebPageSchema
                type="CollectionPage"
                title="Buy Premium Motorcycle & Superbike Tyres Online India"
                description="Explore India's premier collection of performance motorcycle tyres. Authorized dealers for Pirelli, Michelin, Metzeler, Bridgestone, and Dunlop."
                url="/tyres"
                items={schemaItems}
            />
            <BreadcrumbSchema items={[{ label: 'Home', url: '/' }, { label: 'Tyres', url: '/tyres' }]} />
            <FAQSchema faqs={TYRES_PAGE_FAQS} />
            <LocalBusinessSchema />


            <div className="space-y-4 pb-6">
                <Breadcrumb items={BREADCRUMB_ITEMS} />
                <TyresPageBanner />

                {!hasError && categories.length > 0 ? (
                    categories.map((data, index) => (
                        <section key={data?._id || data?.name} aria-label={`${data?.name} Tyres`}>
                            <TyreClient 
                                categoryId={data?._id} 
                                title={data?.name} 
                                showWhyBuy={index === categories.length - 1} 
                            />
                        </section>
                    ))
                ) : (
                    <div className="flex min-h-[40vh] items-center justify-center rounded-xl bg-zinc-900/30 border border-zinc-800/50 p-8 text-center mt-6">
                        <div className="space-y-3">
                            <h2 className="text-xl font-semibold text-zinc-200">
                                {hasError ? "Unable to load categories" : "No categories available"}
                            </h2>
                            <p className="text-zinc-400">
                                {hasError
                                    ? "We're experiencing some technical difficulties. Please try again later."
                                    : "We couldn't find any tyre categories at the moment."}
                            </p>
                            <RefreshButton />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}