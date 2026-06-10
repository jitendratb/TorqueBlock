const SITE_URL = "https://www.torqueblock.com";

const DEFAULT_IMAGE = "/newLogo.webp";

export function generateProductSchema(product) {
    if (!product) return null;

    const displayName = product?.productName || product?.hero?.title || product?.name;

    const displayDescription = product?.hero?.subtitle
        || product?.shortDescription
        || product?.seo?.description
        || product?.description;

    const mainImage = product?.productImages?.[0]
        || product?.hero?.heroImage
        || product?.image
        || DEFAULT_IMAGE;

    const brandName = product?.brand?.name || product?.brand || "Torque Block";
    const slug = product?.identifier || product?.slug;

    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: displayName,
        description: displayDescription,
        image: [mainImage],
        sku: product?.sku || `TB-${(slug || 'SKU').substring(0, 40)}`,
        mpn: product?.mpn || product?.sku || `TB-${(slug || 'MPN').substring(0, 40)}`,
        category: product?.category || "Motorcycle Parts",
        url: `${SITE_URL}/tyres/${slug}`,
        brand: { "@type": "Brand", name: brandName },

        offers: {
            "@type": "Offer",
            url: `${SITE_URL}/tyres/${slug}`,
            priceCurrency: "INR",
            price: product?.price || 0,
            availability: product?.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
        },

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product?.rating || 4.8,
            reviewCount: product?.ratingCount || 1,
        },
    };
}