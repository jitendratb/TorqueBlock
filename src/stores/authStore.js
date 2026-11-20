import { create } from 'zustand';
import authService from '@/services/authService';

const getInitialState = () => {
    if (typeof window === 'undefined') {
        return {
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
        };
    }

    try {
        const token = localStorage.getItem('authToken');
        const userJson = localStorage.getItem('authUser');
        const user = userJson ? JSON.parse(userJson) : null;

        if (token && typeof document !== 'undefined') {
            document.cookie = `authToken=${token}; path=/; max-age=2592000; SameSite=Lax`;
        }

        return {
            user,
            token,
            isAuthenticated: !!token,
            loading: false,
            error: null,
        };
    } catch {
        return {
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
        };
    }
};

const useAuthStore = create((set, get) => ({
    ...getInitialState(),

    loginWithKwikpass: async (kpToken) => {
        set({ loading: true, error: null });
        try {
            const data = await authService.kwikpassLogin(kpToken);
            if (data?.success && data?.token) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('authUser', JSON.stringify(data.user));
                    document.cookie = `authToken=${data.token}; path=/; max-age=2592000; SameSite=Lax`;
                }
                set({
                    user: data.user,
                    token: data.token,
                    isAuthenticated: true,
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
            }
            set({ error: data?.message || 'Login failed', loading: false });
            throw new Error(data?.message || 'Login failed');
        } catch (error) {
            const errMsg = error?.response?.data?.message || error?.message || 'Login failed. Please try again.';
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
                    document.cookie = `authToken=${data.token}; path=/; max-age=2592000; SameSite=Lax`;
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
            document.cookie = 'authToken=; path=/; max-age=0; SameSite=Lax';
            window.__KP_LOGIN_SDK_INSTANCE__?.handleKPLogout?.();
        }
        set({
            user: null,
            token: null,
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
