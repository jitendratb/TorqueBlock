import vehicleService from '@/services/vehicleService';
import TorqueBlockApi from '@/lib/api';
import brandServiceInstance from '@/services/brandService';
import blogService from '@/services/blogService';
import compareServiceInstance from '@/services/compareService';
import trendingService from '@/services/trending.service';

export default async function sitemap() {
  const baseUrl = 'https://www.torqueblock.com';
  
  const staticRoutes = [
    '',
    '/bikes',
    '/tyres',
    '/compare',
    '/blogs',
    '/brands',
    '/about',
    '/contact',
    '/trending',
    '/privacy-policy',
    '/return-policy',
    '/shipping-policy',
    '/terms',
    '/llms.txt',
  ].map((route) => {
    const isPolicy = ['/privacy-policy', '/return-policy', '/shipping-policy', '/terms', '/llms.txt'].includes(route);
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: route === '/blogs' || route === '/trending' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : isPolicy ? 0.5 : 0.8,
    };
  });

  let bikeRoutes = [];
  try {
    const brandsRes = await vehicleService.getVehicleBrands({ limit: 1000 });
    const bikes = brandsRes?.vehicleBrandsData || brandsRes?.data || brandsRes || [];
    if (Array.isArray(bikes)) {
      bikeRoutes = bikes.map((bike) => {
        const slug = bike?.identifier || bike?.slug || bike?.brandName?.toLowerCase().replace(/\s+/g, '-') || bike?.name?.toLowerCase().replace(/\s+/g, '') || '';
        return {
            url: `${baseUrl}/bikes/${slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.7,
        };
      }).filter(r => r.url !== `${baseUrl}/bikes/`);
    }
  } catch (err) {
    console.error("Error fetching bikes for sitemap", err);
  }

  let tyreRoutes = [];
  try {
    const tyresRes = await TorqueBlockApi.get("intent", { params: { limit: 1000 } });
    const tyres = tyresRes?.data || tyresRes || [];
    if (Array.isArray(tyres)) {
      tyreRoutes = tyres.map((tyre) => {
        const slug = tyre?.identifier || tyre?.slug || '';
        return {
            url: `${baseUrl}/tyres/${slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.9,
        };
      }).filter(r => r.url !== `${baseUrl}/tyres/`);
    }
  } catch (err) {
    console.error("Error fetching tyres for sitemap", err);
  }

  let brandRoutes = [];
  try {
    const brandsRes = await brandServiceInstance.getBrands({ isActive: true });
    const brands = brandsRes || [];
    if (Array.isArray(brands)) {
      brandRoutes = brands.map((brand) => {
        const slug = brand?.slug || brand?.name?.toLowerCase().replace(/\s+/g, '-') || '';
        return {
            url: `${baseUrl}/brands/${slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.8,
        };
      }).filter(r => r.url !== `${baseUrl}/brands/`);
    }
  } catch (err) {
    console.error("Error fetching brands for sitemap", err);
  }

  let blogRoutes = [];
  try {
    const blogsRes = await blogService.getAllBlogs({ limit: 1000 });
    const blogs = blogsRes?.blogs || blogsRes?.data?.blogs || blogsRes || [];
    if (Array.isArray(blogs)) {
      blogRoutes = blogs.map((blog) => {
        let rawSlug = blog?.blogid || blog?.slug || blog?.title || '';
        const slug = rawSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        return {
            url: `${baseUrl}/blogs/${slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.6,
        };
      }).filter(r => r.url !== `${baseUrl}/blogs/`);
    }
  } catch (err) {
    console.error("Error fetching blogs for sitemap", err);
  }

  let compareRoutes = [];
  try {
    const compareRes = await compareServiceInstance.getAllCompare({ limit: 1000 });
    const compares = compareRes?.data || compareRes || [];
    if (Array.isArray(compares)) {
      compareRoutes = compares.map((comp) => {
        const slug = comp?.identifier || comp?.slug || '';
        return {
            url: `${baseUrl}/compare/${slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.8,
        };
      }).filter(r => r.url !== `${baseUrl}/compare/`);
    }
  } catch (err) {
    console.error("Error fetching compares for sitemap", err);
  }

  let trendingRoutes = [];
  try {
    const trendingRes = await trendingService.fetchAllTrending({ limit: 1000 });
    const trendings = trendingRes?.data || trendingRes || [];
    if (Array.isArray(trendings)) {
      trendingRoutes = trendings.map((trend) => {
        const slug = trend?.slug || '';
        return {
            url: `${baseUrl}/trending/${slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.8,
        };
      }).filter(r => r.url !== `${baseUrl}/trending/`);
    }
  } catch (err) {
    console.error("Error fetching trending items for sitemap", err);
  }

  return [...staticRoutes, ...bikeRoutes, ...tyreRoutes, ...brandRoutes, ...blogRoutes, ...compareRoutes, ...trendingRoutes];
}
