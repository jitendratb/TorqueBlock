"use client";

import React, { useEffect, useState } from 'react';
import Description from './Description';
import BuyingGuide from './BuyingGuide';
import FAQSection from '@/components/atoms/FAQSection';
import SubProductDetails from '../SubProductDetails';
import ReviewsCard from '@/components/atoms/reviewCard';
import TyreSection from '../NewLaunchTyres';
import TubeSection from './TubeSection';

function TyreSizeClient({ initialData, reviewData }) {
    const [tyreSize] = useState(initialData);
    const [productIds , setProductIds] = useState([]);
    useEffect(()=>{
        if(tyreSize?.availableTyres?.length > 0){
            setProductIds(tyreSize?.availableTyres?.map((item) => item?._id));
        }
    },[tyreSize])

    const isTubeType = tyreSize?.tubeType?.includes?.("TT") || tyreSize?.tubeType === "TT";

    return (
        <div className="flex flex-col gap-4 pb-4">
            <SubProductDetails tyreData={tyreSize} reviewData={reviewData} setProductIds={setProductIds} />
            <Description tyreData={tyreSize} />
            <BuyingGuide tyreData={tyreSize} />
            {isTubeType && (
                <TubeSection productIds={productIds} />
            )}
            <ReviewsCard reviewData={reviewData} productId={tyreSize?._id} />
            <TyreSection
                categoryId={tyreSize?.availableTyres?.categoryId?._id}
                title="Similar Tyres"
                subtitle="Similar tyres you might like"
            />
            <FAQSection faqs={tyreSize?.faqs} />
        </div>
    );
}

export default TyreSizeClient;
