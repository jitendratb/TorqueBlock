import TorqueBlockApi from '@/lib/api';

class OrderService {
    constructor() { }

    async startGokwikCheckout(checkoutData) {
        try {
            const response = await TorqueBlockApi.post('/gokwik/checkout', checkoutData);
            return response;
        } catch (error) {
            console.error('Error starting GoKwik checkout:', error);
            throw error;
        }
    }

    async getGokwikCheckout(cartId) {
        try {
            const response = await TorqueBlockApi.get(`/gokwik/checkout/${cartId}`);
            return response;
        } catch (error) {
            console.error('Error fetching GoKwik checkout:', error);
            throw error;
        }
    }

    async getGokwikCart(cartId) {
        try {
            const response = await TorqueBlockApi.post('/gokwik/get-cart', { cart_id: cartId });
            return response;
        } catch (error) {
            console.error('Error fetching GoKwik cart:', error);
            throw error;
        }
    }

    async setGokwikShippingAddress(cartId, shippingAddress, gstNo) {
        try {
            const response = await TorqueBlockApi.post('/gokwik/set-shipping-address', {
                cart_id: cartId,
                shipping_address: shippingAddress,
                ...(gstNo && { gst_no: gstNo })
            });
            return response;
        } catch (error) {
            console.error('Error setting GoKwik shipping address:', error);
            throw error;
        }
    }

    async setGokwikShippingOption(cartId, shippingOption) {
        try {
            const response = await TorqueBlockApi.post('/gokwik/set-shipping-option', { cart_id: cartId, shipping_option: shippingOption });
            return response;
        } catch (error) {
            console.error('Error setting GoKwik shipping option:', error);
            throw error;
        }
    }

    async getGokwikDiscounts(cartId) {
        try {
            const response = await TorqueBlockApi.post('/gokwik/get-all-discount', { cart_id: cartId });
            return response;
        } catch (error) {
            console.error('Error fetching GoKwik discounts:', error);
            throw error;
        }
    }

    async applyGokwikDiscount(cartId, discountCode) {
        try {
            const response = await TorqueBlockApi.post('/gokwik/apply-discount', { cart_id: cartId, discount_code: discountCode });
            return response;
        } catch (error) {
            console.error('Error applying GoKwik discount:', error);
            throw error;
        }
    }

    async removeGokwikDiscount(cartId, discountCode) {
        try {
            const response = await TorqueBlockApi.post('/gokwik/remove-discount', { cart_id: cartId, discount_code: discountCode });
            return response;
        } catch (error) {
            console.error('Error removing GoKwik discount:', error);
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
