import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/serve", "/fund", "/prayer"],
        disallow: ["/admin", "/dashboard", "/journal", "/api/"],
      },
    ],
    sitemap: "https://kingdom.jeffhogg.com/sitemap.xml",
  };
}
