import React from "react";
import JsonLd from "./JsonLd";

const SITE_URL = "https://www.torqueblock.com";

export default function BrandSchema({ brand, slug }) {
  if (!brand) return null;

  const name = brand.name || "Tyre Brand";
  const logo = brand.brandLogo || "/newLogo.webp";
  const image = brand.brandBanner || brand.featuredData?.featureImg || "/newLogo.webp";
  const description = brand.metaDescription || `Premium authorized tyre collections from ${name} at Torque Block.`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: name,
    logo: logo,
    image: image,
    url: `${SITE_URL}/brands/${slug}`,
    description: description,
  };

  return <JsonLd data={schema} id={`brand-schema-${slug || "detail"}`} />;
}
