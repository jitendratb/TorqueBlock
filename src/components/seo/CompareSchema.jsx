import React from "react";
import { generateProductSchema } from "@/lib/seo/schema";
import JsonLd from "./JsonLd";

export default function CompareSchema({ compare }) {
  if (!compare) return null;

  const tyre1Schema = generateProductSchema(compare.tyre1);
  const tyre2Schema = generateProductSchema(compare.tyre2);

  if (!tyre1Schema && !tyre2Schema) return null;

  // Structured ItemList representation of the compared products (highly optimized for Google Search Console)
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${compare.tyre1?.productName || "Tyre 1"} vs ${compare.tyre2?.productName || "Tyre 2"} Comparison`,
    description: compare.seo?.description || `Direct comparison of ${compare.tyre1?.productName} and ${compare.tyre2?.productName} motorcycle tyres.`,
    itemListElement: [
      ...(tyre1Schema ? [{
        "@type": "ListItem",
        position: 1,
        item: tyre1Schema,
      }] : []),
      ...(tyre2Schema ? [{
        "@type": "ListItem",
        position: 2,
        item: tyre2Schema,
      }] : []),
    ],
  };

  return <JsonLd data={schema} id={`compare-schema-${compare?.identifier || "detail"}`} />;
}
