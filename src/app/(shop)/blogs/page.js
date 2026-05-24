import Breadcrumb from '@/components/atoms/BreadCrumb';
import BlogsClient from './Components/BlogsClient';
import blogService from '@/services/blogService';
import WebPageSchema from '@/components/seo/WebPageSchema';

export async function generateMetadata() {
  return ;
}

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