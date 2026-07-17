const SITE_URL = "https://www.torqueblock.com";
const isProduction = true;

export default function robots() {

  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/login/",
          "/account/",
          "/profile/",
          "/checkout/",
          "/search/",
        ],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Omgilibot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
