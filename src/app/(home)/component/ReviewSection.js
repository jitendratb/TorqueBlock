"use client";

import { useEffect, useRef, useState } from "react";

export default function ReviewsSection() {
  const widgetRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (container.querySelector("#trustindex-script")) return;
        const script = document.createElement("script");
        script.id = "trustindex-script";
        script.src = "https://cdn.trustindex.io/loader.js?1ced8246880d851ac056a341c19";
        script.async = true;

        script.onload = () => {
          setTimeout(() => {
            const currentContainer = widgetRef.current;
            if (!currentContainer) return;

            const expired = currentContainer.innerHTML.includes("7-day trial period has expired");

            if (expired) {
              setIsExpired(true);
            } else {
              setLoaded(true);
            }
          }, 800);
        };

        container.appendChild(script);
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  if (isExpired) return null;

  return (
    <section className="w-full" id="reviews">
      <div>
        <div className=" flex flex-col justify-start">
          <div className="w-auto">
            <h2 className="text-xl md:text-4xl font-extrabold text-white">Trusted By Riders Across India</h2>
            <hr className="border-b-4 mt-2 lg:mt-3 mb-4 border-orange-500 w-[150px] md:w-[250px] rounded-full" />
          </div>
        </div>

        <div className="relative min-h-[350px] overflow-hidden">
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
            // className="trustindex-widget w-full overflow-hidden lg:bg-black pt-4 rounded-lg"
            // style={{
            //   opacity: loaded ? 1 : 0,
            //   transition: "opacity 0.4s ease",
            // }}
          />
        </div>
      </div>
    </section>
  );
}