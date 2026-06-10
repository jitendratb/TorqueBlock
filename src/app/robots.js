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
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"],
        allow: "/",
      },
      {
        userAgent: ["Googlebot", "Google-Extended"],
        allow: "/",
      },
      {
        userAgent: ["ClaudeBot", "Claude-User", "anthropic-ai"],
        allow: "/",
      },
      {
        userAgent: ["PerplexityBot", "Perplexity-User"],
        allow: "/",
      },
      {
        userAgent: ["CCBot", "Omgilibot"],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    Host: SITE_URL,
  };
}
