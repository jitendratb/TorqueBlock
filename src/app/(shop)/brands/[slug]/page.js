import Breadcrumb from '@/components/atoms/BreadCrumb';
import brandServiceInstance from '@/services/brandService';
import React from 'react'
import BrandsDetailsClient from '../../Components/BrandsComponents/BrandsDetailsClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const brand = await brandServiceInstance.getBrandBySlug(slug);
    if (!brand) return { title: 'Premium Tyre Brands | Torque Block' };
    
    const brandName = brand?.name || brand?.brandName || 'Premium Partner';
    const keyword = brand?.brandKeyword || `${brandName.toLowerCase()} tyres`;
    
    return {
      title: `Premium ${brandName} Tyres & Performance Compounds | Torque Block`,
      description: `Shop high-performance ${brandName} tyres and compounds. Sourced directly from authorized pipelines. Find ${keyword} with expert fitment assistance.`,
      keywords: [brandName, 'tyres', 'motorcycle tyres', keyword, 'torque block'],
    };
  } catch (error) {
    return { title: 'Premium Tyre Brands | Torque Block' };
  }
}

async function BrandDetailPage({ params }) {
   const { slug } = await params;
  const brand = await brandServiceInstance.getBrandBySlug(slug)

  return (
    <div className='pb-4 space-y-4'>
      <Breadcrumb items={[{ label: 'Brands', href: '/brands' }, { label: brand?.name, isLast: true }]} />
      <BrandsDetailsClient brand={brand} />
    </div>
  )
}

export default BrandDetailPage;