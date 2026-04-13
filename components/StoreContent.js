"use client";

import { useState, useMemo } from "react";
// import Image from "next/image";
import DownloadControl from "./DownloadControl";
import AppDetailModal from "./AppDetailModal";
import PdfCard from "./PdfCard";

export default function StoreContent({ apks, pdfs }) {
  const [activeTab, setActiveTab] = useState("apps");
  const [selectedApp, setSelectedApp] = useState(null);
  const [classFilter, setClassFilter] = useState("All");

  // Get unique class levels for filter
  const classLevels = useMemo(() => {
    const levels = pdfs.map(p => p.classLevel);
    return ["All", ...new Set(levels)].sort();
  }, [pdfs]);

  const filteredPdfs = useMemo(() => {
    if (classFilter === "All") return pdfs;
    return pdfs.filter(p => p.classLevel === classFilter);
  }, [pdfs, classFilter]);

  const trendingApps = apks.length > 1 ? apks.slice(0, 5) : [];
  const discoverApps = apks;

  return (
    <div
      className="mx-auto w-full max-w-7xl px-4 pt-6 pb-20 sm:px-6 sm:pt-10"
      style={{ fontFamily: '"DM Sans", sans-serif' }}
    >
      {/* Google Font Import & Custom Scrollbar Hiding */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Premium Tab Switcher */}
      <div className="mb-10 flex items-center justify-center sm:mb-14">
        <div className="inline-flex rounded-full bg-slate-100/80 p-1.5 shadow-inner ring-1 ring-slate-200/50 backdrop-blur-md">
          <button
            onClick={() => setActiveTab("apps")}
            aria-label="View Academic Modules"
            className={`flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 sm:px-8 ${activeTab === "apps"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-900"
              }`}
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Modules
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            aria-label="View Study Notes"
            className={`flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 sm:px-8 ${activeTab === "notes"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-900"
              }`}
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Study Notes
          </button>
        </div>
      </div>

      {activeTab === "apps" ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Trending Apps (Featured Modules) */}
          {trendingApps.length > 0 && (
            <section className="mb-14 sm:mb-20">
              <div className="mb-6 flex items-center justify-between sm:mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Featured Modules</h2>
                  <p className="mt-1 text-sm font-medium text-slate-500 sm:text-base">Handpicked for your business needs</p>
                </div>
              </div>

              <div className="hide-scroll flex snap-x snap-mandatory space-x-5 overflow-x-auto pb-8 pt-4 sm:space-x-8">
                {trendingApps.map((apk) => (
                  <div
                    key={apk.id}
                    className="group w-[140px] shrink-0 snap-start cursor-pointer sm:w-[180px]"
                    onClick={() => setSelectedApp(apk)}
                  >
                    {/* App Icon Container - 3D Hover Effect */}
                    <div className="relative mb-4 aspect-square w-full rounded-[2rem] bg-gradient-to-tr from-slate-100 to-white p-[2px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] sm:rounded-[2.5rem]">
                      <div className="h-full w-full overflow-hidden rounded-[1.85rem] bg-white p-3 sm:rounded-[2.35rem] sm:p-4">
                        <img
                          src={apk.logoUrl}
                          alt={apk.appName}
                          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    {/* App Info */}
                    <div className="px-1 text-center sm:text-left">
                      <h3 className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-base">{apk.appName}</h3>
                      <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-400 sm:text-xs">Version {apk.version}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All Apps Grid */}
          <section>
            <div className="mb-6 border-b border-slate-100/80 pb-4 sm:mb-8">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">All Applications</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
              {discoverApps.map((apk) => (
                <div
                  key={apk.id}
                  className="group flex cursor-pointer items-center gap-4 rounded-[1.5rem] bg-white/60 p-4 shadow-sm ring-1 ring-slate-200/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 hover:ring-indigo-100 sm:gap-5 sm:p-5"
                  onClick={() => setSelectedApp(apk)}
                >
                  {/* Icon */}
                  <div className="relative h-16 w-16 shrink-0 rounded-[1.25rem] bg-gradient-to-tr from-slate-100 to-white p-[2px] shadow-sm ring-1 ring-black/5 sm:h-20 sm:w-20">
                    <div className="h-full w-full overflow-hidden rounded-[1.15rem] bg-white p-2">
                      <img
                        src={apk.logoUrl}
                        alt={apk.appName}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <h3 className="truncate text-base font-extrabold text-slate-900 transition-colors group-hover:text-indigo-600 sm:text-lg">
                      {apk.appName}
                    </h3>
                    <p className="mt-0.5 truncate text-[11px] font-medium text-slate-500 sm:text-xs">
                      Defacto ERP • v{apk.version}
                    </p>

                    {/* Modern Badges */}
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600 ring-1 ring-indigo-500/10">Free</span>
                      <span className="text-[10px] font-semibold text-slate-400 sm:text-[11px]">{apk.downloadCount} Downloads</span>
                    </div>
                  </div>

                  {/* Arrow Button */}
                  <div className="hidden pl-2 pr-1 sm:block">
                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 ring-1 ring-slate-200/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:ring-transparent group-hover:shadow-lg group-hover:shadow-indigo-500/30">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* Notes Tab Content */
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:mb-10">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Study Materials</h2>
              <p className="mt-1 text-sm font-medium text-slate-500 sm:text-base">Download premium notes and practice sets</p>
            </div>

            {/* Filter Dropdown - Premium UI */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-400">Class Filter:</span>
              <div className="relative">
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  aria-label="Filter notes by class level"
                  className="appearance-none cursor-pointer rounded-full border-none bg-white/80 py-2.5 pl-5 pr-10 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200/80 backdrop-blur-md transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                >
                  {classLevels.map(lvl => (
                    <option key={lvl} value={lvl} className="font-medium text-slate-700">{lvl}</option>
                  ))}
                </select>
                {/* Custom Dropdown Arrow */}
                <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-slate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {filteredPdfs.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
              {filteredPdfs.map((pdf) => (
                <PdfCard key={pdf.id} pdf={pdf} />
              ))}
            </div>
          ) : (
            /* Premium Empty State */
            <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200/60 bg-slate-50/50 py-24 text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200/50 text-5xl transition-transform hover:scale-110 duration-300">
                📚
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">No materials found for {classFilter}</h3>
              <p className="mt-2 text-sm font-medium text-slate-500">Try selecting a different class level or check back later.</p>
              <button
                onClick={() => setClassFilter("All")}
                className="mt-6 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-slate-800 hover:shadow-lg active:scale-95"
              >
                Show all notes
              </button>
            </div>
          )}
        </section>
      )}

      {/* App Detail Modal */}
      {selectedApp && (
        <AppDetailModal
          apk={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}