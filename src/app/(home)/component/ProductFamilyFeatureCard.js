import React from 'react'
import TyresService from '@/services/tyresService';
import ProductFamilyFeatureCardClient from './ProductFamilyFeatureCardClient.js'

const toCardData = (tyre) => ({
    _id: tyre?._id,
    identifier: tyre?.identifier,
    productName: tyre?.productName,
    brand: { name: tyre?.brand?.name },
    categoryId: { name: tyre?.categoryId?.name },
    productImages: tyre?.productImages,
    hero: { heroImage: tyre?.hero?.heroImage },
    startingPrice: tyre?.startingPrice,
});

async function ProductFamilyFeatureCard() {
    const res = await TyresService.getTyreByFamily({ isBestSeller: true, limit: 16, page: 1 });
    const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
    const recommendedTyre = { data: list.map(toCardData), pagination: res?.pagination };

  return (
   <ProductFamilyFeatureCardClient recommendedTyre={recommendedTyre}/>
  )
}

export default ProductFamilyFeatureCard;
