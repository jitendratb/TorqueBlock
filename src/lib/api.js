import axios from 'axios';

const TorqueBlockApi = axios.create({
    baseURL: 'https://api.torqueblock.com/api/v1',
    // baseURL: 'http://localhost:4000/api/v1',
    timeout: 30000, 
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

TorqueBlockApi.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

TorqueBlockApi.interceptors.response.use(
    (response) => {
        return response.data; 
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            console.error('API Error Response:', error.response.status, error.response.data);
            
            if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/refresh-token')) {
                originalRequest._retry = true;

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return TorqueBlockApi(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
                }

                isRefreshing = true;

                try {
                    const refreshRes = await axios.post(
                        `${TorqueBlockApi.defaults.baseURL}/auth/refresh-token`,
                        {},
                        { withCredentials: true }
                    );

                    if (refreshRes.data && refreshRes.data.success) {
                        const newToken = refreshRes.data.token;
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('authToken', newToken);
                            const authStoreModule = await import('@/stores/authStore');
                            authStoreModule.default.setState({ token: newToken, isAuthenticated: true });
                        }
                        
                        processQueue(null, newToken);
                        isRefreshing = false;
                        
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return TorqueBlockApi(originalRequest);
                    }
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    isRefreshing = false;
                    console.warn('Unauthorized - Logging out user after failed token refresh...');
                    if (typeof window !== 'undefined') {
                        const authStoreModule = await import('@/stores/authStore');
                        authStoreModule.default.getState().logout();
                    }
                    return Promise.reject(refreshError);
                }
            } else if (error.response.status === 401) {
                console.warn('Unauthorized - Logging out user...');
                if (typeof window !== 'undefined') {
                    const authStoreModule = await import('@/stores/authStore');
                    authStoreModule.default.getState().logout();
                }
            }
            
            if (error.response.status === 500) {
                console.warn('Server Error - Please try again later.');
            }
        } else if (error.request) {
            console.error('API No Response:', error.request);
        } else {
            console.error('API Setup Error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

export default TorqueBlockApi;
