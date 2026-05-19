import TorqueBlockApi from '@/lib/api';

class CompareService {
    constructor() { }

    async getAllCompare({ page = 1, limit = 20 } = {}) {
        try {
            const response = await TorqueBlockApi.get('/comparison', { params: { page, limit } });
            return response;
        } catch (error) {
            console.error('Error fetching comparisons:', error);
        }
    }

    async getByIdCompare(identifier){
        try{
           const response = await TorqueBlockApi.get(`/comparison/${identifier}`)
           return response
        }
        catch(error){
            console.log("error fetching By Id comaprison" , error )
        }
    }
}

const compareServiceInstance = new CompareService();
export default compareServiceInstance;