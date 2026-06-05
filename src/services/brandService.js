import TorqueBlockApi from "@/lib/api";

class BrandService {
    async getBrands(params = { isActive: true }) {
        try {
            const res = await TorqueBlockApi.get("/brands", { params });
            return res?.data || [];
        } catch (error) {
            console.error("Failed to fetch brands:", error);
            throw error;
        }
    }

    async getPerformanceBrands() {
        try {
            const res = await TorqueBlockApi.get("/brands/performance");
            return res?.data || [];
        } catch (error) {
            console.error("Failed to fetch brands:", error);
            throw error;
        }
    }

    async getBrandBySlug(slug) {
        if (!slug) return null;
        try {
            const res = await TorqueBlockApi.get(`/brands/${slug}`);
            return res || null;
        } catch (error) {
            console.error(`Failed to fetch brand by slug ${slug}:`, error);
            throw error;
        }
    }
}

const brandServiceInstance = new BrandService();
export default brandServiceInstance;
