"use client";

import Link from "next/link";

const footerSections = [
  {
    title: "POPULAR BIKES",
    links: [
      "KTM Duke Tyres",
      "BMW GS Tyres",
      "Hayabusa Tyres",
      "Ducati Panigale Tyres",
      "Interceptor 650 Tyres",
    ],
  },
  {
    title: "POPULAR TYRE TYPES",
    links: [
      "Sports Touring Tyres",
      "Adventure Tyres",
      "Dual Sport Tyres",
      "Track Racing Tyres",
      "Cruiser Bike Tyres",
    ],
  },
  {
    title: "PREMIUM TYRE BRANDS",
    links: [
      "Pirelli Tyres",
      "Michelin Tyres",
      "Metzeler Tyres",
    ],
  },
  {
    title: "TYRE COMPARISONS",
    links: [
      "Road 6 vs Angel GT II",
      "Power 6 vs Diablo Rosso IV",
      "Karoo 4 vs Anakee Wild",
      "Sportec M9 RR vs Power GP 2",
      "Roadtec 02 vs Road 6",
    ],
  },
//   {
//     title: "ADVENTURE TYRES",
//     links: [
//       "Scorpion Rally STR",
//       "Karoo 4",
//       "Anakee Adventure",
//       "Trail Attack 3",
//       "Tourance Next 2",
//     ],
//   },
//   {
//     title: "SPORTS BIKE TYRES",
//     links: [
//       "Diablo Rosso IV",
//       "Power GP 2",
//       "Sportec M9 RR",
//       "S22 Battlax",
//       "Rosso Corsa IV",
//     ],
//   },
];

export default function EnterprisePreFooter() {
  return (
    <section className="border-t border-gray-600 bg-[#2e3340]">
      <div className="mt-6 max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-5xl font-bold text-white leading-tight">
            Explore Premium Motorcycle Tyres
          </h2>

          <div className="w-28 h-1 bg-orange-500 rounded-full mx-auto mt-2" />

          <p className="text-gray-400 text-sm lg:text-lg mt-6 max-w-4xl mx-auto leading-relaxed">
            Discover motorcycle tyre recommendations, bike specific fitments,
            touring setups, track focused tyres, and expert tyre comparisons
            built for Indian roads and performance riders.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {footerSections.map((section, index) => (
            <div key={index}>
              
              <h3 className="text-sm font-bold tracking-[0.2em] text-orange-400 uppercase mb-4">
                {section.title}
              </h3>


              <ul className="space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href="/" className="group flex items-center text-gray-300 hover:text-orange-400 transition-all duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500/70 mr-3 flex-shrink-0 group-hover:bg-orange-400" />
                      <span className="text-sm">
                        {link}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}