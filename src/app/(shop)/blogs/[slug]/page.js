import Breadcrumb from '@/components/atoms/BreadCrumb';
import React from 'react'

async function Blog({params}) {
    const  slug = await params.slug

    const breadcrumbItems = [
        { label: 'Blogs', url: '/blogs' },
        { label: 'Blog Detail', isLast: true },
    ];
    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
        </div>
    )
}

export default Blog;