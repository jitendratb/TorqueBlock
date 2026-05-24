import React from "react";
import { generateProductSchema } from "@/lib/seo/schema";
import JsonLd from "./JsonLd";

export default function ProductSchema({ product }) {
  if (!product) return null;

  const schema = generateProductSchema(product);
  const identifierId = product?.identifier || product?.slug || "product";

  return <JsonLd data={schema} id={`product-schema-${identifierId}`} />;
}