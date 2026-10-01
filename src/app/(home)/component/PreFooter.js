import Link from "next/link";
import { FiChevronRight, FiArrowRight } from "react-icons/fi";
import { PiMotorcycleFill, PiTrophyFill, PiCoinsFill, PiScalesFill } from "react-icons/pi";
import brandServiceInstance from "@/services/brandService";

const motorcycleLinks = [
  { label: "Triumph Scrambler 400X", href: "/motorcycles/triumph-scrambler-400-x-tyres" },
  { label: "BMW R1300 GS", href: "/motorcycles/bmw-r-1300-gs-tyres" },
  { label: "Ducati Panigale V4", href: "/motorcycles/ducati-panigale-v4-tyres" },
  { label: "Harley-Davidson Fat Boy 114", href: "/motorcycles/harley-davidson-fat-boy-114-tyres" },
  { label: "Kawasaki Ninja ZX-10R", href: "/motorcycles/kawasaki-ninja-zx10r-tyres" },
  { label: "KTM 390 Adventure", href: "/motorcycles/ktm-390-adventure-tyres" },
  { label: "Royal Enfield Interceptor 650", href: "/motorcycles/royal-enfield-interceptor-650-tyres" },
  { label: "Suzuki Hayabusa", href: "/motorcycles/suzuki-hayabusa-tyres" },
  { label: "KTM Duke 390", href: "/motorcycles/ktm-duke-390-tyres" },
];

const compareLinks = [
  { label: "Michelin Road 6 vs Pirelli Angel GT II", href: "/compare/michelin-road-6-vs-pirelli-angel-gt-ii" },
  { label: "Pirelli Angel GT II vs Metzeler Sportec M9 RR", href: "/compare/pirelli-angel-gt-ii-vs-metzeler-sportec-m9-rr" },
  { label: "Michelin Road 6 vs Metzeler Roadtec 02", href: "/compare/michelin-road-6-vs-metzeler-roadtec-02" },
  { label: "Pirelli Diablo Rosso IV vs Metzeler Sportec M9 RR", href: "/compare/pirelli-diablo-rosso-iv-vs-metzeler-sportec-m9-rr" },
  { label: "Pirelli Diablo Rosso IV vs Michelin Power 6", href: "/compare/pirelli-diablo-rosso-iv-vs-michelin-power-6" },
  { label: "Michelin Power 6 vs Metzeler Sportec M9 RR", href: "/compare/michelin-power-6-vs-metzeler-sportec-m9-rr" },
  { label: "Pirelli Diablo Rosso IV Corsa vs Michelin Power 6", href: "/compare/pirelli-diablo-rosso-iv-corsa-vs-michelin-power-6" },
  { label: "Pirelli Scorpion Trail II vs Michelin Anakee Road", href: "/compare/pirelli-scorpion-trail-ii-vs-michelin-anakee-road" },
  { label: "Pirelli Scorpion Trail II vs Metzeler Tourance Next 2", href: "/compare/pirelli-scorpion-trail-ii-vs-metzeler-tourance-next-2" },
];

const PREMIUM_ORDER = ['pirelli', 'michelin', 'metzeler'];

const formatBrandLabel = (name = "") => {
  if (!name) return "";
  const trimmed = name.trim();
  if (trimmed.toLowerCase().endsWith("tyres")) {
    return trimmed;
  }
  const upper = trimmed.toUpperCase();
  if (upper === "MRF" || upper === "CEAT") {
    return `${upper} Tyres`;
  }
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1).toLowerCase()} Tyres`;
};

const getValueBrandPriority = (name = "") => {
  const lower = name?.toLowerCase() || "";
  if (lower.includes('eurogrip')) return 1;
  if (lower.includes('vredestein')) return 2;
  return 3;
};

export default async function EnterprisePreFooter() {
  let premiumBrands = [];
  let valuePerformanceBrands = [];

  try {
    const data = await brandServiceInstance.getBrands({ isActive: true });

    premiumBrands = (data?.filter((brand) =>
      PREMIUM_ORDER.includes(brand?.name?.toLowerCase())
    ) || []).sort((a, b) => {
      const indexA = PREMIUM_ORDER.indexOf(a?.name?.toLowerCase());
      const indexB = PREMIUM_ORDER.indexOf(b?.name?.toLowerCase());
      return indexA - indexB;
    });

    valuePerformanceBrands = (data?.filter((brand) =>
      !PREMIUM_ORDER.includes(brand?.name?.toLowerCase())
    ) || []).sort((a, b) => getValueBrandPriority(a?.name) - getValueBrandPriority(b?.name));
  } catch (error) {
    console.error("Error fetching brands:", error);
  }

  const footerSections = [
    {
      title: "Shop by Motorcycle",
      subtitle: "Find the right tyres for your motorcycle.",
      icon: PiMotorcycleFill,
      links: motorcycleLinks,
      cta: { label: "View All Motorcycles", href: "/motorcycles" },
    },
    {
      title: "Shop By Brands",
      subtitle: "World-leading performance brands.",
      icon: PiTrophyFill,
      links: [...premiumBrands , ...valuePerformanceBrands].slice(0,9).map((brand) => ({
        label: formatBrandLabel(brand?.name),
        href: `/brands/${brand?._id}`,
      })),
      cta: { label: "View All Brands", href: "/brands" },
    },
    {
      title: "Compare Tyres",
      subtitle: "Make the right choice with expert comparisons.",
      icon: PiScalesFill,
      links: compareLinks,
      cta: { label: "View All Comparisons", href: "/compare" },
    },
  ];

  return (
    <section className="border-t border-gray-600 bg-[#2e3340]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-5xl font-bold text-white leading-tight">
            Explore Premium <span className="text-orange-500">Motorcycle Tyres</span>
          </h2>

          <div className="w-28 h-1 bg-orange-500 rounded-full mx-auto mt-3" />

          <p className="text-gray-400 text-sm lg:text-base mt-6 max-w-4xl mx-auto leading-relaxed">
            Explore motorcycle tyres by motorcycle, performance category, brand and comparison.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {footerSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <Icon className="text-orange-500 flex-shrink-0 mt-0.5" size={30} />
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {section.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-snug">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-5" />

                <ul className="space-y-2.5 flex-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="group flex items-start text-gray-300 hover:text-orange-400 transition-all duration-300">
                        <FiChevronRight strokeWidth={3} size={16} className="text-orange-500/70 mr-2 mt-0.5 flex-shrink-0 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" />
                        <span className="text-sm leading-snug">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={section.cta.href}
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-400 transition-colors duration-300"
                >
                  {section.cta.label}
                  <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}