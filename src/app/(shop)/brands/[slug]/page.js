import Breadcrumb from '@/components/atoms/BreadCrumb';
import brandServiceInstance from '@/services/brandService';
import React from 'react'
import BrandsDetailsClient from '../../Components/BrandsComponents/BrandsDetailsClient';
import { cache } from "react";
import { notFound } from "next/navigation";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import BrandSchema from "@/components/seo/BrandSchema";


const getBrandDetails = cache(async (slug) => {
  return await brandServiceInstance.getBrandBySlug(slug);
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = await getBrandDetails(slug);

  if (!brand) return {};

  const displayName = brand?.name
    ? brand.name.charAt(0).toUpperCase() + brand.name.slice(1).toLowerCase()
    : "";

  const displayTitle = brand?.metaTitle
    || (displayName ? `Premium ${displayName} Tyres & Performance Compounds | Torque Block` : "Premium Tyre Brands | Torque Block");

  const displayDescription = brand?.metaDescription
    || (displayName ? `Shop high-performance ${displayName} tyres and compounds. Sourced directly from authorized pipelines with expert fitment assistance.` : "Shop premium motorcycle tyre brands.");

  const mainImage = brand?.brandBanner || brand?.featuredData?.featureImg || brand?.brandLogo || "/newLogo.webp";
  const keywords = displayName ? [
    `${displayName} tyres`,
    `${displayName} India`,
    `${displayName} performance tyres`,
    `buy ${displayName} tyres online`,
    `${displayName} tyre specs`
  ] : [];

  return {
    title: displayTitle,
    description: displayDescription,
    keywords,
    alternates: { canonical: `https://www.torqueblock.com/brands/${slug}`, },
    robots: { index: true, follow: true, },
    openGraph: {
      type: "website",
      url: `https://www.torqueblock.com/brands/${slug}`,
      title: displayTitle,
      description: displayDescription,
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: displayName || "Tyre Brand",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: displayDescription,
      images: [mainImage],
    },
  };
}

async function BrandDetailPage({ params }) {
  const { slug } = await params;
  const brand = await getBrandDetails(slug);

  if (!brand) {
    notFound();
  }

  const breadcrumbItems = [{ label: 'Brands', href: '/brands' }, { label: brand?.name, isLast: true }];

  return (
    <div className='pb-4 space-y-4'>
      <Breadcrumb items={breadcrumbItems} />
      <BrandsDetailsClient brand={brand} />
      <BrandSchema brand={brand} slug={slug} />
      <BreadcrumbSchema items={breadcrumbItems} />
    </div>
  )
}

export default BrandDetailPage;