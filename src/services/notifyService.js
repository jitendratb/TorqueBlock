import TorqueBlockApi from '@/lib/api';

class NotifyService {
    async createNotification(data) {
        try{
            return await TorqueBlockApi.post("/notify", data);
        }catch(error){
            throw error;
        }
    }
}

export const notifyService = new NotifyService();