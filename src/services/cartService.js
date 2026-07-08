import TorqueBlockApi from '@/lib/api';

class CartService {
    constructor() { }

    async getCart() {
        try {
            const response = await TorqueBlockApi.get('/cart');
            return response; // response contains { success: true, data: [...] }
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    }

    async addToCart({ productId, productName, sku, image, size, quantity, unitPrice, discountPrice, totalPrice }) {
        try {
            const response = await TorqueBlockApi.post('/cart', {
                productId,
                productName,
                sku,
                image,
                size,
                quantity,
                unitPrice,
                discountPrice,
                totalPrice
            });

            return response;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    }

    async updateCart(productId, quantity) {
        try {
            const response = await TorqueBlockApi.put('/cart', {
                productId,
                quantity
            });
            return response;
        } catch (error) {
            console.error('Error updating cart:', error);
            throw error;
        }
    }

    async deleteCart(productId) {
        try {
            // Note: delete expects data in config for body
            const response = await TorqueBlockApi.delete('/cart', {
                data: { productId }
            });
            return response;
        } catch (error) {
            console.error('Error deleting cart item:', error);
            throw error;
        }
    }
}

const cartServiceInstance = new CartService();
export default cartServiceInstance;
