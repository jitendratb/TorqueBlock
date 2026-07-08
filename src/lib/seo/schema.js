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
            reviewCount: product?.ratingCount || 459,
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

export function generateTyreSizeSchema(sizeData, tyreSlug, sizeSlug) {
    if (!sizeData) return null;

    const displayName = sizeData?.hero?.title || `${sizeData?.availableTyres?.brand?.name || ''} ${sizeData?.availableTyres?.productName || ''} ${sizeData?.size || ''}`.trim() || 'Motorcycle Tyre';
    
    const displayDescription = sizeData?.seo?.metaDescription || sizeData?.hero?.subtitle || sizeData?.description;

    const mainImage = sizeData?.hero?.heroImage || sizeData?.availableTyres?.hero?.heroImage || DEFAULT_IMAGE;

    const brandName = sizeData?.availableTyres?.brand?.name || "Torque Block";
    const sku = sizeData?.identifier || `TB-${(tyreSlug || 'SKU')}-${(sizeSlug || 'SIZE')}`;

    const additionalProperty = [];

    if (sizeData?.width) {
        additionalProperty.push({ "@type": "PropertyValue", name: "Section Width", value: sizeData.width.toString(), unitText: "mm" });
    }
    if (sizeData?.aspectRatio) {
        additionalProperty.push({ "@type": "PropertyValue", name: "Aspect Ratio", value: sizeData.aspectRatio.toString() });
    }
    if (sizeData?.rimDiameter) {
        additionalProperty.push({ "@type": "PropertyValue", name: "Rim Diameter", value: sizeData.rimDiameter.toString(), unitText: "inches" });
    }
    if (sizeData?.position) {
        additionalProperty.push({ "@type": "PropertyValue", name: "Position", value: sizeData.position });
    }
    
    if (sizeData?.aiSearch?.summary) {
        additionalProperty.push({ "@type": "PropertyValue", name: "AI Summary", value: sizeData.aiSearch.summary });
    }

    if (sizeData?.compatibleVehicles && Array.isArray(sizeData.compatibleVehicles)) {
        sizeData.compatibleVehicles.forEach(vehicle => {
            const bikeName = vehicle?.brand && vehicle?.model ? `${vehicle.brand} ${vehicle.model}` : vehicle?.name || vehicle;
            if (typeof bikeName === 'string' && bikeName) {
                additionalProperty.push({ "@type": "PropertyValue", name: "Compatible Vehicle", value: bikeName });
            }
        });
    }

    const seller = {
        "@type": "Organization",
        "name": "Torque Block",
        "url": SITE_URL
    };

    const priceValidUntil = new Date();
    priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

    const offers = {
        "@type": "Offer",
        url: `${SITE_URL}/tyres/${tyreSlug}/${sizeSlug}`,
        priceCurrency: sizeData?.currency || "INR",
        price: sizeData?.price || sizeData?.pricing?.minPrice || 0,
        availability: sizeData?.availability === "in_stock" ? "https://schema.org/InStock" 
            : sizeData?.availability === "backorder" ? "https://schema.org/BackOrder"
            : sizeData?.availability === "preorder" ? "https://schema.org/PreOrder"
            : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
        priceValidUntil: priceValidUntil.toISOString().split('T')[0],
        seller: seller,
    };

    const imagesList = sizeData?.availableTyres?.productImages?.length > 0
        ? sizeData.availableTyres.productImages
        : [mainImage];

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: displayName,
        description: displayDescription,
        image: imagesList,
        sku: sku,
        mpn: sku,
        category: sizeData?.availableTyres?.categoryId?.name || "Motorcycle Parts",
        url: `${SITE_URL}/tyres/${tyreSlug}/${sizeSlug}`,
        brand: { "@type": "Brand", name: brandName },
        offers: offers,
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: sizeData?.schemaMarkup?.aggregateRating || 4.8,
            reviewCount: sizeData?.schemaMarkup?.reviewCount || 190,
        },
    };

    if (additionalProperty.length > 0) {
        schema.additionalProperty = additionalProperty;
    }

    return schema;
}