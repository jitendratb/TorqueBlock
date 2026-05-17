import TorqueBlockApi from '@/lib/api';

class VehicleService {
    async getVehicleBrands(params = {}) {
        const { page = 1, limit = 24, query = '' } = params;

        try {
            const res = await TorqueBlockApi.get('intent/vehicle/data', {
                params: { page, limit, query }
            });
            return res;
        } catch (error) {
            console.error('Failed to fetch vehicle brands:', error);
            throw error;
        }
    }

    async getBrandModels(brandId) {
        if (!brandId) return [];
        try {
            const response = await TorqueBlockApi.get(`intent/vehicle/data/${brandId}`);
            const data = response?.data;
            return data;
        } catch (error) {
            console.error(`Failed to fetch models for brand ${brandId}:`, error);
            throw error;
        }
    }

    async getBrandBySlug(slug) {
        const brands = await this.getVehicleBrands();
        return brands.find(b =>
            b.brandName.toLowerCase().replace(/\s+/g, '-') === slug ||
            b.brandName.toLowerCase() === slug.replace(/-/g, ' ')
        );
    }
}

const vehicleServiceInstance = new VehicleService();
export default vehicleServiceInstance;
