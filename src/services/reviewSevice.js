import TorqueBlockApi from '@/lib/api';

class ReviewService {

    static async getReviews(params = {isApproved: true}) {
        try {
            const response = await TorqueBlockApi.get('/reviews', { params });
            console.log(response)
            return response;
        } catch (error) {
            console.log('Error fetching reviews', error);
        }
    }

    static async addReview(payload) {
        try {
            const response = await TorqueBlockApi.post('/reviews', payload);
            return response;
        } catch (error) {
            console.error('Error submitting review:', error);
            throw new Error(error?.response?.data?.message || 'Failed to submit review');
        }
    }
    
}

export default ReviewService;
