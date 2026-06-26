import TorqueBlockApi from '@/lib/api';

class ProductService {
    constructor() { }

    async getAllProducts({ page = 1, limit = 20, query, brand, category, sort, minPrice, maxPrice } = {}) {
        try {
            const params = { page, limit };
            const response = await TorqueBlockApi.get('/products-v2', { params });
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async getProduct(slug) {
        try {
            const response = await TorqueBlockApi.get(`/products-v2/${slug}`);
            return response;
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }
}

export default new ProductService();