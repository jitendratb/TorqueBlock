import Breadcrumb from "@/components/atoms/BreadCrumb";
import tyresService from "@/services/tyresService";
import dynamic from 'next/dynamic';
const TyresClient = dynamic(() => import('../../Components/TyresClient'), { ssr: true, loading: () => <div className="min-h-[500px] w-full animate-pulse bg-zinc-900 rounded-xl mt-4" /> });
import { cache } from "react";
import { notFound } from "next/navigation";
import ProductSchema from "@/components/seo/ProductSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";


const getTyre = cache(async (slug) => {
    return await tyresService.getTyreBySlug(slug);
});

// export async function generateMetadata({ params }) {
//     const { slug } = await params;
//     const tyre = await getTyre(slug);

//     if (!tyre) return {};

//     const displayName = tyre?.productName || tyre?.hero?.title;
//     const brandName = tyre?.brand?.name || tyre?.brand || "Torque Block";
//     const displayDescription = tyre?.hero?.subtitle || (displayName ? `Buy ${displayName} performance motorcycle tyres online in India. Check sizes, compatibility, verified reviews, price, and professional installation support near you.` : "Explore high performance motorcycle tyre sizes, compatibility, pricing, and local installation support.");

//     const displayTitle = displayName ? `${displayName} Price, Sizes & Compatible Bikes` : "Performance Motorcycle Tyres - Review, Sizes & Price";

//     const mainImage = tyre?.productImages?.[0] || tyre?.hero?.heroImage || "/newLogo.webp";
//     const metaTitle = tyre?.seo?.metaTitle || tyre?.seo?.title || displayTitle;
//     const metaDescription = tyre?.seo?.metaDescription || tyre?.seo?.description || displayDescription;
//     const canonical = tyre?.seo?.canonicalUrl || `https://www.torqueblock.com/tyres/${slug}`;
    
//     const robotsString = tyre?.seo?.robots?.toLowerCase() || "index,follow";
//     const robots = {
//         index: !robotsString.includes("noindex"),
//         follow: !robotsString.includes("nofollow"),
//     };

//     return {
//         title: metaTitle,
//         description: metaDescription,
//         alternates: { canonical: canonical },
//         robots: robots,
//         openGraph: {
//             type: "website",
//             url: canonical,
//             title: metaTitle,
//             description: metaDescription,
//             images: [
//                 {
//                     url: mainImage,
//                     width: 1200,
//                     height: 630,
//                     alt: displayName || "Tyre",
//                 },
//             ],
//         },

//         twitter: {
//             card: "summary_large_image",
//             title: metaTitle,
//             description: metaDescription,
//             images: [mainImage],
//         },
//     };
// }

async function Page({ params }) {
    const { slug } = await params;
    const tyre = await getTyre(slug);

    if (!tyre) {
        notFound();
    }

    const displayName = tyre?.productName || tyre?.hero?.title || slug;
    const breadcrumbItems = [{ label: "Tyres", href: "/tyres", }, { label: displayName, isLast: true, },];

    return (
        <div className="">
            <Breadcrumb items={breadcrumbItems} />
            <TyresClient initialData={tyre} />
            
            <ProductSchema product={tyre} />
            <BreadcrumbSchema items={breadcrumbItems} />
        </div>
    );
}

export default Page;