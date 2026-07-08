import TorqueBlockApi from "@/lib/api";

class TyresService {
    async getTyreBySlug(slug) {
        try {
            const response = await TorqueBlockApi.get(`/intent/${slug}`);
            if (typeof window === 'undefined') {
                const fs = await import('fs');
                const path = await import('path');
                fs.appendFileSync(path.join(process.cwd(), 'debug.log'), `[getTyreBySlug] Success, slug: ${slug}, response.data: ${response?.data ? 'exists' : 'null'}\n`);
            }
            return response?.data
        } catch (error) {
            if (typeof window === 'undefined') {
                const fs = await import('fs');
                const path = await import('path');
                fs.appendFileSync(path.join(process.cwd(), 'debug.log'), `[getTyreBySlug] Error for slug: ${slug}, message: ${error.message}, status: ${error.response?.status}\n`);
            }
            console.error("Error fetching tyre by slug:", error?.message || error);
            return null;
        }
    }

    async getTyreBySize(size) {
        try {
            const response = await TorqueBlockApi.get(`/size/${size}`);
            return response?.data
        } catch (error) {
            console.error("Error fetching tyre by size:", error?.message || error);
            return null;
        }
    }
}

export default new TyresService();