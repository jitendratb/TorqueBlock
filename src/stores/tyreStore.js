import { create } from "zustand";
import tyresService from "@/services/tyresService";

const useTyresStore = create((set, get) => ({
    tyre: null,
    loading: false,
    error: null,

    recommendedTyres: [],
    recommendedLoading: false,
    recommendedError: null,
    recommendedPage: 1,
    hasMoreRecommended: true,

    fetchTyre: async (slug) => {
        try {
            set({ loading: true, error: null });
            const data = await tyresService.getTyreBySlug(slug);
            set({ tyre: data, loading: false, });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchRecommendedTyres: async (page = 1) => {
        try {
            set({ recommendedLoading: true, recommendedError: null });
            const response = await tyresService.getRecommandation({ limit: 16, page });
            
            if (response?.success) {
                const newTyres = response.data;
                const pagination = response.pagination;
                
                set((state) => ({
                    recommendedTyres: page === 1 ? newTyres : [...state.recommendedTyres, ...newTyres],
                    recommendedPage: page,
                    hasMoreRecommended: page < pagination.totalPages,
                    recommendedLoading: false
                }));
            } else {
                set({ recommendedLoading: false, hasMoreRecommended: false });
            }
        } catch (error) {
            set({ recommendedError: error.message, recommendedLoading: false });
        }
    },

    clearTyre: () => {
        set({ tyre: null, error: null, });
    },
}));

export default useTyresStore;