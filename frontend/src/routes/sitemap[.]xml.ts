import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

// Fetch course ids from the API at request time; fall back to none on error so
// the sitemap always renders.
async function fetchCourseIds(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/courses?limit=100`);
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data?.courses ?? []).map((c: { id: string }) => c.id);
  } catch {
    return [];
  }
}

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const courseIds = await fetchCourseIds();
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/courses", changefreq: "weekly", priority: "0.9" },
          { path: "/login", changefreq: "monthly", priority: "0.3" },
          { path: "/signup", changefreq: "monthly", priority: "0.3" },
          ...courseIds.map((id) => ({
            path: `/courses/${id}`,
            changefreq: "weekly" as const,
            priority: "0.8",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
