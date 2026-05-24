import React from 'react';
import Breadcrumb from '@/components/atoms/BreadCrumb';

export default function ComparePortalLoading() {
  const breadcrumbItems = [{ label: 'Compare', isLast: true }];

  return (
    <div className="space-y-4 mb-4 animate-fade-in">
      <Breadcrumb items={breadcrumbItems} />

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="h-6 w-32 bg-zinc-900 border border-zinc-800 rounded-full animate-pulse" />
            <h2 className="text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none animate-pulse">
              FACE THE <br />
              <span className="text-orange-500 outline-text text-transparent">COMPETITION</span>
            </h2>
          </div>
          <div className="h-[52px] w-full md:max-w-md bg-zinc-900 border border-zinc-850 rounded-2xl animate-pulse" />
        </div>

        {/* 6 pulsing battle cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="relative h-[20rem] md:h-[24rem] bg-zinc-900/40 border border-zinc-850 rounded-xl md:rounded-[2rem] overflow-hidden flex flex-col justify-between p-6">
              <div className="flex justify-between w-full">
                <div className="h-5 w-16 bg-zinc-800/50 rounded-full" />
                <div className="h-5 w-16 bg-zinc-800/50 rounded-full" />
              </div>
              <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-700 font-black">VS</span>
                </div>
              </div>
              <div className="flex justify-between items-end w-full gap-4 mt-auto pt-16">
                <div className="h-5 w-1/3 bg-zinc-800/50 rounded-md" />
                <div className="h-5 w-1/3 bg-zinc-800/50 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
