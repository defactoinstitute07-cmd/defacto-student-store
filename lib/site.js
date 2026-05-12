export const siteConfig = {
  name: "Defacto Institute Student Store",
  shortName: "Defacto Store",
  description:
    "The official Student Store for Defacto Institute. Download Defacto ERP apps, student tools, class notes, study materials, and academic resources for Defacto Institute students.",
  url: "https://student-store.defactoinstitute.in", // Fallback if env is missing
  ogImage: "/app-icon.svg",
  keywords: [
    "Defacto Institute",
    "Student Store",
    "Defacto Institute Student Store",
    "Defacto Student Store",
    "Defacto Institute app",
    "Defacto Institute ERP",
    "Defacto Institute notes",
    "Defacto Institute study material",
    "student store",
    "student ERP app",
    "student-store defacto",
    "defacto student store",
    "student store defacto",
    "defacto app store",
    "Defacto ERP Portal",
    "Defacto Institute Notes",
    "Student Study Materials",
    "Education ERP",
    "Class 10 Notes",
    "Class 12 Notes",
    "Academic Modules",
    "Defacto App",
  ],
};

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!url) {
    return siteConfig.url;
  }

  return url.endsWith("/") ? url.slice(0, -1) : url;
}
