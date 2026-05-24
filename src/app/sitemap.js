import vehicleService from '@/services/vehicleService';
import TorqueBlockApi from '@/lib/api';

export default async function sitemap() {
  const baseUrl = 'https://torqueblock.com';
  
  const staticRoutes = [
    '',
    '/bikes',
    '/tyres',
    '/compare',
    '/blogs',
    '/brands',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '/blogs' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  let bikeRoutes = [];
  try {
    const brandsRes = await vehicleService.getVehicleBrands({ limit: 1000 });
    const bikes = brandsRes?.data || brandsRes || [];
    if (Array.isArray(bikes)) {
      bikeRoutes = bikes.map((bike) => {
        const slug = bike?.slug || bike?.brandName?.toLowerCase().replace(/\s+/g, '-') || bike?.name?.toLowerCase().replace(/\s+/g, '') || '';
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

  return [...staticRoutes, ...bikeRoutes, ...tyreRoutes];
}
