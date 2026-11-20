import TorqueBlockApi from '@/lib/api';

class OrderService {
    constructor() { }

    async createOrder(orderData) {
        try {
            const response = await TorqueBlockApi.post('/user-orders/create', orderData);
            return response;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    async verifyPayment(paymentData) {
        try {
            const response = await TorqueBlockApi.post('/user-orders/verify-payment', paymentData);
            return response;
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw error;
        }
    }

    async paymentFailed(failedData) {
        try {
            const response = await TorqueBlockApi.post('/user-orders/payment-failed', failedData);
            return response;
        } catch (error) {
            console.error('Error marking payment as failed:', error);
            throw error;
        }
    }

    async getOrderHistory(page = 1, limit = 10, search, status, options = {}) {
        try {
            const params = { page, limit };
            if (search) params.search = search;
            if (status) params.status = status;

            const headers = { ...(options.headers) };
            if (options.token) {
                headers.Authorization = `Bearer ${options.token}`;
            }

            const config = {
                params,
                ...options,
                headers
            };

            const response = await TorqueBlockApi.get('/user-orders/history', config);
            return response;
        } catch (error) {
            console.error('Error fetching order history:', error);
            throw error;
        }
    }

    async getAllOrders(page = 1, limit = 10, search, status, options = {}) {
        return this.getOrderHistory(page, limit, search, status, options);
    }

    async getOrderById(orderId) {
        try {
            const response = await TorqueBlockApi.get(`/user-orders/${orderId}`);
            return response;
        } catch (error) {
            console.error('Error fetching order by ID:', error);
            throw error;
        }
    }

    async cancelOrder(orderId, note) {
        try {
            const response = await TorqueBlockApi.post(`/user-orders/cancel/${orderId}`, { note });
            return response;
        } catch (error) {
            console.error('Error cancelling order:', error);
            throw error;
        }
    }
}

const orderServiceInstance = new OrderService();
export default orderServiceInstance;
