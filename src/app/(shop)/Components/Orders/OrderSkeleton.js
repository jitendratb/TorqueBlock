import React from 'react';

export default function OrderSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((n) => (
        <div 
          key={n} 
          className="w-full bg-zinc-900/40 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-xl animate-pulse space-y-5"
        >
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="space-y-2">
              <div className="h-3.5 w-40 bg-zinc-800 rounded-md" />
              <div className="h-2.5 w-24 bg-zinc-800 rounded-md" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-20 bg-zinc-800 rounded-full" />
              <div className="h-4 w-16 bg-zinc-800 rounded-md" />
            </div>
          </div>

          {/* Items Row */}
          <div className="space-y-4">
            {[1].map((item) => (
              <div key={item} className="flex gap-4 items-center">
                {/* Image Placeholder */}
                <div className="w-16 h-16 rounded-xl bg-zinc-800 shrink-0" />
                
                {/* Product Name & Size */}
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/3 bg-zinc-800 rounded-md" />
                  <div className="h-2.5 w-1/3 bg-zinc-800 rounded-md" />
                </div>

                {/* Price and Quantity */}
                <div className="text-right space-y-2">
                  <div className="h-3 w-16 bg-zinc-800 rounded-md ml-auto" />
                  <div className="h-2.5 w-8 bg-zinc-800 rounded-md ml-auto" />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action Row */}
          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <div className="h-3 w-32 bg-zinc-800 rounded-md" />
            <div className="flex gap-3">
              <div className="h-9 w-24 bg-zinc-800 rounded-lg" />
              <div className="h-9 w-28 bg-zinc-800 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
