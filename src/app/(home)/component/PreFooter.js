
import Link from "next/link";

const footerSections = [
  {
    title: "POPULAR MOTORCYCLES",
    links: [
      { label: "Triumph Scrambler 400X", href: "/bikes/triumph-scrambler-400-x-tyres" },
      { label: "BMW R1300 GS", href: "/bikes/bmw-r-1300-gs-tyres" },
      { label: "Ducati Panigale V4", href: "/bikes/ducati-panigale-v4-tyres" },
      { label: "Harley-Davidson Fat Boy 114", href: "/bikes/harley-davidson-fat-boy-114-tyres" },
      { label: "Kawasaki Ninja ZX-10R", href: "/bikes/kawasaki-ninja-zx10r-tyres" },
      { label: "KTM 390 Adventure", href: "/bikes/ktm-390-adventure-tyres" },
      { label: "Royal Enfield Interceptor 650", href: "/bikes/royal-enfield-interceptor-650-tyres" },
      { label: "Suzuki Hayabusa", href: "/bikes/suzuki-hayabusa-tyres" },
      { label: "KTM Duke 390", href: "/bikes/ktm-duke-390-tyres" },
    ],
  },
  // {
  //   title: "POPULAR TYRE TYPES",
  //   links: [
  //     { label: "Sports Touring Tyres", href: "/tyres" },
  //     { label: "Adventure Tyres", href: "/tyres" },
  //     { label: "Dual Sport Tyres", href: "/tyres" },
  //     { label: "Track Racing Tyres", href: "/tyres" },
  //     { label: "Cruiser Bike Tyres", href: "/tyres" },
  //   ],
  // },
  {
    title: "ULTIMATE PERFORMANCE",
    links: [
      { label: "Pirelli Tyres", href: "brands/6638c9c05085dcdf58c8a783" },
      { label: "Michelin Tyres", href: "/brands/6638c9c65085dcdf58c8a789" },
      { label: "Metzeler Tyres", href: "brands/6638c9ba5085dcdf58c8a77b" },

    ],
  },
  {
    title: "VALUE PERFORMANCE",
    links: [
      { label: 'MRF Tyres', href: '/brands/6a142fd08099d040cd948c1a' },
      { label: 'Apollo Tyres', href: '/brands/6638c9b95085dcdf58c8a777' },
      { label: 'Reise Tyres', href: '/brands/6638c9b85085dcdf58c8a775' },
      { label: 'Maxxis Tyres', href: '/brands/6638c885d83cd3e79e927275' },
      { label: 'Ceat Tyres', href: '/brands/6a143105bb2657ce6fd147ba' },
      { label: 'Vredestein Tyres', href: '/brands/6a0daceaf569a00d2be4eb4c' },
      { label: 'Eurogrip Tyres', href: '/brands/6a0eb930ecab7f46337aadbc' },
    ]

  },
  {
    title: "TYRE COMPARISONS",
    links: [
      { label: "Michelin Road 6 vs Pirelli Angel GT II", href: "/compare/michelin-road-6-vs-pirelli-angel-gt-ii" },
      { label: "Pirelli Angel GT II vs Metzeler Sportec M9 RR", href: "/compare/pirelli-angel-gt-ii-vs-metzeler-sportec-m9-rr" },
      { label: "Michelin Road 6 vs Metzeler Roadtec 02", href: "/compare/michelin-road-6-vs-metzeler-roadtec-02" },
      { label: "Pirelli Diablo Rosso IV vs Metzeler Sportec M9 RR", href: "/compare/pirelli-diablo-rosso-iv-vs-metzeler-sportec-m9-rr" },
      { label: "Pirelli Diablo Rosso IV vs Michelin Power 6", href: "/compare/pirelli-diablo-rosso-iv-vs-michelin-power-6" },
      { label: "Michelin Power 6 vs Metzeler Sportec M9 RR", href: "/compare/michelin-power-6-vs-metzeler-sportec-m9-rr" },
      { label: "Pirelli Diablo Rosso IV Corsa vs Michelin Power 6", href: "/compare/pirelli-diablo-rosso-iv-corsa-vs-michelin-power-6" },
      { label: "Pirelli Scorpion Trail II vs Michelin Anakee Road", href: "/compare/pirelli-scorpion-trail-ii-vs-michelin-anakee-road" },
      { label: "Pirelli Scorpion Trail II vs Metzeler Tourance Next 2", href: "/compare/pirelli-scorpion-trail-ii-vs-metzeler-tourance-next-2" },
    ],
  },
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

          <p className="text-gray-400 text-sm lg:text-sm mt-6 max-w-4xl mx-auto leading-relaxed">
            Discover motorcycle tyre recommendations, Motorcycle-specific fitments,
            touring setups, track-focused tyres, and expert tyre comparisons
            built for Indian roads and performance riders.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-bold tracking-[0.2em] text-orange-400 uppercase mb-4">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="group flex items-center text-gray-300 hover:text-orange-400 transition-all duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500/70 mr-3 flex-shrink-0 group-hover:bg-orange-400" />
                      <span className="text-sm">
                        {link.label}
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