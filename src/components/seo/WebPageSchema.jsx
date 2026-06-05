import React from 'react';
import JsonLd from './JsonLd';

const SITE_URL = "https://www.torqueblock.com";
const SITE_NAME = "Torque Block";

export default function WebPageSchema({
  type = 'WebPage',
  title,
  description,
  url,
  items = [],
  datePublished,
  dateModified,
}) {
  if (!title || !url) return null;

  const absoluteUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": title,
    "description": description,
    "url": absoluteUrl,
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.ico`
      }
    }
  };

  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;

  // Add ItemList if items are provided (useful for brands, tyres, compare lists)
  if (items && items.length > 0) {
    schema.mainEntity = {
      "@type": "ItemList",
      "itemListElement": items.map((item, index) => {
        const itemUrl = item.url
          ? (item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`)
          : absoluteUrl;

        return {
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name || `Item ${index + 1}`,
          "url": itemUrl
        };
      })
    };
  }

  // Specific enhancements based on page type
  if (type === 'ContactPage') {
    schema.mainEntity = schema.mainEntity || {
      "@type": "Organization",
      "name": SITE_NAME,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@torqueblock.com",
        "url": absoluteUrl
      }
    };
  } else if (type === 'AboutPage') {
    schema.mainEntity = schema.mainEntity || {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": absoluteUrl,
      "sameAs": [
        "https://instagram.com/torqueblock",
        "https://facebook.com/torqueblock"
      ]
    };
  }

  return <JsonLd data={schema} id={`schema-${type.toLowerCase()}`} />;
}
