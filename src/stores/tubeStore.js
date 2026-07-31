import { create } from "zustand";
import tubeService from "@/services/TubesService";

const useTubeStore = create((set, get) => ({
    tubes: [],
    tube: null,
    loading: true,
    error: null,

    page: 1,
    hasMore: true,

    fetchTubes: async (params = {}) => {
        try {
            set({ loading: true, error: null });
            const response = await tubeService.getTube({ params });
            
            const responseData = response?.data || response;
            const newTubes = responseData?.data || responseData || [];
            const pagination = response?.pagination || responseData?.pagination;

            set((state) => ({
                tubes: params.page === 1 || !params.page ? newTubes : [...state.tubes, ...newTubes],
                page: params.page || 1,
                hasMore: pagination ? (params.page || 1) < pagination.totalPages : (newTubes.length === (params.limit || 16)),
                loading: false
            }));
        } catch (error) {
            set({ error: error?.message || "Failed to fetch tubes", loading: false });
        }
    },

    setInitialTubes: (response) => {
        if (!response) return;
        const responseData = response?.data || response;
        const newTubes = responseData?.data || responseData || [];
        const pagination = response?.pagination || responseData?.pagination;

        set({
            tubes: newTubes,
            page: 1,
            hasMore: pagination ? 1 < pagination.totalPages : (newTubes.length === 16),
            loading: false,
            error: null
        });
    },

    fetchTubeById: async (id) => {
        try {
            set({ loading: true, error: null });
            const response = await tubeService.getTubeById(id);
            const data = response?.data || response;
            set({ tube: data, loading: false });
        } catch (error) {
            set({ error: error?.message || "Failed to fetch tube", loading: false });
        }
    },

    clearTube: () => {
        set({ tube: null, error: null });
    },
}));

export default useTubeStore;
