import Header from "@/components/organisms/header";
import { PageShellMain } from "./Components/PageShell";
import EnterprisePreFooter from "../(home)/component/PreFooter";
import Footer from "../(home)/component/Footer";


export const metadata = {
    metadataBase: new URL("https://torqueblock.com"),

    title: {
        default: "Torque Block",
        template: "%s | Torque Block",
    },

    description:
        "India's premium performance motorcycle tyre platform for superbikes, track riding, sport touring, and ADV motorcycles.",

    applicationName: "Torque Block",

    creator: "Torque Block",
    publisher: "Torque Block",

    category: "Automotive",

    keywords: [
        "performance motorcycle tyres",
        "superbike tyres India",
        "Pirelli tyres",
        "Metzeler tyres",
        "Michelin motorcycle tyres",
    ],

    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },

    alternates: {
        canonical: "/",
    },

    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://torqueblock.com",
        siteName: "Torque Block",

        title: "Torque Block",

        description:
            "India's premium performance motorcycle tyre platform.",
        images: [
            {
                url: "/main.jpg",
                width: 1200,
                height: 630,
                alt: "Torque Block - Premium Performance Motorcycle Tyre Platform",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title: "Torque Block",

        description:
            "India's premium performance motorcycle tyre platform.",

        images: ["/main.jpg"],
    },

    robots: {
        index: true,
        follow: true,
        nocache: false,

        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            {
                url: "/favicon.ico",
            }
        ],
    },

    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Torque Block",
    },

    themeColor: "#000000",
};

export default function HomeLayout({ children }) {
    return (
        <div>
            <Header />
            <PageShellMain>
                {children}
            </PageShellMain>
            <EnterprisePreFooter />
            <Footer />
        </div>

    );
}
