import axios from 'axios';
import TorqueBlockApi from '@/lib/api';

const SUGGEST_CACHE_TTL = 60 * 1000;
// When the suggestion service is unavailable (search engine offline, index not built yet) stop asking for a while,
// instead of failing again on every keystroke.
const SUGGEST_PAUSE_AFTER_FAILURE = 30 * 1000;
const SUGGEST_CACHE_MAX_ENTRIES = 200;

class SearchService {
    constructor() {
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; 
        this.suggestCache = new Map();
        this.suggestPausedUntil = 0;
    }

    /**
     * Search-as-you-type completions: brands, motorcycles, tyre families and sizes (typo tolerant).
     * Never throws and never blocks the search box: when the suggestion service is down this returns [].
     *
     * Uses plain axios on purpose. Failing suggestions are an expected state, so they must not go through the shared
     * client's error logging and token-refresh handling.
     */
    async suggest(query, { limit = 6 } = {}) {
        const text = (query || '').trim();
        if (text.length < 2 || Date.now() < this.suggestPausedUntil) {
            return [];
        }

        const cacheKey = `${text.toLowerCase()}|${limit}`;
        const cached = this.suggestCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < SUGGEST_CACHE_TTL) {
            return cached.data;
        }

        try {
            const { data } = await axios.get(`${TorqueBlockApi.defaults.baseURL}/smart-search/suggest`, {
                params: { q: text, limit },
                timeout: 4000,
            });
            const suggestions = Array.isArray(data?.suggestions) ? data.suggestions : [];

            if (this.suggestCache.size >= SUGGEST_CACHE_MAX_ENTRIES) {
                this.suggestCache.delete(this.suggestCache.keys().next().value);
            }
            this.suggestCache.set(cacheKey, { data: suggestions, timestamp: Date.now() });
            return suggestions;
        } catch {
            this.suggestPausedUntil = Date.now() + SUGGEST_PAUSE_AFTER_FAILURE;
            return [];
        }
    }

    async search(query, options = {}) {
        if (!query.trim()) {
            return null;
        }

        const params = {
            search: query.trim(),
            limit: options.limit || 8,
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
        this.suggestCache.clear();
        this.suggestPausedUntil = 0;
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