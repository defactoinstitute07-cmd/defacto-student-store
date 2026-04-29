export const siteConfig = {
  name: "Student-Store Defacto",
  shortName: "Defacto Store",
  description:
    "The official student-store defacto portal. Access premium study materials, notes, and specialized education modules designed for Defacto Institute students.",
  url: "https://student-store.defactoinstitute.in", // Fallback if env is missing
  ogImage: "/app-icon.svg",
  keywords: [
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
    return "http://localhost:3000";
  }

  return url.endsWith("/") ? url.slice(0, -1) : url;
}
