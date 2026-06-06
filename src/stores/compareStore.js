import { create } from 'zustand';
import compareService from '@/services/compareService';

const useCompareStore = create((set, get) => ({
    comparisons: null,
    compareById: null,
    loading: false,
    error: null,
    currentPage: 1,
    hasMore: true,

    fetchComparisons: async ({ page = 1, limit = 20 } = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await compareService.getAllCompare({ page, limit });
            const newComparisons = response?.categories;
            const pagination = response?.meta;

            set((state) => ({
                comparisons: page === 1 ? newComparisons : [...(state.comparisons || []), ...newComparisons],
                currentPage: page,
                hasMore: pagination ? page < pagination.totalPages : newComparisons.length === limit,
                loading: false,
                error: null
            }));
        } catch (error) {
            set({ error: 'Failed to fetch comparisons', loading: false });
        }
    },

    clearComparisons: () => set({
        comparisons: null,
        loading: false,
        error: null,
        currentPage: 1,
        hasMore: true
    })
}));

export default useCompareStore;
