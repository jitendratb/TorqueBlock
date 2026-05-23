import React from 'react'
import Breadcrumb from '@/components/atoms/BreadCrumb'
import BrandsClient from '../Components/BrandsComponents/BrandsClient'
import brandServiceInstance from '@/services/brandService'

async function Brands() {
  const brands = await brandServiceInstance.getBrands({ isActive:true })
  return (
    <div className='pb-4'>
      <Breadcrumb items={[{ label: 'Brands', isLast: true }]} />
      <BrandsClient brands={brands}/>
    </div>
  )
}

export default Brands