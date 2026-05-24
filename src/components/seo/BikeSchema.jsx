import React from "react";
import JsonLd from "./JsonLd";

export default function BikeSchema({ bike }) {
  if (!bike) return null;

  const name = `${bike.bikeBrand || ""} ${bike.bikeModel || ""}`.trim() || "Motorcycle";
  const description = bike.subTitle || `Premium tyre compatibility, specifications, and performance picks for ${name}.`;
  const image = bike.heroImage || "/newLogo.webp";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    image: [image],
    category: "Motorcycle",
    brand: {
      "@type": "Brand",
      name: bike.bikeBrand || "Motorcycle Brand",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      description: `Premium tyre fitment and compatible rubbers for ${name}. Standard Front size: ${bike.frontSizes?.[0] || "N/A"}, Standard Rear size: ${bike.rearSizes?.[0] || "N/A"}.`,
    },
  };

  return <JsonLd data={schema} id={`bike-schema-${bike.identifier || "detail"}`} />;
}
