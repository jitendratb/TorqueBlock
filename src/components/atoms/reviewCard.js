"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from 'prop-types';
import { FaStar, FaAward, FaPen } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import useReviewStore from "@/stores/reviewStore";
import useAuthStore from "@/stores/authStore";
import RatingModel from "./ratingModel";
import Login from "../organisms/login";
import { useToast } from "@/context/ToastContext";
import CommentCard from "./commentCard";
import { ReviewContentSkeleton } from "./ReviewCardSkeleton";

const ReviewHeader = React.memo(() => (
    <header className="relative flex items-center gap-3.5 mb-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 ring-1 ring-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
            <FaStar className="text-orange-400 text-lg drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" aria-hidden="true" />
        </div>
        <div>
            <h2 id="reviews-section-heading" className="text-sm md:text-base font-black uppercase tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                Rider Reviews
            </h2>
            <p className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-wide mt-0.5">
                Real experiences and ratings
            </p>
        </div>
    </header>
));

const ReviewSummary = React.memo(({ overallRating, displayTotalReviews, highlights, onWriteReview }) => (
    <aside className="flex flex-col gap-4 md:w-[45%] shrink-0">
        <div className="flex items-start justify-between">
            <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white leading-none">
                    {Number(overallRating).toFixed(1)}
                </span>
                <div className="flex flex-col gap-0.5">
                    <div className="flex gap-0.5" aria-label={`Rating: ${Number(overallRating).toFixed(1)} out of 5`}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <FaStar
                                key={i}
                                className={`text-xs ${i <= Math.round(overallRating) ? "text-orange-400" : "text-zinc-700"}`}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                    <span className="text-zinc-500 text-[10px]">
                        {Number(displayTotalReviews).toLocaleString()} verified riders
                    </span>
                </div>
            </div>
            {overallRating >= 4.0 && displayTotalReviews > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5" aria-label="Top Rated" title="Highly rated by customers">
                    <FaAward className="text-orange-400 text-[10px]" aria-hidden="true" />
                    <span className="text-orange-400 text-[10px] font-bold">Top Rated</span>
                </div>
            )}
        </div>

        <div className="space-y-2.5" role="list" aria-label="Rating breakdown by category">
            {highlights.map(({ label, score }) => (
                <div key={label} className="flex items-center gap-3" role="listitem">
                    <span className="text-zinc-400 text-[10px] font-medium w-16 shrink-0">{label}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden" aria-hidden="true">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-700"
                            style={{ width: `${(Number(score) / 5) * 100}%` }}
                        />
                    </div>
                    <span className="text-orange-400 text-[10px] font-bold w-6 text-right" aria-label={`${score} out of 5`}>{score}</span>
                </div>
            ))}
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/60">
            <MdVerified className="text-green-400 text-sm shrink-0" aria-hidden="true" />
            <p className="text-zinc-500 text-[10px]">Verified purchasers via Torque Block</p>
        </div>

        <button
            onClick={onWriteReview}
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-4 py-2.5 text-sm font-bold text-orange-400 transition-all duration-300 hover:border-orange-500/60 hover:from-orange-500/20 hover:to-orange-600/20 hover:shadow-[0_0_18px_rgba(249,115,22,0.2)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            aria-label="Write a Review"
        >
            <FaPen className="text-xs transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
            Write a Review
        </button>
    </aside>
));

const ReviewList = React.memo(({ reviews }) => (
    <div
        className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[270px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700 hover:scrollbar-thumb-orange-500/50"
        role="region"
        aria-label="User Reviews"
        tabIndex="0"
    >
        {reviews?.length > 0 ? (
            reviews.map((review, idx) => (
                <CommentCard key={review?._id || `review-${idx}`} review={review} />
            ))
        ) : (
            <div className="col-span-1 md:col-span-2 flex items-center justify-center py-10 text-zinc-500 text-xs text-center border border-dashed border-zinc-800 rounded-xl bg-white/5">
                No reviews yet. Be the first to review!
            </div>
        )}
    </div>
));

const ReviewsCard = React.memo(({ tyreId = null, productId = null, reviewData = {} }) => {
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [rating, setRating] = useState(null);
    const [pendingReviewAction, setPendingReviewAction] = useState(false);
    const [localNewReviews, setLocalNewReviews] = useState([]);

    const { fetchLoading, submitReview, submitLoading } = useReviewStore();
    const { user, isAuthenticated } = useAuthStore();
    const toast = useToast();
    const displayReviews = [...localNewReviews, ...(reviewData?.data || [])];
    const displayTotalReviews = (reviewData?.pagination?.total ?? 0) + localNewReviews.length;
    const displayAvgRating = reviewData?.avgRating || {};
    const overallRating = displayAvgRating?.overall || 0;
    const isFetching = fetchLoading && !reviewData?.data;

    useEffect(() => {
        if (isAuthenticated && pendingReviewAction) {
            setShowRatingModal(true);
            setPendingReviewAction(false);
            setIsLoginModalOpen(false);
        }
    }, [isAuthenticated, pendingReviewAction]);

    useEffect(() => {
        if (!isLoginModalOpen && !isAuthenticated && pendingReviewAction) {
            setPendingReviewAction(false);
        }
    }, [isLoginModalOpen, isAuthenticated, pendingReviewAction]);

    const handleWriteReviewClick = useCallback(() => {
        if (!isAuthenticated) {
            setPendingReviewAction(true);
            setIsLoginModalOpen(true);
            return;
        }
        setShowRatingModal(true);
    }, [isAuthenticated]);

    const handleReviewSubmit = useCallback(async (data) => {
        if (!isAuthenticated) return setIsLoginModalOpen(true);

        const safeProductId = productId?._id || productId;
        const safeTyreId = tyreId?._id || tyreId;

        const payload = {
            ...data,
            userId: user?._id || user?.id,
        };

        if (safeProductId) {
            payload.productId = safeProductId;
        }
        if (safeTyreId) {
            payload.tyreId = safeTyreId;
        }


        try {
            const res = await submitReview(payload);
            if (res.success) {
                toast.success("Review submitted successfully");
                setShowRatingModal(false);
                setRating(null);
                
                // Immediately show the new review in the UI
                if (res.data) {
                    // Inject user name manually since backend response doesn't include it on submission
                    const newReview = { ...res.data, name: user?.name || user?.firstName || "You" };
                    setLocalNewReviews(prev => [newReview, ...prev]);
                }
            } else {
                toast.error(res.message || "Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("An unexpected error occurred while submitting.");
        }
    }, [isAuthenticated, submitReview, productId, tyreId, user, toast]);

    const highlights = useMemo(() => [
        { label: "Grip", score: displayAvgRating?.grip?.toFixed(1) || "0.0" },
        { label: "Wet Perf.", score: displayAvgRating?.wetPerformance?.toFixed(1) || "0.0" },
        { label: "Stability", score: displayAvgRating?.stability?.toFixed(1) || "0.0" },
        { label: "VFM", score: displayAvgRating?.valueForMoney?.toFixed(1) || "0.0" },
    ], [
        displayAvgRating?.grip,
        displayAvgRating?.wetPerformance,
        displayAvgRating?.stability,
        displayAvgRating?.valueForMoney
    ]);

    return (
        <section aria-labelledby="reviews-section-heading" className="w-full relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4 backdrop-blur-xl shadow-lg">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

                <ReviewHeader />

                {isFetching ? (
                    <ReviewContentSkeleton />
                ) : (
                    <div className="relative flex flex-col md:flex-row gap-4 border-t border-white/10 pt-4 mt-2">
                        <ReviewSummary
                            overallRating={overallRating}
                            displayTotalReviews={displayTotalReviews}
                            highlights={highlights}
                            onWriteReview={handleWriteReviewClick}
                        />

                        <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-zinc-700/40 to-transparent shrink-0" aria-hidden="true" />
                        <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" aria-hidden="true" />

                        <ReviewList reviews={displayReviews} />
                    </div>
                )}
            </div>

            <RatingModel
                isOpen={showRatingModal}
                onClose={() => setShowRatingModal(false)}
                onSubmit={handleReviewSubmit}
                rating={rating}
                setRating={setRating}
                submitLoading={submitLoading}
            />

            <Login isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
        </section>
    );
});

export default ReviewsCard;