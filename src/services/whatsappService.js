import TorqueBlockApi from "@/lib/api";

class WhatsappService {
    async getOnlineBot() {
        try {
            const response = await TorqueBlockApi.get('/whatsapp-bot/online', {
                next: { revalidate: 60 }
            });
            
            return response;
        } catch (error) {
            console.error('[WhatsappService.getOnlineBot] Failed to retrieve WhatsApp bot config:', error?.message ?? error);
            return null;
        }
    }
}

const whatsappService = new WhatsappService();
export default whatsappService;
