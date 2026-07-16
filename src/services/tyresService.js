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