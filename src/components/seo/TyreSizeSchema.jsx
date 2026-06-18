import React from "react";
import { generateTyreSizeSchema } from "@/lib/seo/schema";
import JsonLd from "./JsonLd";

export default function TyreSizeSchema({ sizeData, tyreSlug, sizeSlug }) {
  if (!sizeData) return null;

  const schema = generateTyreSizeSchema(sizeData, tyreSlug, sizeSlug);
  const identifierId = sizeData?.identifier || `${tyreSlug}-${sizeSlug}` || "tyre-size";

  return <JsonLd data={schema} id={`tyre-size-schema-${identifierId}`} />;
}
