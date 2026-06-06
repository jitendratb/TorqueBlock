import { create } from 'zustand';
import categoryService from '@/services/categoryService';

const useCategoryStore = create((set) => ({
    categories: [],
    loading: false,
    error: null,

    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const categories = await categoryService.getCategory();
            set({ categories, loading: false, error: null });
        } catch (error) {
            set({ error: 'Failed to fetch categories', loading: false });
        }
    },

    clearCategories: () => set({ categories: [], loading: false, error: null })
}));

export default useCategoryStore;
