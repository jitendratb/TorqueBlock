import TorqueBlockApi from "@/lib/api";

class TyresService {
    async getTyreBySlug(slug) {
        try {
            const response = await TorqueBlockApi.get(`/intent/${slug}`);
            return response?.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default new TyresService();