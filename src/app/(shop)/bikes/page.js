import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';
import dynamic from 'next/dynamic';
const BikesClient = dynamic(() => import('../Components/TyreComponent/BikesClient'), { ssr: true, loading: () => <div className="min-h-[500px] w-full animate-pulse bg-zinc-900 rounded-xl mt-4" /> });
import vehicleService from '@/services/vehicleService';
import WebPageSchema from '@/components/seo/WebPageSchema';

export async function generateMetadata() {
  return {
    title: 'Motorcycles | Torque Block',
    description: 'Find the best performance tyres for your motorcycle brand and model. Premium tyre selection for superbikes and track riding.',
    keywords: [
      'superbike tyres by model',
      'motorcycle tyre fitment chart',
      'Kawasaki tyres',
      'Honda tyres',
      'BMW motorcycle tyres',
      'KTM tyres'
    ],
    alternates: {
      canonical: 'https://www.torqueblock.com/bikes',
    },
    openGraph: {
      title: 'Motorcycles | Torque Block',
      description: 'Find the best performance tyres for your motorcycle brand and model. Premium tyre selection for superbikes and track riding.',
      url: 'https://www.torqueblock.com/bikes',
      siteName: 'Torque Block',
      images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
      type: 'website',
    },
  };
}

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

  const brandsArray = Array.isArray(initialBrands) ? initialBrands : initialBrands?.vehicleBrandsData || [];
  const schemaItems = brandsArray.map((brand) => ({
    name: brand.bikeModel ? `${brand.bikeBrand} ${brand.bikeModel}` : brand.name || "Bike Brand",
    url: `/bikes/${brand.identifier || brand.slug || brand.name?.toLowerCase().replace(/ /g, '-') || ''}`
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