"use client"
import React, { useState } from 'react'
import Description from './Description';
import BuyingGuide from './BuyingGuide'
import FAQSection from '@/components/atoms/FAQSection';
import SubProductDetails from '../SubProductDetails';
import ReviewsCard from '@/components/atoms/reviewCard';
import TyreSection from '../NewLaunchTyres';


function TyreSizeClient({ initialData, reviewData }) {
    const [tyreSize] = useState(initialData);

    return (
        <div className='flex flex-col gap-4 pb-4'>
            <SubProductDetails tyreData={tyreSize} reviewData={reviewData} />
            <Description tyreData={tyreSize} />
            <BuyingGuide tyreData={tyreSize} />
            <ReviewsCard reviewData={reviewData} productId={tyreSize?._id} />
            <TyreSection
                categoryId={tyreSize?.availableTyres?.categoryId?._id}
                title="Similar Tyres"
                subtitle="Similar tyres you might like"

            />
            <FAQSection faqs={tyreSize?.faqs} />
        </div>
    )
}

export default TyreSizeClient
