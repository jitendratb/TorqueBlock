import Breadcrumb from '@/components/atoms/BreadCrumb';
import TrendingDetailsClient from '@/app/(shop)/Components/Trending/TrendingDetailsClient';
import trendingService from '@/services/trending.service';
import TrendingDetailSchema from '@/components/seo/TrendingDetailSchema';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await trendingService.fetchBySlug(slug);
    const item = res?.data;
    if (!item) return { title: 'Not Found | Torque Block' };
        let keywords = "";
    if (Array.isArray(item.seo?.metaKeywords)) {
      keywords = item.seo.metaKeywords.join(', ');
    } else if (typeof item.seo?.metaKeywords === 'string') {
      keywords = item.seo.metaKeywords;
    } else {
      keywords = `${item.bike?.bikeBrand?.brandName || ''} ${item.bike?.bikeModel || ''} tyres, ${item.productId?.productName || ''} fitment, ${item.name || ''}`;
    }

    const title = item.seo?.metaTitle || `${item.name} | Torque Block`;
    const description = item.seo?.metaDescription || item.shortDescription;
    const ogImage = item.openGraph?.image || item.bannerImage || item.image || "https://www.torqueblock.com/newLogo.webp";
    const canonical = item.seo?.canonicalUrl || `https://www.torqueblock.com/trending/${item.slug}`;

    return {
      title,
      description,
      keywords,
      robots: item.seo?.robots || 'index,follow',
      alternates: {
        canonical,
      },
      openGraph: {
        title: item.openGraph?.title || title,
        description: item.openGraph?.description || description,
        url: canonical,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: item.name || "Trending Tyre Fitment",
          }
        ],
        type: 'article',
      },
      twitter: {
        card: "summary_large_image",
        title: item.openGraph?.title || title,
        description: item.openGraph?.description || description,
        images: [ogImage],
      }
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
      <TrendingDetailSchema item={trendingItem} />
      <Breadcrumb items={[{ label: "Trending", href: "/trending" }, { label: trendingItem.name }]} />
      <TrendingDetailsClient item={trendingItem} />
    </div>
  );
}
