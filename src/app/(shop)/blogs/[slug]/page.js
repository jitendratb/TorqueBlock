import Breadcrumb from '@/components/atoms/BreadCrumb';
import blogService from '@/services/blogService';
import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';
const BlogDetailsClient = dynamic(() => import('../Components/BlogDetailsClient'), { ssr: true, loading: () => <div className="min-h-[500px] w-full animate-pulse bg-zinc-900 rounded-xl mt-4" /> });
import { cache } from "react";
import { notFound } from "next/navigation";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import { getBlogFAQs } from "@/lib/seo/faqs";


const getBlog = cache(async (slug) => {
    const data = await blogService.getBlogById(slug);
    return data?.blogData;
});

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) return {};

    const displayTitle = blog?.metaTitle || blog?.header || "Blog Post";
    const displayDescription = blog?.metaDescription || blog?.subHeader || "Read this high-performance motorcycle tyre and bike review on Torque Block.";
    const mainImage = blog?.image || "/newLogo.webp";

    return {
        title: displayTitle,
        description: displayDescription,
        alternates: { canonical: `https://torqueblock.com/blogs/${slug}`, },
        robots: { index: true, follow: true, },
        openGraph: {
            type: "article",
            url: `https://torqueblock.com/blogs/${slug}`,
            title: displayTitle,
            description: displayDescription,
            images: [
                {
                    url: mainImage,
                    width: 1200,
                    height: 630,
                    alt: blog?.header || "Blog Post",
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: displayTitle,
            description: displayDescription,
            images: [mainImage],
        },
    };
}

async function Blog({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    const displayName = blog?.header || slug.replace(/-/g, ' ');
    const breadcrumbItems = [{ label: 'Blogs', href: '/blogs' }, { label: displayName, isLast: true },];
    const faqs = getBlogFAQs(blog);

    return (
        <main className="min-h-screen pb-4 font-[Inter,sans-serif] overflow-x-hidden">
            <div className="">
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <BlogDetailsClient blog={blog} />

            {/* Silent FAQ JSON-LD Schema */}
            <FAQSchema faqs={faqs} />

            {/* Structured JSON-LD Schema */}
            <ArticleSchema article={blog} />
            <BreadcrumbSchema items={breadcrumbItems} />
        </main>
    );
}

export default Blog;