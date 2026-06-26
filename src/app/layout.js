import { Geist_Mono, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";
import FloatingWhatsApp from "@/components/atoms/FloatingWhatsApp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title || siteConfig.seo.defaultTitle,
      template: siteConfig.seo.titleTemplate,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.name,
    openGraph: {
      type: siteConfig.openGraph.type,
      locale: siteConfig.openGraph.locale,
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.openGraph.siteName,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: siteConfig.twitter.card,
      title: siteConfig.title,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitter.creator,
    },
    icons: {
      icon: siteConfig.logo,
      shortcut: siteConfig.logo,
      apple: siteConfig.logo,
    },
    alternates: {
      canonical: siteConfig.seo.canonical,
      languages: {
        'en-IN': siteConfig.seo.canonical || siteConfig.url,
        'x-default': siteConfig.seo.canonical || siteConfig.url,
      },
    },
  };
}

import Script from 'next/script';

import ScrollToTop from "@/components/atoms/ScrollToTop";
import { ToastProvider } from "@/context/ToastContext";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import CartSlider from "@/components/organisms/CartSlider";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
     
        
        <ToastProvider>
          {children}
          <CartSlider />
        </ToastProvider>
        <FloatingWhatsApp />
        <LocalBusinessSchema />

        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x28sn4s424");
            `,
          }}
        />
      </body>
    </html>
  );
}
