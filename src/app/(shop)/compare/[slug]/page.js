import Breadcrumb from '@/components/atoms/BreadCrumb';
import compareServiceInstance from '@/services/compareService';
import { cache } from "react";
import { notFound } from "next/navigation";
import CompareClient from '../../Components/CompareComponents/CompareClient';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import CompareSchema from '@/components/seo/CompareSchema';
import FAQSchema from "@/components/seo/FAQSchema";
import { getCompareFAQs } from "@/lib/seo/faqs";

const getCompareDetails = cache(async (slug) => {
  const res = await compareServiceInstance.getByIdCompare(slug);
  return res?.comparisonConnectorModelData?.[0]
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const compare = await getCompareDetails(slug);
  if (!compare) return {};

  const tyre1 = compare?.tyre1;
  const tyre2 = compare?.tyre2;

  const parts = (slug || '').split('-vs-');
  const tyre1Name = tyre1?.productName || parts[0]?.replace(/-/g, ' ') || 'Tyre 1';
  const tyre2Name = tyre2?.productName || parts[1]?.replace(/-/g, ' ') || 'Tyre 2';

  const displayTitle = `${tyre1Name} vs ${tyre2Name} - Tyre Comparison | Torque Block`;
  const displayDescription = `Full head-to-head comparison: ${tyre1Name} vs ${tyre2Name}. Compare dry grip, wet grip, mileage, sport handling and comfort.`;
  const mainImage = tyre1?.productImages?.[0] || "/newLogo.webp";

  return {
    title: compare?.seo?.title || displayTitle,
    description: compare?.seo?.description || displayDescription,
    alternates: { canonical: `https://torqueblock.com/compare/${slug}`, },
    robots: { index: true, follow: true, },
    openGraph: {
      type: "website",
      url: `https://torqueblock.com/compare/${slug}`,
      title: compare?.seo?.title || displayTitle,
      description: compare?.seo?.description || displayDescription,
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: displayTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: compare?.seo?.title || displayTitle,
      description: compare?.seo?.description || displayDescription,
      images: [mainImage],
    },
  };
}

export default async function CompareDetails({ params }) {
  const { slug } = await params;
  let data = await getCompareDetails(slug);

  if (!data) {
    notFound();
  }

  const parts = (slug || '').split('-vs-');
  const tyre1 = data?.tyre1 || {};
  const tyre2 = data?.tyre2 || {};
  const tyre1Name = tyre1?.productName || parts[0]?.replace(/-/g, ' ') || 'Tyre 1';
  const tyre2Name = tyre2?.productName || parts[1]?.replace(/-/g, ' ') || 'Tyre 2';

  const breadcrumbItems = [
    { label: 'Compare', href: '/compare' },
    { label: `${tyre1Name} vs ${tyre2Name}`, isLast: true },
  ];
  const faqs = getCompareFAQs(data);

  return (
    <div className="space-y-4 mb-4">
      <Breadcrumb items={breadcrumbItems} />
      <CompareClient data={data} slug={slug} />

      {/* Silent FAQ JSON-LD Schema */}
      <FAQSchema faqs={faqs} />

      {/* Structured JSON-LD Schema */}
      <CompareSchema compare={data} />
      <BreadcrumbSchema items={breadcrumbItems} />
    </div>
  );
}