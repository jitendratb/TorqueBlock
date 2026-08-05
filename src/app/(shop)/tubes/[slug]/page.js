import Breadcrumb from "@/components/atoms/BreadCrumb";
import TubesService from "@/services/TubesService";
import dynamic from 'next/dynamic';
const TubesDetailsClient = dynamic(() => import('../../Components/TubesComponents/TubesDetailsClient'), { ssr: true, loading: () => <div className="min-h-[500px] w-full animate-pulse bg-zinc-900 rounded-xl mt-4" /> });
import { cache } from "react";
import { notFound } from "next/navigation";
import ProductSchema from "@/components/seo/ProductSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const getTube = cache(async (slug) => {
    const response = await TubesService.getTubeById(slug);
    return response?.data?.data || response?.data || response;
});

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const tube = await getTube(slug);


    if (!tube) return {};

    const displayName = tube?.name
    const brandName = tube?.brand?.name || tube?.brand || "Torque Block";
    const displayDescription = tube?.hero?.subtitle || (displayName ? `Buy ${displayName} premium motorcycle tubes online in India. Check sizes, compatibility, and price.` : "Explore high quality motorcycle inner tubes, sizes, and pricing.");

    const displayTitle = displayName ? `${displayName} Price & Details` : "Premium Motorcycle Tubes - Details & Price";

    const mainImage = tube?.images?.[0]?.url || tube?.productImages?.[0] || tube?.hero?.heroImage || "/newLogo.webp";
    const metaTitle = tube?.seo?.metaTitle || tube?.seo?.title || displayTitle;
    const metaDescription = tube?.seo?.metaDescription || tube?.seo?.description || displayDescription;
    const canonical = `https://www.torqueblock.com/tubes/${slug}`;
    
    const robotsString = tube?.seo?.robots?.toLowerCase() || "index,follow";
    const robots = {
        index: !robotsString.includes("noindex"),
        follow: !robotsString.includes("nofollow"),
    };

    return {
        title: metaTitle,
        description: metaDescription,
        alternates: { canonical: canonical },
        robots: robots,
        openGraph: {
            type: "website",
            url: canonical,
            title: metaTitle,
            description: metaDescription,
            images: [
                {
                    url: mainImage,
                    width: 1200,
                    height: 630,
                    alt: displayName || "Tube",
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: [mainImage],
        },
    };
}

async function TubesDetailsPage({ params }) {
    const { slug } = await params;
    const tube = await getTube(slug);

    if (!tube) {
        notFound();
    }
    
    const displayName = tube?.productName || tube?.name || tube?.hero?.title || slug;
    const breadcrumbItems = [{ label: "Tubes", href: "/tubes", }, { label: displayName, isLast: true, },];

    return (
        <main className="w-full">
            <Breadcrumb items={breadcrumbItems} />
            <TubesDetailsClient initialData={tube} />
            <ProductSchema product={tube} />
            <BreadcrumbSchema items={breadcrumbItems} />
        </main>
    );
}

export default TubesDetailsPage;