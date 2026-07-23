"use client"
import React, { useState } from 'react'
import Description from './Description';
import BuyingGuide from './BuyingGuide'
import FAQSection from '@/components/atoms/FAQSection';
import SubProductDetails from '../SubProductDetails';


function TyreSizeClient({ initialData }) {
    const [tyreSize] = useState(initialData);
    
    return (
        <div>
            <SubProductDetails tyreData={tyreSize} />
            <Description tyreData={tyreSize} />
            <BuyingGuide tyreData={tyreSize} />
            <FAQSection faqs={tyreSize?.faqs} />
        </div>
    )
}

export default TyreSizeClient
