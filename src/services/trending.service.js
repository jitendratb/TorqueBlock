import TorqueBlockApi from "@/lib/api";

const trendingService = {
    fetchFirstTrending: async () => {
        try {
            const response = await TorqueBlockApi.get('/trending/first');
            return response;
        } catch (error) {
            console.error("Error fetching first trending item:", error);
            throw error;
        }
    },

    fetchAllTrending: async ({limit=16, page=1, trendFirst} = {}) => {
        try {
            let url = `/trending?limit=${limit}&page=${page}`;
            if (trendFirst !== undefined) {
                url += `&trendFirst=${trendFirst}`;
            }
            const response = await TorqueBlockApi.get(url);
            return response;
        } catch (error) {
            console.error("Error fetching all trending items:", error);
            throw error;
        }
    },

    fetchBySlug: async (slug) => {
        try {
            const response = await TorqueBlockApi.get(`/trending/${slug}`);
            return response;
        } catch (error) {
            console.error("Error fetching trending item by id:", error);
            throw error;
        }
    }
};

export default trendingService;