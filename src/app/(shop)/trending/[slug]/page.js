import Breadcrumb from '@/components/atoms/BreadCrumb';
import TrendingDetailsClient from '@/app/(shop)/Components/Trending/TrendingDetailsClient';
import trendingService from '@/services/trending.service';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await trendingService.fetchBySlug(slug);
    const item = res?.data;
    if (!item) return { title: 'Not Found | Torque Block' };
    return {
      title: item.seo?.metaTitle || `${item.name} | Torque Block`,
      description: item.seo?.metaDescription || item.shortDescription,
      keywords: item.seo?.metaKeywords?.join(', '),
      robots: item.seo?.robots || 'index,follow',
      openGraph: {
        title: item.openGraph?.title || item.name,
        description: item.openGraph?.description || item.shortDescription,
        images: [item.openGraph?.image || item.bannerImage || ''],
      },
    };
  } catch {
    return { title: 'Trending | Torque Block' };
  }
}

export default async function TrendingDetailsPage({ params }) {
  const { slug } = await params;
  let trendingItem = null;

  try {
    const res = await trendingService.fetchBySlug(slug);
    trendingItem = res?.data;
  } catch (error) {
    console.error("Failed to fetch trending item details:", error);
  }

  if (!trendingItem) notFound();

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb items={[{ label: "Trending", href: "/trending" }, { label: trendingItem.name }]} />
      <TrendingDetailsClient item={trendingItem} />
    </div>
  );
}
