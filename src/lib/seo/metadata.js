const SITE_NAME = "Torque Block";

const DEFAULT_IMAGE = "/newLogo.webp";

export function generateMetadata({ title, description, image, canonical, }) {
    const safeTitle = title || SITE_NAME;
    const safeDescription = description || "India's premium performance motorcycle tyre platform.";

    const safeImage = image || DEFAULT_IMAGE;

    const safeCanonical = canonical || "https://www.torqueblock.com";

    return {
        title: safeTitle,
        description: safeDescription,
        alternates: { canonical: safeCanonical },
        openGraph: {
            title: safeTitle,
            description: safeDescription,
            url: safeCanonical,
            siteName: SITE_NAME,
            locale: "en_IN",
            type: "website",
            images: [{ url: safeImage, width: 1200, height: 630, alt: safeTitle, },],
        },

        twitter: {
            card: "summary_large_image",
            title: safeTitle,
            description: safeDescription,
            images: [safeImage],
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}