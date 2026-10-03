import React from 'react'
import TyresService from '@/services/tyresService';
import ProductFamilyFeatureCardClient from './ProductFamilyFeatureCardClient.js'

async function ProductFamilyFeatureCard() {
    const recommendedTyre = await TyresService.getTyreByFamily({ isBestSeller: true, limit: 16, page: 1 });

  return (
   <ProductFamilyFeatureCardClient recommendedTyre={recommendedTyre}/>
  )
}

export default ProductFamilyFeatureCard;