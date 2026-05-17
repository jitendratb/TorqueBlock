"use client";

import React, { useState } from "react";
import ProductDetails from "./TyreComponent/ProductDetails";
import Description from "./TyreComponent/Description";
import FitmentSection from "./TyreComponent/FitmentSection";
import TrustSection from "./TyreComponent/TrustSection";
import Similar from "@/components/atoms/Similar";

function TyresClient({ initialData }) {
    const [tyre] = useState(initialData);
    return (
        <div className="py-4 space-y-4">
            <ProductDetails tyre={tyre} />
            <Description tyre={tyre} />
            <FitmentSection tyre={tyre} />
            <TrustSection tyre={tyre} />
            <Similar tyre={tyre} />
        </div>
    );
}

export default TyresClient;
