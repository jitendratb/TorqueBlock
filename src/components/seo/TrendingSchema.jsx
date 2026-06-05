import React from "react";
import JsonLd from "./JsonLd";
import BreadcrumbSchema from "./BreadcrumbSchema";

const SITE_URL = "https://www.torqueblock.com";

export default function TrendingSchema({ trendAll = [], trendingFirst = null }) {
  // Combine first item and all other items into a single list
  const allItems = [];
  if (trendingFirst) {
    allItems.push(trendingFirst);
  }
  if (trendAll && trendAll.length > 0) {
    allItems.push(...trendAll);
  }

  // Generate CollectionPage Schema
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/trending#webpage`,
    "url": `${SITE_URL}/trending`,
    "name": "Trending Performance Motorcycle Tyres & Sizing Fitments | Torque Block",
    "description": "Discover the most popular performance superbike tyres trending among Indian riders. View real-time fitment verification, views, and expert guides.",
    "publisher": {
      "@type": "Organization",
      "name": "Torque Block",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.ico`
      }
    }
  };

  // Generate ItemList Schema for high ranking of trending products
  let itemListSchema = null;
  if (allItems.length > 0) {
    itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Trending Performance Tyres List",
      "description": "Ranked list of top-performing superbike tyres trending right now.",
      "numberOfItems": allItems.length,
      "itemListElement": allItems.map((item, index) => {
        const itemUrl = `${SITE_URL}/trending/${item?.slug}`;
        const displayName = item?.name || item?.productId?.productName || "Trending Tyre";
        const image = item?.bannerImage || item?.image || `${SITE_URL}/newLogo.webp`;
        const description = item?.shortDescription || "Trending performance tyre selection.";

        return {
          "@type": "ListItem",
          "position": index + 1,
          "name": displayName,
          "description": description,
          "image": image,
          "url": itemUrl
        };
      })
    };
  }

  // Breadcrumbs items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Trending", href: "/trending" }
  ];

  return (
    <>
      <JsonLd data={collectionPageSchema} id="trending-collection-schema" />
      {itemListSchema && <JsonLd data={itemListSchema} id="trending-itemlist-schema" />}
      <BreadcrumbSchema items={breadcrumbItems} />
    </>
  );
}