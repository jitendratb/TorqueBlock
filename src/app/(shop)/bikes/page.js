import React from 'react'
import Breadcrumb from '@/components/atoms/BreadCrumb';
import BikesClient from '../Components/TyreComponent/BikesClient';
import vehicleService from '@/services/vehicleService';

export const metadata = {
  title: 'Motorcycles - Torque Block',
  description: 'Find the best performance tyres for your motorcycle brand and model.',
};

export default async function BikesPage() {
  let initialBrands = await vehicleService.getVehicleBrands();

  const breadcrumbItems = [
    { label: 'Bikes', isLast: true },
  ];

  return (
    <div className="space-y-4">
      <Breadcrumb items={breadcrumbItems} />      
      <BikesClient initialBrands={initialBrands} />
    </div>
  )
}