import { create } from 'zustand';
import addressService from '@/services/addressService';
import useAuthStore from './authStore';

const useAddressStore = create((set, get) => ({
  addresses: [],
  loading: false,
  error: null,

  fetchAddresses: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (!isAuthenticated || !token) return;

    set({ loading: true, error: null });
    try {
      const response = await addressService.getAddresses();
      if (response?.success) {
        set({ addresses: response.data || [], loading: false });
      } else {
        set({ error: response?.message || 'Failed to fetch addresses', loading: false });
      }
    } catch (err) {
      set({ error: err.message || 'Failed to fetch addresses', loading: false });
    }
  },

  addAddress: async (addressData) => {
    set({ loading: true, error: null });
    try {
      const response = await addressService.addAddress(addressData);
      if (response?.success) {
        await get().fetchAddresses();
        return { success: true };
      } else {
        set({ error: response?.message || 'Failed to add address', loading: false });
        return { success: false, message: response?.message };
      }
    } catch (err) {
      set({ error: err.message || 'Failed to add address', loading: false });
      return { success: false, message: err.message };
    }
  },

  updateAddress: async (addressData) => {
    set({ loading: true, error: null });
    try {
      const response = await addressService.updateAddress(addressData);
      if (response?.success) {
        await get().fetchAddresses();
        return { success: true };
      } else {
        set({ error: response?.message || 'Failed to update address', loading: false });
        return { success: false, message: response?.message };
      }
    } catch (err) {
      set({ error: err.message || 'Failed to update address', loading: false });
      return { success: false, message: err.message };
    }
  },

  deleteAddress: async (addressId) => {
    set({ loading: true, error: null });
    try {
      const response = await addressService.deleteAddress(addressId);
      if (response?.success) {
        await get().fetchAddresses();
        return { success: true };
      } else {
        set({ error: response?.message || 'Failed to delete address', loading: false });
        return { success: false, message: response?.message };
      }
    } catch (err) {
      set({ error: err.message || 'Failed to delete address', loading: false });
      return { success: false, message: err.message };
    }
  },

  setDefaultAddress: async (addressId) => {
    set({ loading: true, error: null });
    try {
      const response = await addressService.makeAddressDefault(addressId);
      if (response?.success) {
        await get().fetchAddresses();
        return { success: true };
      } else {
        set({ error: response?.message || 'Failed to set default address', loading: false });
        return { success: false, message: response?.message };
      }
    } catch (err) {
      set({ error: err.message || 'Failed to set default address', loading: false });
      return { success: false, message: err.message };
    }
  },

  clearAddresses: () => set({ addresses: [], error: null, loading: false })
}));

export default useAddressStore;
