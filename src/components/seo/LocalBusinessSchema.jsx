import React from "react";
import JsonLd from "./JsonLd";
import { siteConfig } from "@/config/site";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "name": siteConfig.name,
    "image": `${siteConfig.url}/favicon.ico`,
    "@id": `${siteConfig.url}/#localbusiness`,
    "url": siteConfig.url,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bangalore",
      "addressLocality": siteConfig.business.city,
      "addressRegion": siteConfig.business.region,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      siteConfig.socials.instagram,
      siteConfig.socials.facebook,
      siteConfig.socials.youtube
    ]
  };

  return <JsonLd data={schema} id="local-business-schema" />;
}
