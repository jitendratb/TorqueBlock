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
  const url = "https://torqueblock.com/brands";

  return {
    title,
    description,
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
      <main className="pb-8 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb items={[{ label: 'Brands', isLast: true }]} />
          <div className="mt-4 md:mt-6">
            <h1 className="sr-only">Premium Motorcycle Tyre Brands</h1>
            <BrandsClient brands={brands || []} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Brands;