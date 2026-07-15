import { create } from 'zustand';

const useUiStore = create((set) => ({
    isHeroSearchVisible: true,
    setHeroSearchVisible: (visible) => set({ isHeroSearchVisible: visible }),
}));

export default useUiStore;
