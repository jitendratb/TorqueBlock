import { Inter, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: false,
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
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" }
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" }
      ]
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
import CheckoutStatus from "@/app/(shop)/Components/Checkout/CheckoutStatus";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
     
        
        <ToastProvider>
          {children}
          <CartSlider />
          <CheckoutStatus />
        </ToastProvider>
        {/* <FloatingWhatsApp /> */}
        <LocalBusinessSchema />

        {process.env.NEXT_PUBLIC_KWIKPASS_MID && (
          <Script
            id="kwikpass-loader"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  var production = ${JSON.stringify(process.env.NEXT_PUBLIC_KWIKPASS_ENVIRONMENT === 'production')};
                  window.merchantInfo = Object.assign({}, window.merchantInfo, { mid: ${JSON.stringify(process.env.NEXT_PUBLIC_KWIKPASS_MID)}, environment: production ? "production" : "sandbox", type: "merchantInfo", integrationType: "CUSTOM_HEADLESS" });
                  window.__KP_LOGIN_SDK_INSTANCE__ = window.__KP_LOGIN_SDK_INSTANCE__ || {};
                  window.__KP_LOGIN_SDK_INSTANCE__.logEvents = window.__KP_LOGIN_SDK_INSTANCE__.logEvents || function (event) {
                    window.kpqueue = window.kpqueue || [];
                    window.kpqueue.push(event);
                  };
                  var s = document.createElement("script");
                  s.type = "text/javascript";
                  s.defer = true;
                  s.src = production ? "https://pdp.gokwik.co/kwikpass/plugin/build/kp-custom-merchant.js" : "https://sandbox.pdp.gokwik.co/kwikpass/plugin/build/kp-custom-merchant.js";
                  s.onload = function () { window.__KP_SCRIPT_LOADED__ = true; window.dispatchEvent(new Event("kp-script-loaded")); };
                  s.onerror = s.onload;
                  document.body.appendChild(s);
                })();
              `,
            }}
          />
        )}

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
