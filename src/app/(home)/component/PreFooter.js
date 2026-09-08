import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
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
      links: motorcycleLinks,
    },
    {
      title: "Ultimate Performance",
      links: premiumBrands.map((brand) => ({
        label: formatBrandLabel(brand?.name),
        href: `/brands/${brand?._id}`,
      })),
    },
    {
      title: "Value Performance",
      links: valuePerformanceBrands.map((brand) => ({
        label: formatBrandLabel(brand?.name),
        href: `/brands/${brand?._id}`,
      })),
    },
    {
      title: "Compare Tyres",
      links: compareLinks,
    },
  ];

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
              <h3 className="text-sm font-bold text-orange-400 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="group flex items-center text-gray-300 hover:text-orange-400 transition-all duration-300">
                      <FiChevronRight strokeWidth={3} size={16} className="text-orange-500/70 mr-2 flex-shrink-0 group-hover:text-orange-400 group-hover:translate-x-1 transition-all duration-300" />
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