import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import BikesClient from '../Components/TyreComponent/BikesClient';
import vehicleService from '@/services/vehicleService';
import WebPageSchema from '@/components/seo/WebPageSchema';

export const metadata = {
  title: 'Motorcycles | Torque Block',
  description: 'Find the best performance tyres for your motorcycle brand and model. Premium tyre selection for superbikes and track riding.',
  alternates: {
    canonical: 'https://torqueblock.com/bikes',
  },
  openGraph: {
    title: 'Motorcycles | Torque Block',
    description: 'Find the best performance tyres for your motorcycle brand and model. Premium tyre selection for superbikes and track riding.',
    url: 'https://torqueblock.com/bikes',
    siteName: 'Torque Block',
    images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
    type: 'website',
  },
};

export default async function BikesPage() {
  let initialBrands = [];
  try {
    initialBrands = await vehicleService.getVehicleBrands();
  } catch (error) {
    console.error("Error fetching vehicle brands:", error);
  }

  const breadcrumbItems = [
    { label: 'Bikes', isLast: true },
  ];

  const schemaItems = (initialBrands || []).map((brand) => ({
    name: brand.name || "Bike Brand",
    url: `/bikes/${brand.slug || brand.name?.toLowerCase().replace(/ /g, '-') || ''}`
  }));

  return (
    <>
      <WebPageSchema 
        type="CollectionPage"
        title="Motorcycles"
        description="Find the best performance tyres for your motorcycle brand and model."
        url="/bikes"
        items={schemaItems}
      />
      <div className="space-y-4">
        <Breadcrumb items={breadcrumbItems} />      
        <BikesClient initialBrands={initialBrands || []} />
      </div>
    </>
  );
}