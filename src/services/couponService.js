import TorqueBlockApi from '@/lib/api';

class CouponService {
    async applyCoupon(couponCode) {
        try {
            const response = await TorqueBlockApi.post('/coupon-v2/apply-coupon', { name: couponCode });
            return response;
        } catch (error) {
            console.error('Error applying coupon:', error);
            throw error;
        }
    }
}

const couponServiceInstance = new CouponService();
export default couponServiceInstance;
