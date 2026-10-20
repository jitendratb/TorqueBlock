import TorqueBlockApi from '@/lib/api';

class AffiliateTestimonialService {
    async getTestimonials({ page = 1, limit = 12 } = {}) {
        try {
            const response = await TorqueBlockApi.get("/affiliate/website/testimonials", { params: { page, limit } });
            return {
                testimonials: response?.data,
                pagination: response?.pagination || {},
            };
        } catch (error) {
            console.warn('[AffiliateTestimonialService.getTestimonials] Failed to retrieve testimonials:', error?.message ?? error);
            return { testimonials: [], pagination: {}, };
        }
    }
}

const affiliateTestimonialService = new AffiliateTestimonialService();
export default affiliateTestimonialService;
