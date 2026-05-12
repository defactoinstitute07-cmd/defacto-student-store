import Script from "next/script";
import { getApkById } from "../../../lib/apks";
import AppDetailView from "../../../components/AppDetailView";
import { notFound } from "next/navigation";
import { getSiteUrl, siteConfig } from "../../../lib/site";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const apk = await getApkById(id);
  const siteUrl = getSiteUrl();
  
  if (!apk) {
    return { title: "Not Found | Defacto Institute Student Store" };
  }

  return {
    title: {
      absolute: `${apk.appName} Download | Defacto Institute Student Store`,
    },
    description: `Download ${apk.appName} from the official Defacto Institute Student Store. Access Defacto ERP tools, student apps, study materials, and academic resources.`,
    keywords: [
      ...siteConfig.keywords,
      apk.appName,
      `${apk.appName} download`,
      `${apk.appName} APK`,
      "Defacto Institute app download",
      "Student Store APK",
    ],
    alternates: {
      canonical: `/app/${apk.id}`,
    },
    openGraph: {
      title: `${apk.appName} | Defacto Institute Student Store`,
      description: `Download ${apk.appName} from the official Student Store for Defacto Institute students.`,
      url: `${siteUrl}/app/${apk.id}`,
      type: "website",
      images: [
        {
          url: apk.logoUrl || siteConfig.ogImage,
          width: 512,
          height: 512,
          alt: `${apk.appName} app icon`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${apk.appName} | Defacto Institute Student Store`,
      description: `Download ${apk.appName} from the official Defacto Institute Student Store.`,
      images: [apk.logoUrl || siteConfig.ogImage],
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const apk = await getApkById(id);
  const siteUrl = getSiteUrl();

  if (!apk) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: apk.appName,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android",
    softwareVersion: apk.version,
    image: apk.logoUrl || `${siteUrl}${siteConfig.ogImage}`,
    downloadUrl: apk.apkUrl?.startsWith("http")
      ? apk.apkUrl
      : `${siteUrl}${apk.apkUrl || ""}`,
    url: `${siteUrl}/app/${apk.id}`,
    publisher: {
      "@type": "Organization",
      name: "Defacto Institute",
      url: "https://www.defactoinstitute.in/",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <Script
        id={`app-structured-data-${apk.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AppDetailView apk={apk} />
    </>
  );
}
