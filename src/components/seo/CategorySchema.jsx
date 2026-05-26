import React from 'react';

export default function CategorySchema({ categories }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Motorcycle Riding Styles & Disciplines",
    "description": "Select your motorcycle riding discipline to find the perfect premium tyres.",
    "itemListElement": categories.map((cat, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": cat.title,
      "description": cat.subtitle,
      "url": `https://www.torqueblock.com${cat.href}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
