import Breadcrumb from '@/components/atoms/BreadCrumb';
import BlogsClient from './Components/BlogsClient';
import blogService from '@/services/blogService';
import WebPageSchema from '@/components/seo/WebPageSchema';

export const metadata = {
    title: 'Blogs | Torque Block — Motorcycle Tyre Insights',
    description: 'Expert motorcycle tyre reviews, riding tips, and product guides from the Torque Block team.',
    alternates: { canonical: 'https://torqueblock.com/blogs' },
    openGraph: {
        title: 'Torque Block Blog',
        description: 'Expert motorcycle tyre reviews, riding tips, and product guides.',
        url: 'https://torqueblock.com/blogs',
        siteName: 'Torque Block',
        type: 'website',
        images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
    },
};

export default async function BlogsPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const page = parseInt(resolvedParams?.page || '1', 10);
    const limit = parseInt(resolvedParams?.limit || '22', 10);

    let blogs = [];
    let pagination = {};
    let fetchError = null;

    try {
        const data = await blogService.getAllBlogs({ page, limit });
        blogs = data?.blogs || [];
        pagination = data?.pagination || {};
    } catch (err) {
        console.error('[BlogsPage] Failed to fetch blogs:', err?.message ?? err);
        fetchError = true;
    }

    const breadcrumbItems = [
        { label: 'Blogs', isLast: true },
    ];

    const schemaItems = blogs.map((blog) => ({
        name: blog.title || "Blog Post",
        url: `/blogs/${blog.slug || ''}`
    }));

    return (
        <>
            <WebPageSchema 
                type="CollectionPage"
                title="Torque Block Blogs"
                description="Expert motorcycle tyre reviews, riding tips, and product guides."
                url="/blogs"
                items={schemaItems}
            />
            <main className="min-h-screen">
                <Breadcrumb items={breadcrumbItems} />
                <div className="py-4">
                    <BlogsClient blogs={blogs} pagination={pagination} />
                </div>
            </main>
        </>
    );
}