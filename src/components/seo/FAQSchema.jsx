import React from "react";
import JsonLd from "./JsonLd";

export default function FAQSchema({ faqs = [] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq, index) => {
      const question = faq.question || faq.name || `Question ${index + 1}`;
      const answer = faq.answer || faq.acceptedAnswer?.text || "";

      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      };
    }),
  };

  return <JsonLd data={schema} id="faq-schema" />;
}