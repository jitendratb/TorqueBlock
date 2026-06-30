import { create } from 'zustand';
import searchService from '@/services/searchService';

const useSearchStore = create(
        (set, get) => ({
            // State
            searchInput: '',
            searchResults: null,
            showSuggestions: false,
            loading: false,
            error: null,
            activeIndex: 0,

            setSearchInput: (input) => {
                set({ searchInput: input }, false, 'setSearchInput');
                if (input.trim()) {
                    get().debouncedSearch(input);
                } else {
                    set({
                        searchResults: null,
                        showSuggestions: false,
                        loading: false,
                        error: null
                    }, false, 'clearSearch');
                }
            },

            setShowSuggestions: (show) => set({ showSuggestions: show }, false, 'setShowSuggestions'),

            setActiveIndex: (index) => set({ activeIndex: index }, false, 'setActiveIndex'),

            clearSearch: () => set({
                searchInput: '',
                searchResults: null,
                showSuggestions: false,
                loading: false,
                error: null,
                activeIndex: 0
            }, false, 'clearSearch'),

            debouncedSearch: (() => {
                let timeoutId;
                return (query) => {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        get().performSearch(query);
                    }, 150);
                };
            })(),

            performSearch: async (query) => {
                if (!query.trim()) return;

                set({ loading: true, error: null }, false, 'startSearch');

                try {
                    const results = await searchService.search(query);
                    set({
                        searchResults: results,
                        showSuggestions: true,
                        loading: false,
                        error: null
                    }, false, 'searchSuccess');
                } catch (error) {
                    set({
                        error: 'Unable to load suggestions',
                        searchResults: null,
                        loading: false,
                        showSuggestions: false
                    }, false, 'searchError');
                }
            },

            getSuggestions: () => {
                const { searchResults } = get();
                const items = [];

                const cleanComparisonLabel = (identifier) => {
                    if (!identifier) return '';
                    return identifier
                        .replace(/-/g, ' ')
                        .replace(/\s+/g, ' ')
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                        .trim();
                };

                const formatBikeLabel = (item) => {
                    if (!item) return '';
                    return `${item.bikeBrand || ''} ${item.bikeModel || ''}`.trim();
                };

                // Add all tyres
                if (searchResults?.results?.tyreIntent?.data) {
                    searchResults.results.tyreIntent.data.forEach(tyre => {
                        items.push({
                            type: 'Tyre',
                            label: tyre.productName,
                            query: tyre.productName,
                            identifier: tyre.identifier,
                            relevanceScore: tyre.relevanceScore || 0,
                        });
                    });
                }

                // Add all comparisons
                if (searchResults?.results?.comparison?.data) {
                    searchResults.results.comparison.data.forEach(comparison => {
                        items.push({
                            type: 'Comparison',
                            label: cleanComparisonLabel(comparison.identifier),
                            query: cleanComparisonLabel(comparison.identifier),
                            identifier: comparison.identifier,
                            relevanceScore: comparison.relevanceScore || 0,
                        });
                    });
                }

                // Add all bikes
                if (searchResults?.results?.vehicleIntent?.data) {
                    searchResults.results.vehicleIntent.data.forEach(bike => {
                        items.push({
                            type: 'Bike',
                            label: formatBikeLabel(bike),
                            query: formatBikeLabel(bike),
                            identifier: bike.identifier,
                            relevanceScore: bike.relevanceScore || 0,
                        });
                    });
                }

                // Add all tyre sizes
                if (searchResults?.results?.tyreSizes?.data) {
                    searchResults.results.tyreSizes.data.forEach(sizeItem => {
                        items.push({
                            type: 'Tyre Sizes',
                            label: sizeItem.hero?.title || sizeItem.size,
                            query: sizeItem.size,
                            identifier: sizeItem.identifier,
                            availableTyres: sizeItem.availableTyres,
                            size: sizeItem.size,
                            relevanceScore: sizeItem.relevanceScore || 0,
                        });
                    });
                }

                // Add all blogs
                if (searchResults?.results?.blogs?.data) {
                    searchResults.results.blogs.data.forEach(blog => {
                        items.push({
                            type: 'Blogs',
                            label: blog.header,
                            query: blog.header,
                            identifier: blog.slug || blog.identifier,
                            relevanceScore: blog.relevanceScore || 0,
                        });
                    });
                }

                // Add all trending
                if (searchResults?.results?.trending?.data) {
                    searchResults.results.trending.data.forEach(trend => {
                        items.push({
                            type: 'Trending',
                            label: trend.name,
                            query: trend.name,
                            identifier: trend.slug || trend.identifier,
                            relevanceScore: trend.relevanceScore || 0,
                        });
                    });
                }

                // Sort items by relevanceScore descending
                items.sort((a, b) => b.relevanceScore - a.relevanceScore);

                return items;
            },

            // Clear cache
            clearCache: () => {
                searchService.clearCache();
            },

            // Invalidate specific cache entry
            invalidateCache: (query) => {
                searchService.invalidateCache(query);
            }
        }
    )
);

export default useSearchStore;