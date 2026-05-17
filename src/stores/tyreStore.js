import { create } from "zustand";
import tyresService from "@/services/tyres.service";

const useTyresStore = create((set) => ({
    tyre: null,
    loading: false,
    error: null,

    fetchTyre: async (slug) => {
        try {
            set({ loading: true, error: null });
            const data = await tyresService.getTyreBySlug(slug);
            set({ tyre: data, loading: false, });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    clearTyre: () => {
        set({ tyre: null, error: null, });
    },
}));

export default useTyresStore;