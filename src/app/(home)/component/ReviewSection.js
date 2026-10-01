"use client";

import { useEffect, useRef, useState } from "react";
import { loadTrustindexWidget } from "@/services/trustindexService";

export default function ReviewsSection() {
  const widgetRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    return loadTrustindexWidget(widgetRef.current, {
      onLoaded: () => setLoaded(true),
      onExpired: () => setIsExpired(true),
    });
  }, []);

  if (isExpired) return null;

  return (
    <section className="w-full" id="reviews">
      <div>
        <div className="mb-6">
          <p className="text-orange-500 text-xs md:text-sm font-semibold tracking-[0.5em] transition-colors uppercase">
            Trusted By
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase leading-none tracking-tight text-white">
            Riders <span className="text-orange-500">Across India</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 max-w-3xl">
            Real riders. Real experiences. See what our customers say about Torque Block.
          </p>
        </div>

        <div className="relative w-full min-h-[350px] overflow-hidden">
          {!loaded && (
            <div className="absolute inset-0 z-10 animate-pulse flex flex-col w-full bg-black/90 pt-6 rounded-lg">
              <div className="w-full px-4 mb-6">
                <div className="bg-zinc-900/50 rounded-lg flex flex-col  md:flex-row gap-4 items-center justify-between px-4 py-3 ">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="w-20 h-6 bg-zinc-800 rounded" />
                    <div className="w-16 h-4 bg-zinc-800 rounded" />
                    <div className="w-28 h-5 bg-zinc-800 rounded" />
                    <div className="w-32 h-4 bg-zinc-800 rounded" />
                  </div>
                  <div className="w-32 h-10 border border-zinc-700 rounded-lg" />
                </div>
              </div>


              <div className="flex overflow-hidden gap-6 w-full pb-4 mx-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="min-w-[300px] w-[300px] bg-zinc-900/50 border border-gray-800 p-6 rounded-xl flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 shrink-0" />
                      <div className="flex flex-col gap-2">
                        <div className="w-24 h-4 bg-zinc-800 rounded" />
                        <div className="w-16 h-3 bg-zinc-800 rounded" />
                      </div>
                    </div>

                    <div className="w-24 h-4 bg-zinc-800 rounded" />

                    <div className="flex flex-col gap-2">
                      <div className="w-full h-3 bg-zinc-800 rounded" />
                      <div className="w-full h-3 bg-zinc-800 rounded" />
                      <div className="w-full h-3 bg-zinc-800 rounded" />
                      <div className="w-3/4 h-3 bg-zinc-800 rounded" />
                      <div className="w-16 h-3 bg-zinc-800 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            ref={widgetRef}
            className="trustindex-embed"
          />
        </div>
      </div>
    </section>
  );
}