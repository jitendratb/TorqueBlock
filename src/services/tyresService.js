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
}

export default new TyresService();