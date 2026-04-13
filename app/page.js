import Image from "next/image";
import Script from "next/script";
import StoreContent from "../components/StoreContent";
import { getApks } from "../lib/apks";
import { getPdfs } from "../lib/pdfs";
import { getSiteUrl } from "../lib/site";

const siteUrl = getSiteUrl();

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Defacto ERP | Student Materials & Modules Store",
  url: siteUrl,
  description: "Access official Defacto ERP study materials, notes, and academic modules for students of Defacto Institute.",
  mainEntity: {
    "@type": "ItemList",
    "name": "Academic Modules & PDFs",
    "description": "A collection of software modules and PDF notes for Defacto ERP students."
  },
  publisher: {
    "@type": "Organization",
    name: "Defacto ERP",
    logo: `${siteUrl}/app-icon.svg`,
  },
};

export const dynamic = "force-dynamic";

async function loadStoreData() {
  try {
    const [apks, pdfs] = await Promise.all([getApks(), getPdfs()]);
    return { apks, pdfs, errorMessage: "" };
  } catch (error) {
    console.error("Failed to load store data:", error);
    return {
      apks: [],
      pdfs: [],
      errorMessage:
        "We could not load the live ERP modules right now. Please check the MongoDB connection and try again.",
    };
  }
}

export default async function HomePage() {
  const { apks, pdfs, errorMessage } = await loadStoreData();

  return (
    <>
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-slate-50 pb-20 font-sans" id="top">
        {/* SEO-only H1 */}
        <h1 className="sr-only">Defacto ERP Student Store - Academic Modules and Study Materials</h1>
        {/* Defacto ERP Navigation */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6 md:py-4">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
            <a className="flex items-center gap-2 font-bold" href="#top">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[linear-gradient(145deg,#0ea5e9,#2563eb)] text-white shadow-md">
                D
              </span>
              <span className="text-xl tracking-tight text-slate-900">
                Defacto ERP
              </span>
            </a>
            <nav className="hidden space-x-6 md:block">
              <span className="text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer">Dashboard</span>
              <span className="text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer">Modules</span>
              <span className="text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer">Study Notes</span>
              <span className="text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer">Support</span>
            </nav>
            {/* User Profile Icon */}
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-500 font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {errorMessage && (
          <div className="mx-auto mt-8 max-w-6xl px-4">
            <div className="rounded-xl bg-rose-50 p-4 text-sm font-medium text-rose-600">
              {errorMessage}
            </div>
          </div>
        )}

        <StoreContent apks={apks} pdfs={pdfs} />
      </main>
    </>
  );
}
