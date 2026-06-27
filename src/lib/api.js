import axios from 'axios';

const TorqueBlockApi = axios.create({
    // baseURL: 'https://api.torqueblock.com/api/v1',
   baseURL:'http://localhost:4000/api/v1',
    timeout: 30000, 
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

TorqueBlockApi.interceptors.response.use(
    (response) => {
        return response.data; 
    },
    (error) => {
        if (error.response) {
            console.error('API Error Response:', error.response.status, error.response.data);
            if (error.response.status === 401) {
                console.warn('Unauthorized - Logging out user...');
                if (typeof window !== 'undefined') {
                    import('@/stores/authStore').then((module) => {
                        const authStore = module.default.getState();
                        authStore.logout();
                    });
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
