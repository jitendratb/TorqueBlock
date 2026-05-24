import React from "react";
import JsonLd from "./JsonLd";

export default function ArticleSchema({ article }) {
  if (!article) return null;

  const headline = article?.header || article?.title || "Blog Post";
  const description = article?.subHeader || article?.description || "";
  const imageUrl = article?.image || "https://torqueblock.com/newlogo.webp";
  const authorName = article?.editor || article?.author || "Torque Block";
  const datePublished = article?.timeofCreation || article?.createdAt || new Date().toISOString();
  const slug = article?.blogid || article?.slug || "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline,
    description: description,
    image: [imageUrl],
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Torque Block",
      logo: {
        "@type": "ImageObject",
        url: "https://torqueblock.com/newlogo.webp",
      },
    },
    datePublished: datePublished,
    dateModified: datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://torqueblock.com/blogs/${slug}`,
    },
  };

  return <JsonLd data={schema} id={`article-schema-${slug}`} />;
}