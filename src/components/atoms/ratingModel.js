import React, { useState, useEffect } from 'react';
import Model from '../organisms/CustomModel';
import { FaStar, FaRoad, FaTint, FaShieldAlt, FaPiggyBank, FaPaperPlane } from 'react-icons/fa';
import Textarea from './textarea';

function StarRating({ label, value, onChange, icon: Icon }) {
    const [hoverValue, setHoverValue] = useState(0);

    return (
        <div className="flex items-center justify-between group p-2 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/[0.05]">
            <div className="flex items-center gap-3">
                {Icon && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/[0.02] text-white/40 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-colors shadow-inner">
                        <Icon className="text-sm" />
                    </div>
                )}
                <span className="text-white/80 text-sm font-semibold transition-colors group-hover:text-white tracking-wide">{label}</span>
            </div>
            <div
                className="flex gap-1.5"
                onMouseLeave={() => setHoverValue(0)}
            >
                {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = star <= (hoverValue || value);
                    return (
                        <button
                            key={star}
                            type="button"
                            onClick={() => onChange(star)}
                            onMouseEnter={() => setHoverValue(star)}
                            className={`transition-all duration-300 ease-out ${isActive
                                ? 'text-orange-500 scale-125 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]'
                                : 'text-white/10 hover:text-white/30'
                                }`}
                        >
                            <FaStar className="text-[17px]" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function RatingModel({ isOpen, onClose, onSubmit, rating, setRating, submitLoading }) {
    const [ratingHover, setRatingHover] = useState(0);
    const [formData, setFormData] = useState({
        review: '',
        rating: 0,
        grip: 0,
        wetPerformance: 0,
        stability: 0,
        valueForMoney: 0
    });

    useEffect(() => {
        if (typeof rating === 'object' && rating !== null) {
            setFormData(rating);
        } else if (typeof rating === 'number') {
            setFormData(prev => ({ ...prev, rating }));
        }
    }, [rating]);

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                review: '',
                rating: 0,
                grip: 0,
                wetPerformance: 0,
                stability: 0,
                valueForMoney: 0
            });
        }
    }, [isOpen]);

    const handleChange = (field, value) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        if (setRating) {
            setRating(updated);
        }
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <Model
            isOpen={isOpen}
            onClose={onClose}
            title="Write a Review"
            subtitle="Be the first to review this tyre"
            footer={
                <div className="flex justify-end gap-2 w-full py-2">
                    <button
                        onClick={handleSubmit}
                        type="button"
                        disabled={submitLoading}
                        className="group min-w-[150px] justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 disabled:from-zinc-700 disabled:to-zinc-800 disabled:text-zinc-500 text-white font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] disabled:shadow-none flex items-center gap-2.5 active:scale-95 border border-orange-400/20 disabled:border-white/5"
                    >
                        {submitLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <span>Submit Review</span>
                                <FaPaperPlane className="text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 opacity-90" />
                            </>
                        )}
                    </button>
                </div>
            }
            footerClassName='bg-transparent'
        >
            <div className="flex flex-col gap-4 py-0 px-1">
                <div className="flex flex-col items-center justify-center pb-2 pb-4 border-b border-white/[0.04]">
                    <span className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Overall Rating</span>
                    <div 
                        className="flex gap-2"
                        onMouseLeave={() => setRatingHover(0)}
                    >
                        {[1, 2, 3, 4, 5].map((star) => {
                            const isActive = star <= (ratingHover || formData.rating);
                            return (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleChange('rating', star)}
                                    onMouseEnter={() => setRatingHover(star)}
                                    className={`transition-all duration-300 ease-out ${isActive
                                        ? 'text-orange-500 scale-125 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]'
                                        : 'text-white/10 hover:text-white/30 hover:scale-110'
                                        }`}
                                >
                                    <FaStar className="text-[32px]" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-1 p-1.5 bg-black/20 rounded-2xl border border-white/[0.04] shadow-inner">
                    <StarRating icon={FaRoad} label="Grip" value={formData.grip} onChange={(val) => handleChange('grip', val)} />
                    <StarRating icon={FaTint} label="Wet Performance" value={formData.wetPerformance} onChange={(val) => handleChange('wetPerformance', val)} />
                    <StarRating icon={FaShieldAlt} label="Stability" value={formData.stability} onChange={(val) => handleChange('stability', val)} />
                    <StarRating icon={FaPiggyBank} label="Value for Money" value={formData.valueForMoney} onChange={(val) => handleChange('valueForMoney', val)} />
                </div>

                <div className="px-1.5">
                    <Textarea
                        id="reviewText"
                        label="Tell us more (Optional)"
                        value={formData.review}
                        onChange={(e) => handleChange('review', e.target.value)}
                        placeholder="What did you like or dislike? How did this tyre perform on the road?"
                        characterLimit={2000}
                    />
                </div>
            </div>
        </Model>
    );
}

export default RatingModel;