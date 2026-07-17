import TorqueBlockApi from "@/lib/api";

class TyresService {
    async getTyreBySlug(slug) {
        try {
            const response = await TorqueBlockApi.get(`/intent/${slug}`);
            return response?.data
        } catch (error) {
            console.error("Error fetching tyre by slug:", error?.message || error);
            return null;
        }
    }

    async getTyreByFamily({ isNewLaunch, isBestSeller, isFeatured, limit = 16, page = 1 } = {}) {
        try {
            const params = { limit, page };
            if (isNewLaunch !== undefined) params.isNewLaunch = isNewLaunch;
            if (isBestSeller !== undefined) params.isBestSeller = isBestSeller;
            if (isFeatured !== undefined) params.isFeatured = isFeatured;

            const response = await TorqueBlockApi.get(`/intent/recommended` , { params });
            return response?.data;
        } catch (error) {
            console.error("Error fetching tyre by family:", error?.message || error);
            return null;
        }
    }

    async getTyreBySize(size) {
        try {
            const response = await TorqueBlockApi.get(`/size/${size}`);
            return response?.data
        } catch (error) {
            console.error("Error fetching tyre by size:", error?.message || error);
            return null;
        }
    }

    async getRecommandation({ limit = 16, page = 1 }) {
        try {
            const response = await TorqueBlockApi.post(`/size/recommended`, { limit, page });
            return response;
        } catch (error) {
            console.error("Error fetching recommendation:", error?.message || error);
            return null;
        }
    }
}

export default new TyresService();