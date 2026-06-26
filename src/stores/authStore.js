import { create } from 'zustand';
import authService from '@/services/authService';

const getInitialState = () => {
    if (typeof window === 'undefined') {
        return {
            user: null,
            token: null,
            otpVerifyToken: null,
            isAuthenticated: false,
            loading: false,
            error: null,
        };
    }

    try {
        const token = localStorage.getItem('authToken');
        const userJson = localStorage.getItem('authUser');
        const user = userJson ? JSON.parse(userJson) : null;

        return {
            user,
            token,
            otpVerifyToken: null,
            isAuthenticated: !!token,
            loading: false,
            error: null,
        };
    } catch {
        return {
            user: null,
            token: null,
            otpVerifyToken: null,
            isAuthenticated: false,
            loading: false,
            error: null,
        };
    }
};

const useAuthStore = create((set, get) => ({
    ...getInitialState(),

    login: async (phone) => {
        set({ loading: true, error: null });
        try {
            const data = await authService.login(phone);
            if (data?.success) {
                set({ otpVerifyToken: data.otpVerifyToken, loading: false });
                return data;
            } else {
                set({ error: data?.message || 'Failed to request OTP', loading: false });
                return data;
            }
        } catch (error) {
            const errMsg = error?.response?.data?.message || 'Failed to send OTP. Please try again.';
            set({ error: errMsg, loading: false });
            throw error;
        }
    },

    verifyOtp: async (otp) => {
        set({ loading: true, error: null });
        const { otpVerifyToken } = get();
        if (!otpVerifyToken) {
            const err = 'Verification token is missing. Please request OTP again.';
            set({ error: err, loading: false });
            throw new Error(err);
        }

        try {
            const data = await authService.verifyOtp(otp, otpVerifyToken);
            if (data?.success && data?.token) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('authUser', JSON.stringify(data.user));
                }
                set({
                    user: data.user,
                    token: data.token,
                    isAuthenticated: true,
                    otpVerifyToken: null,
                    loading: false,
                });
                if (typeof window !== 'undefined') {
                    import('./cartStore').then(async (module) => {
                        const cartStore = module.default.getState();
                        await cartStore.syncLocalCartToBackend();
                        await cartStore.fetchCart();
                    });
                }
                return data;
            } else {
                set({ error: data?.message || 'OTP verification failed', loading: false });
                return data;
            }
        } catch (error) {
            const errMsg = error?.response?.data?.message || 'Invalid or expired OTP. Please try again.';
            set({ error: errMsg, loading: false });
            throw error;
        }
    },

    resendOtp: async (phone) => {
        set({ loading: true, error: null });
        try {
            const data = await authService.resendOtp(phone);
            if (data?.success) {
                set({ otpVerifyToken: data.otpVerifyToken, loading: false });
                return data;
            } else {
                set({ error: data?.message || 'Failed to resend OTP', loading: false });
                return data;
            }
        } catch (error) {
            const errMsg = error?.response?.data?.message || 'Failed to resend OTP. Please try again.';
            set({ error: errMsg, loading: false });
            throw error;
        }
    },

    refreshToken: async () => {
        try {
            const data = await authService.refreshToken();
            if (data?.success && data?.token) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('authToken', data.token);
                }
                set({ token: data.token, isAuthenticated: true });
                return data.token;
            } else {
                get().logout();
                return null;
            }
        } catch (error) {
            console.error('Session expired. Logging out...', error);
            get().logout();
            return null;
        }
    },

    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
        }
        set({
            user: null,
            token: null,
            otpVerifyToken: null,
            isAuthenticated: false,
            error: null,
            loading: false,
        });
        if (typeof window !== 'undefined') {
            import('./cartStore').then((module) => {
                module.default.getState().clearCart();
            });
        }
    },

    clearError: () => set({ error: null })
}));

export default useAuthStore;
