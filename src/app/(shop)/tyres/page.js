import Breadcrumb from '@/components/atoms/BreadCrumb';
import WebPageSchema from '@/components/seo/WebPageSchema';
import TyreClient from '../Components/TyreComponent/TyreClient';
import TyresPageBanner from '../Components/TyresPageBanner';
import CategoryService from '@/services/categoryService';
import RefreshButton from '../Components/RefreshButton';

export async function generateMetadata() {
    return {
        title: 'Premium Motorcycle Tyres | Torque Block',
        description: 'Shop the best premium motorcycle tyres online in India. Official partners for Pirelli, Michelin, Metzeler, Bridgestone, and more. Expert fitment support.',
        keywords: [
            'motorcycle tyres India',
            'superbike tyres India',
            'superbike tyres Bangalore',
            'buy motorcycle tyres online',
            'motorcycle tyres near me',
            'Pirelli tyres India',
            'Michelin tyres India',
            'Metzeler tyres India'
        ],
        alternates: { canonical: 'https://www.torqueblock.com/tyres' },
        openGraph: {
            title: 'Premium Motorcycle Tyres | Torque Block',
            description: 'Shop the best premium motorcycle tyres online in India. Official partners for top brands.',
            url: 'https://www.torqueblock.com/tyres',
            siteName: 'Torque Block',
            type: 'website',
            images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
        },
    };
}

const BREADCRUMB_ITEMS = [{ label: 'Tyres', isLast: true }];

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
        url: `/tyres` 
    }));

    return (
        <main>
            <WebPageSchema
                type="CollectionPage"
                title="Premium Motorcycle Tyres Collection"
                description="Shop the best premium motorcycle tyres online in India. Official partners for top brands."
                url="/tyres"
                items={schemaItems}
            />

            <div className="space-y-4 pb-4">
                <Breadcrumb items={BREADCRUMB_ITEMS} />

                <TyresPageBanner />

                {!hasError && categories.length > 0 ? (
                    categories.map((data) => (
                        <section key={data?._id || data?.name}>
                            <TyreClient categoryId={data?._id} title={data?.name} />
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