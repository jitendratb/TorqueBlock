import { create } from 'zustand';
import orderService from '@/services/orderService';
import useAuthStore from './authStore';

const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  fetchOrderHistory: async (page = 1, limit = 10) => {
    const { isAuthenticated } = useAuthStore.getState();
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (!isAuthenticated || !token) return;

    set({ loading: true, error: null });
    try {
      const response = await orderService.getOrderHistory(page, limit);
      if (response?.success) {
        set({ orders: response.data || [], loading: false });
      } else {
        set({ error: response?.message || 'Failed to fetch order history', loading: false });
      }
    } catch (err) {
      set({ error: err.message || 'Failed to fetch order history', loading: false });
    }
  },

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const response = await orderService.createOrder(orderData);
      set({ loading: false });
      return response; // contains success, message, data (order), razorpayKey, razorpayOrder
    } catch (err) {
      set({ error: err.message || 'Failed to create order', loading: false });
      throw err;
    }
  },

  verifyPayment: async (paymentData) => {
    set({ loading: true, error: null });
    try {
      const response = await orderService.verifyPayment(paymentData);
      set({ loading: false });
      return response;
    } catch (err) {
      set({ error: err.message || 'Failed to verify payment', loading: false });
      throw err;
    }
  },

  cancelOrder: async (orderId, note) => {
    set({ loading: true, error: null });
    try {
      const response = await orderService.cancelOrder(orderId, note);
      if (response?.success) {
        await get().fetchOrderHistory();
        return { success: true };
      } else {
        set({ error: response?.message || 'Failed to cancel order', loading: false });
        return { success: false, message: response?.message };
      }
    } catch (err) {
      set({ error: err.message || 'Failed to cancel order', loading: false });
      return { success: false, message: err.message };
    }
  },

  clearOrders: () => set({ orders: [], currentOrder: null, error: null, loading: false })
}));

export default useOrderStore;
