import Breadcrumb from '@/components/atoms/BreadCrumb';
import BlogsClient from './Components/BlogsClient';
import blogService from '@/services/blogService';

export const metadata = {
    title: 'Blogs | Torque Black — Motorcycle Tyre Insights',
    description: 'Expert motorcycle tyre reviews, riding tips, and product guides from the Torque Black team.',
    openGraph: {
        title: 'Torque Black Blog',
        description: 'Expert motorcycle tyre reviews, riding tips, and product guides.',
        type: 'website',
    },
};

export default async function BlogsPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const page = parseInt(resolvedParams?.page || '1', 10);
    const limit = parseInt(resolvedParams?.limit || '22', 22);

    let blogs = [];
    let pagination = {};
    let fetchError = null;

    try {
        const data = await blogService.getAllBlogs({ page, limit });
        blogs = data?.blogs;
        pagination = data?.pagination;
    } catch (err) {
        console.error('[BlogsPage] Failed to fetch blogs:', err?.message ?? err);
        fetchError = true;
    }

    const breadcrumbItems = [
        { label: 'Blogs', isLast: true },
    ];

    

    return (
        <main className="min-h-screen ">
            <Breadcrumb items={breadcrumbItems} />
            <div className="py-4">
                <BlogsClient blogs={blogs} pagination={pagination} />
            </div>
        </main>
    );
}