
import Link from "next/link";

const footerSections = [
  {
    title: "POPULAR BIKES",
    links: [
      { label: "Harley-Davidson 1200 Custom", href: "/bikes/harley-davidson-1200-custom-tyres" },
      { label: "Harley-Davidson Heritage Classic", href: "/bikes/harley-davidson-heritage-classic-tyres" },
      { label: "Harley-Davidson Road King", href: "/bikes/harley-davidson-road-king-tyres" },
      { label: "Honda XL750 Transalp", href: "/bikes/honda-xl750-transalp-tyres" },
      { label: "Triumph Speed 400", href: "/bikes/triumph-speed-400-tyres" },
      { label: "Triumph Tiger 900 GT", href: "/bikes/triumph-tiger-900-gt-tyres" },
      { label: "Kawasaki Versys 1000", href: "/bikes/kawasaki-versys-1000-tyres" },
      { label: "Ducati Multistrada 1200 S", href: "/bikes/ducati-multistrada-1200-s-tyres" },
      { label: "Triumph Tiger 900 Rally Pro", href: "/bikes/triumph-tiger-900-rally-pro-tyres" },
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
      { label: "Pirelli Tyres", href: "/search?q=Pirelli" },
      { label: "Michelin Tyres", href: "/search?q=Michelin" },
      { label: "Metzeler Tyres", href: "/search?q=Metzeler" },

    ],
  },
  {
    title: "VALUE PERFORMANCE",
    links: [
      { label: 'MRF Tyres', href: '/search?q=MRF' },
      { label: 'Apollo Tyres', href: '/search?q=Apollo' },
      { label: 'Reise Tyres', href: '/search?q=Reise' },
      { label: 'Maxxis Tyres', href: '/search?q=Maxxis' },
      { label: 'Ceat Tyres', href: '/search?q=Ceat'},
      { label: 'Vredestein Tyres', href: '/search?q=Vredestein' },
      { label: 'Eurogrip Tyres', href: '/search?q=Eurogrip' },
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
            Discover motorcycle tyre recommendations, bike specific fitments,
            touring setups, track focused tyres, and expert tyre comparisons
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