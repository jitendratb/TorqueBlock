import { create } from 'zustand';
import ReviewService from '@/services/reviewSevice';


const useReviewStore = create((set, get) => ({
    reviews: [],
    avgRating: {
        overall: 0,
        grip: 0,
        wetPerformance: 0,
        stability: 0,
        valueForMoney: 0
    },
    totalReviews: 0,
    pagination: {
        page: 1,
        limit: 10,
        totalPages: 0,
    },

    fetchLoading: true,
    submitLoading: false,

    error: null,

    clearError: () => set({ error: null }),
    resetStore: () => set({
        reviews: [],
        avgRating: { overall: 0, grip: 0, wetPerformance: 0, stability: 0, valueForMoney: 0 },
        totalReviews: 0,
        pagination: { page: 1, limit: 10, totalPages: 0 },
        error: null,
    }),

    fetchReviews: async (filters = {}, append = false) => {
        set({ fetchLoading: true, error: null });
        try {
            const response = await ReviewService.getReviews(filters);
            console.log(response)
            if (response.success) {
                set((state) => ({
                    reviews: append ? [...state.reviews, ...response.data] : response.data,
                    avgRating: response.avgRating || state.avgRating,
                    totalReviews: response.pagination.total,
                    pagination: response.pagination,
                    fetchLoading: false,
                }));
            }
        } catch (error) {
            set({
                error: error.message || 'Failed to fetch reviews',
                fetchLoading: false
            });
        }
    },

    submitReview: async (payload) => {
        set({ submitLoading: true, error: null });
        try {
            const response = await ReviewService.addReview(payload);
            if (response?.success) {
                set({ submitLoading: false, reviews: [response.data, ...get().reviews] });
                return { success: true, message: response.message };
            }
        } catch (error) {
            const errorMsg = error.message || 'Failed to submit review';
            set({ error: errorMsg, submitLoading: false });
            return { success: false, message: errorMsg };
        }
    }
}));

export default useReviewStore;
