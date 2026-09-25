"use client";

import { memo, Suspense, use } from "react";
import dynamic from "next/dynamic";
import ProductDetails from "./TyreComponent/ProductDetails";

const Description = dynamic(() => import("./TyreComponent/Description"), {
    ssr: true,
    loading: () => <div className="min-h-[300px] w-full animate-pulse bg-zinc-900/50 rounded-2xl" />,
});

const ReviewsCard = dynamic(() => import("@/components/atoms/reviewCard"), {
    ssr: true,
    loading: () => <div className="min-h-[250px] w-full animate-pulse bg-zinc-900/50 rounded-2xl" />,
});

const FitmentSection = dynamic(() => import("./TyreComponent/FitmentSection"), {
    ssr: true,
    loading: () => <div className="min-h-[350px] w-full animate-pulse bg-zinc-900/50 rounded-2xl" />,
});

const Similar = dynamic(() => import("@/components/atoms/Similar"), {
    ssr: true,
    loading: () => <div className="min-h-[300px] w-full animate-pulse bg-zinc-900/50 rounded-2xl" />,
});

const FAQSection = dynamic(() => import("@/components/atoms/FAQSection"), {
    ssr: true,
});

function ReviewsCardResolver({ reviewsPromise, tyreId }) {
    const reviewData = use(reviewsPromise);
    return <ReviewsCard reviewData={reviewData} tyreId={tyreId} />;
}

const TyresClient = memo(function TyresClient({ initialData, reviewsPromise }) {
    const tyre = initialData;

    return (
        <div className="py-4 space-y-4">
            <ProductDetails tyre={tyre} reviewsPromise={reviewsPromise} />
            <Description tyre={tyre} />
            <Suspense fallback={<div className="min-h-[250px] w-full animate-pulse bg-zinc-900/50 rounded-2xl" />}>
                <ReviewsCardResolver reviewsPromise={reviewsPromise} tyreId={tyre?._id} />
            </Suspense>
            <FitmentSection tyre={tyre} scale={false} />
            <Similar tyre={tyre} />
            {tyre?.faqs?.length > 0 && <FAQSection faqs={tyre.faqs} />}
        </div>
    );
});

export default TyresClient;

