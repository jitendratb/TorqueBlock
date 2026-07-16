import { create } from 'zustand';

const useUiStore = create((set) => ({
    isHeroSearchVisible: true,
    heroObserverReady: false,
    setHeroSearchVisible: (visible) => set({ isHeroSearchVisible: visible, heroObserverReady: true }),
}));

export default useUiStore;
