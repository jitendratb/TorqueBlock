import { create } from "zustand";
import trendingService from "@/services/trending.service";

const useTrendingStore = create((set) => ({
    trendingFirst: null,
    trendingAll: null,
    trendingDetails: null,
    loading: false,
    error: null,

    fetchTrendingFirst: async () => {
        try {
            set({ loading: true, error: null });
            const data = await trendingService.fetchFirstTrending();
            set({ trendingFirst: data?.data, loading: false });
        } catch (error) {
            set({ error: error.message || "Failed to fetch trending item", loading: false });
        }
    },

    fetchTrendAll: async() => {
        try {
            set({loading:true, error: null})
            const data = await trendingService.fetchAllTrending();
            set({trendingAll: data?.data, loading:false})
        } catch (error) {
            set({ error: error.message || "Failed to fetch trending item", loading: false });
        }
    },

    fetchTrendingDetails: async (slug) => {
        try {
            set({ loading: true, error: null });
            const data = await trendingService.fetchBySlug(slug);
            set({ trendingDetails: data?.data, loading: false });
        } catch (error) {
            set({ error: error.message || "Failed to fetch trending details", loading: false });
        }
    },

    clearTrendingFirst: () => {
        set({ trendingFirst: null, error: null });
    },

    clearTrendingDetails: () => {
        set({ trendingDetails: null, error: null });
    },
}));

export default useTrendingStore;
