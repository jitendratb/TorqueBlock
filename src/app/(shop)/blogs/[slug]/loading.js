import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function BlogDetailsLoading() {
  const breadcrumbItems = [
    { label: 'Blogs', href: '/blogs' },
    { label: 'Loading article...', isLast: true },
  ];

  return (
    <div className="space-y-4 pt-2 animate-fade-in">
      <Breadcrumb items={breadcrumbItems} />

      {/* Cover Image banner placeholder */}
      <div className="relative w-full h-[300px] md:h-[450px] bg-zinc-900/30 border border-zinc-850 rounded-xl animate-pulse flex flex-col justify-end p-8">
        <div className="h-4 w-20 bg-zinc-800/50 rounded-full mb-3" />
        <div className="h-8 w-2/3 bg-zinc-800/50 rounded-xl mb-4" />
        <div className="h-4 w-48 bg-zinc-800/30 rounded-full" />
      </div>

      {/* Split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 items-start mt-6">
        
        {/* Left Column: Long-form article text paragraphs */}
        <article className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-6 md:p-8 animate-pulse space-y-6">
          <div className="h-4 w-full bg-zinc-800/50 rounded-full" />
          <div className="h-4 w-11/12 bg-zinc-800/50 rounded-full" />
          <div className="h-4 w-4/5 bg-zinc-800/50 rounded-full" />
          
          <div className="border-l-4 border-zinc-800 pl-4 py-2 space-y-2">
            <div className="h-4 w-full bg-zinc-800/30 rounded-full" />
            <div className="h-4 w-5/6 bg-zinc-800/30 rounded-full" />
          </div>

          <div className="h-4 w-full bg-zinc-800/50 rounded-full" />
          <div className="h-4 w-3/4 bg-zinc-800/50 rounded-full" />
        </article>

        {/* Right Column: Sidebar modules */}
        <aside className="space-y-4 animate-pulse">
          <div className="rounded-3xl bg-zinc-900/30 border border-zinc-900 p-6 flex flex-col gap-4">
            <div className="h-4 w-28 bg-zinc-800/50 rounded-full" />
            <div className="h-6 w-3/4 bg-zinc-800/50 rounded-lg" />
            <div className="h-10 w-full bg-zinc-800/40 rounded-xl" />
          </div>
          <div className="rounded-3xl bg-zinc-900/20 border border-zinc-900 p-6 flex flex-col gap-3">
            <div className="h-3 w-16 bg-zinc-800/50 rounded-full" />
            <div className="h-8 w-full bg-zinc-800/30 rounded-lg" />
          </div>
        </aside>
      </div>
    </div>
  );
}
