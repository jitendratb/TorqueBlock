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

    async getTyreBySize(size) {
        console.log(size)
        try {
            const response = await TorqueBlockApi.get(`/size/${size}`);
            console.log(response, "tyre size")
            return response?.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default new TyresService();