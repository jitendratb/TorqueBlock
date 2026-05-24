const SITE_NAME = "Torque Block";
const DEFAULT_OG_IMAGE = "/newLogo.webp";

export function generateOpenGraph({ title, description, image, canonical, }) {
    const safeTitle = title || SITE_NAME;
    const safeDescription = description || "India's premium performance motorcycle tyre platform.";

    const safeImage = image || DEFAULT_OG_IMAGE;
    const safeCanonical = canonical || "https://torqueblock.com";

    return {
        title: safeTitle,
        description: safeDescription,
        url: safeCanonical,
        siteName: SITE_NAME,
        locale: "en_IN",
        type: "website",
        images: [{ url: safeImage, width: 1200, height: 630, alt: safeTitle, }],
    };
}