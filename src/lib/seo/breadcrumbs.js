/**
 * @fileoverview Breadcrumb schema generator for SEO.
 * Provides a scalable and type-safe configuration-driven approach 
 * for generating JSON-LD breadcrumb trails.
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://torqueblock.com";

/**
 * @typedef {Object} BreadcrumbItem
 * @property {number} position - The 1-based index position of the breadcrumb.
 * @property {string} name - The human-readable label of the breadcrumb.
 * @property {string} item - The absolute URL of the breadcrumb.
 */

/**
 * @typedef {Object} GenerateBreadcrumbOptions
 * @property {'brands' | 'motorcycles' | 'brandPage' | 'motorcyclePage' | 'search'} page - The page context category.
 * @property {string} [title=""] - The display title for the current entity (e.g., "Pirelli").
 * @property {string} [slug=""] - The URL-friendly identifier (e.g., "pirelli"). Falls back to URL-encoded title if not provided.
 */

/**
 * Generates an SEO-optimized JSON-LD breadcrumb trail based on page context.
 * Utilizes a configuration dictionary for O(1) lookup and clean extensibility.
 * 
 * @param {GenerateBreadcrumbOptions} options - Options to build the breadcrumb trail.
 * @returns {BreadcrumbItem[]} An array of structured breadcrumb objects.
 */
export function generateBreadcrumbSchema({ page, title = "", slug = "" }) {
    const baseBreadcrumb = [{ position: 1, name: "Home", item: BASE_URL }];

    if (!page) {
        console.warn("[SEO] generateBreadcrumbSchema: 'page' argument is missing.");
        return baseBreadcrumb;
    }

    // Default to the encoded title if an explicit slug is omitted to prevent invalid URL segments
    const safeSlug = slug || encodeURIComponent(title);

    /** @type {Record<string, Array<{ name: string, path: string }>>} */
    const BREADCRUMB_STRATEGIES = {
        brands: [
            { name: "Tyre Brands", path: "/brands" },
            ...(title ? [{ name: title, path: `/brands/${safeSlug}` }] : [])
        ],
        motorcycles: [
            { name: "Tyre Size", path: "/motorcycles" },
            ...(title ? [{ name: title, path: `/motorcycles/${safeSlug}` }] : [])
        ],
        brandPage: [
            ...(title ? [{ name: title, path: `/brands/${safeSlug}` }] : [])
        ],
        motorcyclePage: [
            ...(title ? [{ name: title, path: `/motorcycles/${safeSlug}` }] : [])
        ],
        search: [
            { name: "Search Results", path: `/search?q=${encodeURIComponent(title)}` }
        ]
    };

    const strategy = BREADCRUMB_STRATEGIES[page];

    if (!strategy) {
        console.warn(`[SEO] generateBreadcrumbSchema: Unrecognized page type '${page}'.`);
        return baseBreadcrumb;
    }

    // Map the selected strategy into the final breadcrumb format
    const contextualBreadcrumbs = strategy.map((crumb, index) => ({
        position: index + 2, // Offset by 1 for the 'Home' base breadcrumb
        name: crumb.name,
        item: `${BASE_URL}${crumb.path}`
    }));

    return [...baseBreadcrumb, ...contextualBreadcrumbs];
}