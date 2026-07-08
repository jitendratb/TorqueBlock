"use client";

import React, { useState } from "react";
import ProductDetails from "./TyreComponent/ProductDetails";
import Description from "./TyreComponent/Description";
import FitmentSection from "./TyreComponent/FitmentSection";
import TrustSection from "./TyreComponent/TrustSection";
import Similar from "@/components/atoms/Similar";
import FAQSection from "@/components/atoms/FAQSection";
import ReviewsCard from "@/components/atoms/reviewCard";

function TyresClient({ initialData }) {
    const [tyre] = useState(initialData);

    return (
        <div className="py-4 space-y-4">
            {/* <ProductDetails tyre={tyre} /> */}
            <Description tyre={tyre} />

            {/* <TrustSection tyre={tyre} /> */}
            {/* <ReviewsCard reviews={tyre?.reviews} /> */}
            <FitmentSection tyre={tyre} scale={false} />
            <Similar tyre={tyre} />
            {tyre?.faqs && <FAQSection faqs={tyre?.faqs} />}
        </div>
    );
}

export default TyresClient;
