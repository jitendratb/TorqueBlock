import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import BrandsClient from '../Components/BrandsComponents/BrandsClient';
import brandServiceInstance from '@/services/brandService';
import WebPageSchema from "@/components/seo/WebPageSchema";
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { cache } from 'react';

const getBrand = cache(async () => {
  try {
    return await brandServiceInstance.getBrands({ isActive: true });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
});

export async function generateMetadata() {
  const title = "Premium Motorcycle Tyre Brands | Torque Block";
  const description = "Explore premium motorcycle tyre brands including Pirelli, Michelin, Metzeler, and more. Authorized partners for superior performance and safety.";
  const url = "https://www.torqueblock.com/brands";

  return {
    title,
    description,
    keywords: [
      'motorcycle tyre brands',
      'Pirelli India',
      'Metzeler India',
      'Michelin India',
      'Pirelli tyres Bangalore',
      'Metzeler tyres Bangalore',
      'Michelin tyres near me',
      'Bridgestone bike tyres'
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Torque Block",
      images: [
        {
          url: "/favicon.ico",
          width: 1200,
          height: 630,
          alt: "Torque Block - Premium Motorcycle Tyre Brands",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/favicon.ico"],
    },
  };
}

async function Brands() {
  const brands = await getBrand();

  const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Brands', url: '/brands', isLast: true }
  ];

  const schemaItems = (brands || []).map((brand) => ({
    name: brand.name || "Brand",
    url: `/brands/${brand.slug || brand.name?.toLowerCase().replace(/ /g, '-') || ''}`
  }));

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebPageSchema 
        type="CollectionPage"
        title="Premium Motorcycle Tyre Brands"
        description="Explore premium motorcycle tyre brands including Pirelli, Michelin, Metzeler, and more."
        url="/brands"
        items={schemaItems}
      />
      <main className="">
        <div className="">
          <Breadcrumb items={[{ label: 'Brands', isLast: true }]} />
            <BrandsClient brands={brands || []} />
        </div>
      </main>
    </>
  );
}

export default Brands;