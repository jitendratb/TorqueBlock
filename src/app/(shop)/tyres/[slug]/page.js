import Breadcrumb from "@/components/atoms/BreadCrumb";
import tyresService from "@/services/tyresService";
import TyresClient from '../../Components/TyresClient';
import { cache } from "react";
import { notFound } from "next/navigation";
import ProductSchema from "@/components/seo/ProductSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import ReviewService from "@/services/reviewSevice";

const getTyre = cache(async (slug) => {
    return await tyresService.getTyreBySlug(slug);
});

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const tyre = await getTyre(slug);


    if (!tyre) return {};

    const displayName = tyre?.productName || tyre?.hero?.title;
    const brandName = tyre?.brand?.name || tyre?.brand || "Torque Block";

    const displayTitle = tyre?.seo?.metaTitle
        ? `${tyre.seo.metaTitle} | Torque Block`
        : `${brandName} ${displayName} | Price, Sizes & Fitment Guide | Torque Block`
    const displayDescription = tyre?.seo?.metaDescription || tyre?.seo?.description || tyre?.hero?.subtitle ||
        (displayName
            ? `Buy ${brandName} ${displayName} motorcycle tyres online in India at Torque Block. Check available sizes, compatible bikes, verified customer reviews, latest price, and expert fitment support near you.`
            : "Explore high-performance motorcycle tyre sizes, compatibility, pricing, and local installation support at Torque Block India.");

    const productImages = tyre?.productImages || [];
    const gallery = tyre?.gallery || [];
    const productImage = tyre?.productImage || [];
    const heroImage = tyre?.hero?.heroImage;

    const rawImage =
        (typeof productImages[0] === 'string' ? productImages[0] : productImages[0]?.url) ||
        (typeof gallery[0] === 'string' ? gallery[0] : gallery[0]?.url) ||
        (typeof productImage[0] === 'string' ? productImage[0] : productImage[0]?.url) ||
        heroImage;

    const mainImage = rawImage?.startsWith('http')
        ? rawImage
        : rawImage
            ? `https://www.torqueblock.com${rawImage}`
            : 'https://www.torqueblock.com/newlogo.webp';

    const metaTitle = tyre?.seo?.metaTitle || tyre?.seo?.title || displayTitle;
    const canonical = `https://www.torqueblock.com/tyres/${slug}`;

    const robotsString = tyre?.seo?.robots?.toLowerCase() || "index,follow";
    const robots = {
        index: !robotsString.includes("noindex"),
        follow: !robotsString.includes("nofollow"),
        googleBot: {
            index: !robotsString.includes("noindex"),
            follow: !robotsString.includes("nofollow"),
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    };

    const keywords = [
        displayName && `${brandName} ${displayName}`,
        displayName && `${displayName} price India`,
        displayName && `${displayName} sizes`,
        displayName && `buy ${displayName} online`,
        brandName && `${brandName} tyres India`,
        'motorcycle tyres India',
        'superbike tyres online',
        'performance tyres Bangalore',
    ].filter(Boolean);

    return {
        title: metaTitle,
        description: displayDescription,
        keywords,
        alternates: { canonical },
        robots,
        openGraph: {
            type: "website",
            url: canonical,
            siteName: "Torque Block",
            locale: "en_IN",
            title: metaTitle,
            description: displayDescription,
            images: [
                {
                    url: mainImage,
                    width: 1200,
                    height: 630,
                    alt: displayName ? `${brandName} ${displayName} Motorcycle Tyre` : "Torque Block Motorcycle Tyre",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: displayDescription,
            images: [mainImage],
        },
    };
}

async function Page({ params }) {
    const { slug } = await params;
    const tyre = await getTyre(slug);
    const Review = await ReviewService.getReviews({ tyreId: tyre?._id });
    const formattedTyre = tyre;

    const displayName = formattedTyre?.productName || formattedTyre?.hero?.title || slug;
    const breadcrumbItems = [
        { label: "Tyres", href: "/tyres" },
        { label: displayName, isLast: true },
    ];

    return (
        <div className="">
            <ProductSchema product={formattedTyre}  reviewData={Review}/>
            <BreadcrumbSchema items={breadcrumbItems} />
            <LocalBusinessSchema />
            {formattedTyre?.faqs?.length > 0 && (
                <FAQSchema faqs={formattedTyre.faqs} />
            )}
            <Breadcrumb items={breadcrumbItems} />
            <TyresClient initialData={formattedTyre} reviewData={Review} />
        </div>
    );
}

export default Page;