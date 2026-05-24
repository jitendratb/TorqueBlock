import Breadcrumb from "@/components/atoms/BreadCrumb";
import tyresService from "@/services/tyresService";
import TyresClient from "../../Components/TyresClient";
import { cache } from "react";
import { notFound } from "next/navigation";
import ProductSchema from "@/components/seo/ProductSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import { getTyreFAQs } from "@/lib/seo/faqs";


const getTyre = cache(async (slug) => {
    return await tyresService.getTyreBySlug(slug);
});

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const tyre = await getTyre(slug);

    if (!tyre) return {};

    const displayName = tyre?.productName || tyre?.hero?.title;
    const displayDescription = tyre?.hero?.subtitle
        || (displayName ? `Explore ${displayName} tyre sizes, compatibility, grip performance, and reviews.` : "Explore tyre sizes, compatibility, grip performance, and reviews.");

    const displayTitle = displayName
        ? `${displayName} Review, Sizes & Compatible Bikes`
        : "Tyre Review, Sizes & Compatible Bikes";

    const mainImage = tyre?.productImages?.[0] || tyre?.hero?.heroImage || "/newLogo.webp";

    return {
        title: tyre?.seo?.title || displayTitle,
        description: tyre?.seo?.description || displayDescription,
        alternates: { canonical: `https://torqueblock.com/tyres/${slug}`, },
        robots: { index: true, follow: true, },
        openGraph: {
            type: "website",
            url: `https://torqueblock.com/tyres/${slug}`,
            title: tyre?.seo?.title || displayName || "Tyre Details",
            description: tyre?.seo?.description || displayDescription,
            images: [
                {
                    url: mainImage,
                    width: 1200,
                    height: 630,
                    alt: displayName || "Tyre",
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: tyre?.seo?.title || displayName || "Tyre Details",
            description: tyre?.seo?.description || displayDescription,
            images: [mainImage],
        },
    };
}

async function Page({ params }) {
    const { slug } = await params;
    const tyre = await getTyre(slug);

    if (!tyre) {
        notFound();
    }

    const displayName = tyre?.productName || tyre?.hero?.title || slug;
    const breadcrumbItems = [{ label: "Tyres", href: "/tyres", }, { label: displayName, isLast: true, },];
    const faqs = getTyreFAQs(tyre);

    return (
        <div className="">
            <Breadcrumb items={breadcrumbItems} />
            <TyresClient initialData={tyre} />
            
            {/* Structured JSON-LD Schema */}
            <ProductSchema product={tyre} />
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={breadcrumbItems} />
        </div>
    );
}

export default Page;