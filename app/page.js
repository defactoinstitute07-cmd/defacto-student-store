import Script from "next/script";
import StoreContent from "../components/StoreContent";
import { getApks } from "../lib/apks";
import { getPdfs } from "../lib/pdfs";
import { getSiteUrl, siteConfig } from "../lib/site";

const siteUrl = getSiteUrl();

export const metadata = {
  title: {
    absolute: "Defacto Institute Student Store | Apps, Notes & ERP",
  },
  description:
    "Visit the official Defacto Institute Student Store to download student ERP apps, study tools, class notes, PDFs, and academic resources for Defacto students.",
  keywords: [
    ...siteConfig.keywords,
    "Defacto Institute Student Store download",
    "Defacto student app download",
    "Defacto Institute Bhaniyawala",
    "Defacto Institute academic resources",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Defacto Institute Student Store",
    description:
      "Download Defacto Institute student apps, ERP modules, study notes, and academic resources from the official Student Store.",
    url: siteUrl,
    type: "website",
  },
};

export const dynamic = "force-dynamic";

function createStructuredData(apks, pdfs) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Defacto Institute",
        url: "https://www.defactoinstitute.in/",
        logo: `${siteUrl}${siteConfig.ogImage}`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Defacto Institute Student Store",
        alternateName: ["Student Store", "Defacto Student Store"],
        url: siteUrl,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/#student-store`,
        name: "Defacto Institute Student Store",
        description:
          "Official Student Store for Defacto Institute apps, ERP modules, class notes, PDFs, and study materials.",
        url: siteUrl,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#organization`,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [
            ...(apks || []).map((apk, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteUrl}/app/${apk.id}`,
              name: apk.appName,
            })),
            ...(pdfs || []).slice(0, 10).map((pdf, index) => ({
              "@type": "ListItem",
              position: (apks?.length || 0) + index + 1,
              name: pdf.name,
            })),
          ],
        },
      },
    ],
  };
}

async function loadStoreData() {
  try {
    const [apks, pdfs] = await Promise.all([getApks(), getPdfs()]);
    return { apks, pdfs, errorMessage: "" };
  } catch (error) {
    return {
      apks: [],
      pdfs: [],
      errorMessage:
        "We could not load the live ERP modules right now. Please try again.",
    };
  }
}

export default async function HomePage() {
  const { apks, pdfs, errorMessage } = await loadStoreData();
  const structuredData = createStructuredData(apks, pdfs);

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-yellow-50 text-slate-900">
        <h1 className="sr-only">
          Defacto Institute Student Store - Apps, Notes, ERP Modules, and Study Materials
        </h1>

        <header className="sticky top-0 z-50 bg-[#0B1220] border-b border-white/10 px-4 py-3">

          <div className="mx-auto flex max-w-7xl items-center justify-between">

            {/* Left - Logo + Text */}
            <div className="flex items-center gap-3">

              <div className="h-10 w-10 ">

                <img
                  src="https://res.cloudinary.com/dmswb6fya/image/upload/v1775799826/teacher_profiles/gxiptwcbpk2aaclrufol.png"   // 👉 yaha apni image ka path daal
                  alt="Defacto Logo"
                  className="h-full w-full object-cover rounded-xl bg-black"
                />

              </div>

              {/* Text */}
              <div className="leading-tight">
                <span className="text-yellow-400 font-bold text-lg block">
                  Defacto
                </span>
                <p className="text-xs text-gray-400">
                  Institute | BHANIYAWALA
                </p>
              </div>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">

              {/* Enquire Button as Link (Open in New Tab) */}
              <a
                href="https://www.defactoinstitute.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full 
  bg-yellow-400 text-black text-sm font-semibold 
  shadow hover:scale-105 transition inline-block text-center"
              >
                Visit Our Website
              </a>


            </div>

          </div>

        </header>

        {/* ⚠️ ERROR BANNER */}
        {errorMessage && (
          <div className="mx-auto mt-6 max-w-7xl px-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-red-200">
              <div className="h-10 w-10 flex items-center justify-center bg-red-100 rounded-full">
                ⚠️
              </div>
              <div>
                <h3 className="text-sm font-bold">Connection Error</h3>
                <p className="text-sm text-gray-500">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}



        {/* 📦 STORE CONTENT */}
        <StoreContent apks={apks} pdfs={pdfs} />

        {/* 🦶 FOOTER */}
        <footer className="mt-16 text-center py-6 text-gray-500">
          Developed by{" "}
          <span className="text-black font-semibold">
            Rishabh Bisht
          </span>
        </footer>

      </main>
    </>
  );
}
