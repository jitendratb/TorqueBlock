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

    const additionalProperty = [];

    if (product?.aiSearch?.summary) {
        additionalProperty.push({
            "@type": "PropertyValue",
            name: "AI Summary",
            value: product.aiSearch.summary
        });
    }

    if (product?.bestSuitedFor && Array.isArray(product.bestSuitedFor) && product.bestSuitedFor.length > 0) {
        additionalProperty.push({
            "@type": "PropertyValue",
            name: "Best For",
            value: product.bestSuitedFor.join(", ")
        });
    }

    if (product?.notIdealIf && Array.isArray(product.notIdealIf) && product.notIdealIf.length > 0) {
        additionalProperty.push({
            "@type": "PropertyValue",
            name: "Not Ideal If",
            value: product.notIdealIf.join(", ")
        });
    }

    if (product?.aiSearch?.quickFacts) {
        Object.entries(product.aiSearch.quickFacts).forEach(([key, value]) => {
            additionalProperty.push({
                "@type": "PropertyValue",
                name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(), // Convert camelCase to Capitalized Words
                value: value
            });
        });
    }

    if (product?.specifications && Array.isArray(product.specifications)) {
        product.specifications.forEach(spec => {
            if (spec.label && spec.value) {
                additionalProperty.push({
                    "@type": "PropertyValue",
                    name: spec.label,
                    value: spec.value
                });
            }
        });
    }

    if (product?.compatibleVehicles && Array.isArray(product.compatibleVehicles)) {
        product.compatibleVehicles.forEach(vehicle => {
            const bikeName = vehicle?.brand && vehicle?.model 
                ? `${vehicle.brand} ${vehicle.model}` 
                : (vehicle?.brand || vehicle?.model || vehicle);
            
            if (bikeName) {
                additionalProperty.push({
                    "@type": "PropertyValue",
                    name: "Compatible Vehicle",
                    value: bikeName
                });
            }
        });
    }

    const imagesList = product?.productImages && Array.isArray(product.productImages) && product.productImages.length > 0
        ? product.productImages
        : [mainImage];

    const seller = {
        "@type": "Organization",
        "name": "Torque Block",
        "url": SITE_URL
    };

    const priceValidUntil = new Date();
    priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);
    const priceValidUntilStr = priceValidUntil.toISOString().split('T')[0];

    const hasPriceRange = product?.startingPrice && product?.endingPrice;
    const offers = hasPriceRange ? {
        "@type": "AggregateOffer",
        url: `${SITE_URL}/tyres/${slug}`,
        priceCurrency: "INR",
        lowPrice: product.startingPrice,
        highPrice: product.endingPrice,
        offerCount: (product?.frontSizes?.length || 0) + (product?.rearSizes?.length || 0) || 1,
        availability: product?.availability?.inStock || product?.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        seller: seller,
    } : {
        "@type": "Offer",
        url: `${SITE_URL}/tyres/${slug}`,
        priceCurrency: "INR",
        price: product?.price || 0,
        availability: product?.availability?.inStock || product?.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
        priceValidUntil: priceValidUntilStr,
        seller: seller,
    };

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: displayName,
        description: displayDescription,
        image: imagesList,
        sku: product?.sku || `TB-${(slug || 'SKU').substring(0, 40)}`,
        mpn: product?.mpn || product?.sku || `TB-${(slug || 'MPN').substring(0, 40)}`,
        category: product?.category || "Motorcycle Parts",
        url: `${SITE_URL}/tyres/${slug}`,
        brand: { "@type": "Brand", name: brandName },
        offers: offers,

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product?.rating || 4.8,
            reviewCount: product?.ratingCount || 1,
        },

        review: [
            {
                "@type": "Review",
                reviewRating: {
                    "@type": "Rating",
                    ratingValue: product?.rating || 4.8,
                    bestRating: "5",
                },
                author: {
                    "@type": "Person",
                    name: "Verified Rider",
                },
                reviewBody: `Excellent grip and performance. Perfect fit for premium motorcycles.`,
            }
        ],
    };

    if (additionalProperty.length > 0) {
        schema.additionalProperty = additionalProperty;
    }

    return schema;
}