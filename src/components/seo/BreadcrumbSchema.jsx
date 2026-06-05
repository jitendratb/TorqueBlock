import React from "react";
import JsonLd from "./JsonLd";

const SITE_URL = "https://www.torqueblock.com";

export default function BreadcrumbSchema({ items = [] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const name = item.label || item.name || `Step ${index + 1}`;
      const relativePath = item.href || item.url || "/";

      // Ensure all breadcrumb item links are absolute URLs (required by Google Search Console)
      const absoluteUrl = relativePath.startsWith("http")
        ? relativePath
        : `${SITE_URL}${relativePath.startsWith("/") ? relativePath : `/${relativePath}`}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: name,
        item: absoluteUrl,
      };
    }),
  };

  return <JsonLd data={schema} id="breadcrumb-schema" />;
}