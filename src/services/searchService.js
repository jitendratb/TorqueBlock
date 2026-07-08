import TorqueBlockApi from '@/lib/api';

class SearchService {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; 
    }

    async search(query, options = {}) {
        if (!query.trim()) {
            return null;
        }

        const params = {
            search: query.trim(),
            limit: options.limit || 10,
            page: options.page || 1,
            category: options.category,
            brand: options.brand,
            sorted: options.sorted,
            ...options.params
        };

 
        const cacheKey = JSON.stringify(params);

  
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            } else {
                this.cache.delete(cacheKey);
            }
        }

        try {
            const response = await TorqueBlockApi.get('/search/enterprise', {
                params,
                ...options,
            });


            // Cache the result
            this.cache.set(cacheKey, {
                data: response,
                timestamp: Date.now(),
            });

            return response;
        } catch (error) {
            console.error('Search API Error:', error);
            throw error;
        }
    }

    clearCache() {
        this.cache.clear();
    }

    // Method to invalidate specific cache entry
    invalidateCache(query, options = {}) {
        const params = {
            search: query.trim(),
            limit: options.limit || 10,
            page: options.page || 1,
            category: options.category,
            brand: options.brand,
            sorted: options.sorted,
            ...options.params
        };
        const cacheKey = JSON.stringify(params);
        this.cache.delete(cacheKey);
    }
}

const searchServiceInstance = new SearchService();

export default searchServiceInstance;