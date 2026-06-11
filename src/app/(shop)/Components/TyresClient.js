"use client";

import React, { useState } from "react";
import ProductDetails from "./TyreComponent/ProductDetails";
import Description from "./TyreComponent/Description";
import FitmentSection from "./TyreComponent/FitmentSection";
import TrustSection from "./TyreComponent/TrustSection";
import Similar from "@/components/atoms/Similar";
import FAQSection from "@/components/atoms/FAQSection";

function TyresClient({ initialData }) {
    const [tyre] = useState(initialData);

    console.log(tyre)
    return (
        <div className="py-4 space-y-4">
            <ProductDetails tyre={tyre} />
            <Description tyre={tyre} />
            <FitmentSection tyre={tyre} scale={false} />
            <TrustSection tyre={tyre} />
            <Similar tyre={tyre} />
            {tyre?.faqs && <FAQSection faqs={tyre?.faqs} />}
        </div>
    );
}

export default TyresClient;
