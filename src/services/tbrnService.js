import TorqueBlockApi from '@/lib/api';

class TbrnService {
    async submitApplication(application) {
        try {
            return await TorqueBlockApi.post('/tbrn/applications', application);
        } catch (error) {
            const data = error?.response?.data;
            return {
                success: false,
                message: data?.message || 'Could not submit your application. Please try again.',
                errors: data?.errors || {},
            };
        }
    }
}

const tbrnService = new TbrnService();
export default tbrnService;
