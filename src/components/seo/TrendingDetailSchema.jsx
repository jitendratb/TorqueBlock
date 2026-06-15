import React from "react";
import JsonLd from "./JsonLd";
import FAQSchema from "./FAQSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

const SITE_URL = "https://www.torqueblock.com";

export default function TrendingDetailSchema({ item }) {
  if (!item) return null;

  const slug = item.slug;
  const canonical = item.seo?.canonicalUrl || `${SITE_URL}/trending/${slug}`;
  const product = item.productId;

  const brandName = product?.brand?.name
    || (typeof product?.brand === "string" && !product.brand.match(/^[0-9a-fA-F]{24}$/) ? product.brand : "")
    || (product?.productName ? product.productName.split(" ")[0] : "Torque Block");

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": item.name || `${product?.productName || "Tyre"} for ${item.bike?.bikeBrand?.brandName || "BMW"} ${item.bike?.bikeModel || "GS"}`,
    "description": item.shortDescription || item.description,
    "image": [
      item.bannerImage || item.image || product?.hero?.heroImage || `${SITE_URL}/newLogo.webp`
    ],
    "sku": (product?.sku || `TB-${slug}`).substring(0, 70),
    "mpn": (product?.mpn || product?.sku || `TB-${slug}`).substring(0, 70),
    "category": "Motorcycle Tyres",
    "url": canonical,
    "brand": {
      "@type": "Brand",
      "name": brandName
    },
    "offers": {
      "@type": "Offer",
      "url": canonical,
      "priceCurrency": "INR",
      "price": product?.price || 0,
      "availability": product?.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Trending", href: "/trending" },
    { label: item.name || "Trending Details", href: `/trending/${slug}` }
  ];

  return (
    <>
      <JsonLd data={productSchema} id={`trending-detail-product-${item._id}`} />
      <BreadcrumbSchema items={breadcrumbItems} />
      {item.faqs && item.faqs.length > 0 && <FAQSchema faqs={item.faqs} />}
    </>
  );
}
