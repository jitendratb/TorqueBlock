import TorqueBlockApi from '@/lib/api';

class BlogService {
    async getAllBlogs({ page = 1, limit = 20, category } = {}) {
        try {
            const params = { page, limit, category };
            const response = await TorqueBlockApi.get('/blog/all', { params });

            console.log(response)
            return {
                blogs: response?.blogs,
                pagination: response?.pagination
            };
        } catch (error) {
            console.error('[BlogService.getAllBlogs] Failed to retrieve blogs:', error?.message ?? error);
            return {
                blogs: [],
                pagination: {}
            };
        }
    }

    async getBlogById(slug) {
        try {
            const response = await TorqueBlockApi.get(`/blog/${slug}`);
            return response;
        } catch (error) {
            console.error('[BlogService.getBlogById] Failed to retrieve blog:', error?.message ?? error);
            return null;
        }
    }
}

const blogService = new BlogService();
export default blogService;
