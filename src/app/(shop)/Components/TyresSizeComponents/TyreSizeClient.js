"use client"
import React, { useState } from 'react'
import ProductTyreDetails from './ProductTyreDetails';
import Description from './Description';
import BuyingGuide from './BuyingGuide'
import TrustCard from './TrustCard';
import FAQSection from '@/components/atoms/FAQSection';


function TyreSizeClient({ initialData }) {
    const [tyreSize] = useState(initialData);

    return (
        <div>
            <ProductTyreDetails tyreData={tyreSize} />
            <Description tyreData={tyreSize} />
            <BuyingGuide tyreData={tyreSize} />
            <TrustCard tyre={tyreSize} />
            <FAQSection faqs={tyreSize?.faqs} />
        </div>
    )
}

export default TyreSizeClient
