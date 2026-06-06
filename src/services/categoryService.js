import TorqueBlockApi from "@/lib/api";

class CategoryService {
  async getCategory() {
    try {
      const res = await TorqueBlockApi.get("/category-v2");
      return res?.categories;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  }

  async getCategoryBySlug(slug){
    try {
      const res = await TorqueBlockApi.get(`/category-v2/${slug}`);
      return res?.category || null;
    } catch (error) {
      console.error(`Failed to fetch category by slug (${slug}):`, error);
      throw error;
    }
  }
}

const categoryServiceInstance = new CategoryService();
export default categoryServiceInstance;