"use client";

import React, { useMemo } from "react";
import ProductDetails from "./ProductDetails";
import FAQSection from "@/components/atoms/FAQSection";
import TubeDescription from "./TubeDescription";
import TyreSection from "../NewLaunchTyres";

export default function TubesDetailsClient({ initialData }) {
    const tube = useMemo(() => initialData, [initialData]);

    if (!tube) return null;

    const hasFaqs = Array.isArray(tube.faqs) && tube.faqs.length > 0;

    return (
        <main className="py-4 space-y-4">
            <ProductDetails tube={tube} />
            <TubeDescription tube={tube} />
            <TyreSection title="Recommended Tyres" subtitle="These tyres are recommended for your vehicle" />
            {hasFaqs && <FAQSection faqs={tube.faqs} />}
        </main>
    );
}
