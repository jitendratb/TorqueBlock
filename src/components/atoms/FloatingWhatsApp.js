import FloatingWhatsAppClient from "../molecules/FloatingWhatsAppClient";
import whatsappService from "@/services/whatsappService";

async function FloatingWhatsApp() {
    const botDataArray = await whatsappService.getOnlineBot();
    const botData = Array.isArray(botDataArray?.adminModelData)
        ? botDataArray.adminModelData[0]
        : (botDataArray?.adminModelData || null);

    return (
        <FloatingWhatsAppClient data={botData} />
    );
}

export default FloatingWhatsApp;