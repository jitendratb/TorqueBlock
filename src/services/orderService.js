import TorqueBlockApi from '@/lib/api';

class OrderService {
    constructor() { }

    async createOrder(orderData) {
        try {
            const response = await TorqueBlockApi.post('/user-orders/create', orderData);
            return response; // contains success, message, data (order details), razorpayKey, razorpayOrder
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    async verifyPayment(paymentData) {
        try {
            const response = await TorqueBlockApi.post('/user-orders/verify-payment', paymentData);
            return response; // contains success, message, data
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw error;
        }
    }

    async getOrderHistory(page = 1, limit = 10) {
        try {
            const response = await TorqueBlockApi.get('/user-orders/history', {
                params: { page, limit }
            });
            return response;
        } catch (error) {
            console.error('Error fetching order history:', error);
            throw error;
        }
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
