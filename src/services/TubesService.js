import TorqueBlockApi from "@/lib/api";

class TubeService {
    async getTube({ params } = {}) {
        try {
            const response = await TorqueBlockApi.get(`/tubes`, { params });
            return response;
        } catch (error) {
            console.error("Error fetching tubes:", error?.message || error);
            return null;
        }
    }

    async getTubeById(id) {
        try {
            const response = await TorqueBlockApi.get(`/tubes/${id}`);
            return response;
        } catch (error) {
            console.error("Error fetching tube by id:", error?.message || error);
            return null;
        }
    }

    async getTubesByProductId(productIds) {
        try {
            const raw = Array.isArray(productIds) ? productIds : productIds ? [productIds] : [];
            const idsArray = raw.filter(Boolean);
            if (idsArray.length === 0) {
                return { success: true, data: [] };
            }
            const response = await TorqueBlockApi.post(`/tubes/by-products`, { productIds: idsArray });
            return response;
        } catch (error) {
            console.error("Error fetching tubes by product id:", error?.message || error);
            return null;
        }
    }
}

export default new TubeService();