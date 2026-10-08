// TEMPORARY visual-test harness for the ProductDetails redesign. Delete this folder when done.
import ProductDetails from "../Components/TyreComponent/ProductDetails";

const CDN = "https://cdn.torqueblock.com";
const photo = (name, i) => ({ url: `${CDN}/${name}.webp`, alt: `Photo ${i + 1}`, title: `Photo ${i + 1}`, caption: `Caption ${i + 1}` });
const mrf = ["mrf-steel-brace-sp-01-real-pair", "mrf-steel-brace-sp-01-side-profile", "mrf-steel-brace-sp-01-close-up", "mrf-steel-brace-sp-01-120-70-zr17-front-on-kawasaki-ninja-1000", "mrf-steel-brace-sp-01-190-50-zr17-rear-on-kawasaki-ninja-1000"].map(photo);
const sizes = (n) => Array.from({ length: n }, (_, i) => ({ _id: String(i), position: i % 2 ? "Rear" : "Front" }));

const base = {
    productName: "MRF Steel Brace SP 01",
    brand: { name: "MRF" },
    categoryId: { name: "Sport Touring" },
    hero: {
        subtitle: "High-speed stability, confident cornering and wet/dry road grip for performance-focused motorcycles.",
        highlights: ["Zero-degree steel radial construction", "silica-enriched compound", "optimized tread design", "consistent contact patch"],
    },
    productImages: mrf,
    sizesIds: sizes(4),
    startingPrice: 16700,
    endingPrice: 24800,
    pricing: {},
};

const CASES = {
    base,
    long: {
        ...base,
        productName: "Bridgestone Battlax Hypersport S22 Racing Compound Extra Soft Edition",
        brand: { name: "Bridgestone International Motorsport" },
        categoryId: { name: "Extreme Track Day & Superbike Racing" },
        hero: {
            subtitle: "Engineered for riders who demand absolute precision on every apex, with an enormous amount of descriptive marketing copy that goes on and on and on to prove that three lines is the limit here and the rest is clamped away cleanly.",
            highlights: [
                "Multi-compound silica-rich tread that keeps working from the first cold lap to the last hot lap of a long track day session",
                "Ultra long highlight without any spaces " + "x".repeat(60),
                "third",
                "fourth is never shown",
            ],
        },
        startingPrice: 1234567,
        endingPrice: 2345678,
        sizesIds: sizes(24),
    },
    noPrice: { ...base, startingPrice: undefined, endingPrice: undefined, pricing: {} },
    single: { ...base, productImages: mrf.slice(0, 1), sizesIds: sizes(1), startingPrice: 9500, endingPrice: 9500 },
    noImages: { ...base, productImages: [] },
    minimal: { productName: "Mystery", productImages: mrf.slice(0, 2), startingPrice: 5000 },
    manyThumbs: { ...base, productImages: [...mrf, ...mrf] },
};

export default async function Page({ searchParams }) {
    const { case: name = "base" } = await searchParams;
    const tyre = CASES[name] ?? CASES.base;
    return (
        <div className="py-4 space-y-4">
            <ProductDetails tyre={tyre} />
            <div id="allSizesLink" className="rounded-2xl border border-white/10 p-6 text-zinc-400">#allSizesLink scroll target</div>
        </div>
    );
}
