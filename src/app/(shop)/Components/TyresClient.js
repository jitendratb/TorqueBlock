"use client";

import { memo } from "react";
import ProductDetails from "./TyreComponent/ProductDetails";
import Description from "./TyreComponent/Description";
import FitmentSection from "./TyreComponent/FitmentSection";
import Similar from "@/components/atoms/Similar";
import FAQSection from "@/components/atoms/FAQSection";
import ReviewsCard from "@/components/atoms/reviewCard";

const TyresClient = memo(function TyresClient({ initialData, reviewData }) {
 const tyre = initialData;

    return (
        <div className="py-4 space-y-4">
            <ProductDetails tyre={tyre} reviewData={reviewData} />
            <Description tyre={tyre} />
            <ReviewsCard reviewData={reviewData} tyreId={tyre?._id} />
            <FitmentSection tyre={tyre} scale={false} />
            <Similar tyre={tyre} />
            {tyre?.faqs?.length > 0 && <FAQSection faqs={tyre.faqs} />}
        </div>
    );
});

export default TyresClient;
