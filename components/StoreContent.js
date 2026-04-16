"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import DownloadControl from "./DownloadControl";
import PdfCard from "./PdfCard";

export default function StoreContent({ apks, pdfs }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("apps");
  const [classFilter, setClassFilter] = useState("All");

  // Get unique class levels for filter
  const classLevels = useMemo(() => {
    const levels = pdfs?.map((p) => p.classLevel) || [];
    return ["All", ...new Set(levels)].sort();
  }, [pdfs]);

  const filteredPdfs = useMemo(() => {
    if (classFilter === "All") return pdfs;
    return pdfs?.filter((p) => p.classLevel === classFilter);
  }, [pdfs, classFilter]);

  const trendingApps = apks?.length > 1 ? apks.slice(0, 5) : [];
  const discoverApps = apks || [];

  // Format today's date for a premium OS feel
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="min-h-screen w-full bg-[#F5F5F7] pb-24 text-slate-900 overflow-x-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        {/* Header Title with Date */}
        <header className="mb-8 sm:mb-10">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
            {today}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Student Hub
          </h1>
        </header>

        {/* Premium Segmented Control (Tabs) */}
        <div className="mb-10 flex w-full overflow-x-auto hide-scroll sm:w-auto sm:inline-flex rounded-2xl bg-slate-200/60 p-1 backdrop-blur-md">
          <button
            onClick={() => setActiveTab("apps")}
            className={`flex-1 sm:flex-none whitespace-nowrap rounded-xl px-6 sm:px-8 py-2.5 text-sm font-semibold transition-all duration-300 ${activeTab === "apps"
              ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-900/5"
              : "text-slate-500 hover:text-slate-800"
              }`}
          >
            Apps & Tools
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex-1 sm:flex-none whitespace-nowrap rounded-xl px-6 sm:px-8 py-2.5 text-sm font-semibold transition-all duration-300 ${activeTab === "notes"
              ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-900/5"
              : "text-slate-500 hover:text-slate-800"
              }`}
          >
            Study Library
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 sm:flex-none whitespace-nowrap rounded-xl px-6 sm:px-8 py-2.5 text-sm font-semibold transition-all duration-300 ${activeTab === "about"
              ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-900/5"
              : "text-slate-500 hover:text-slate-800"
              }`}
          >
            About Defacto
          </button>
        </div>

        {activeTab === "apps" ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Featured Apps (Editors' Choice Style) */}
            {trendingApps.length > 0 && (
              <section className="mb-14 border-b border-slate-200/60 pb-12">
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      Editors' Choice
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Must-have tools for this semester
                    </p>
                  </div>
                  <button className="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
                    See All
                  </button>
                </div>

                <div className="hide-scroll -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 sm:mx-0 sm:gap-6 sm:px-0">
                  {trendingApps.map((apk) => (
                    <div
                      key={apk.id}
                      className="group relative flex w-[300px] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] sm:w-[340px]"
                      onClick={() => router.push(`/app/${apk.id}`)}
                    >
                      {/* Premium Soft Gradient Banner */}
                      <div className="absolute left-0 top-0 h-28 w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-white opacity-80"></div>

                      <div className="relative z-10 flex gap-5">
                        {/* App Icon */}
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[1.25rem] bg-white p-2 shadow-sm ring-1 ring-slate-900/5">
                          <img
                            src={apk.logoUrl}
                            alt={apk.appName}
                            className="h-full w-full rounded-xl object-contain"
                          />
                        </div>
                        {/* Info */}
                        <div className="flex flex-col justify-center">
                          <h3 className="line-clamp-2 text-lg font-bold leading-tight text-slate-900">
                            {apk.appName}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-indigo-500">
                            Education
                          </p>
                          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                            <span className="flex items-center text-slate-700">
                              4.8
                              <svg className="ml-1 h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </span>
                            <span>•</span>
                            <span>Editors' Choice</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* All Apps List */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Essential Apps
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                {discoverApps.map((apk, index) => (
                  <div
                    key={apk.id}
                    className="group flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md active:scale-[0.98]"
                    onClick={() => router.push(`/app/${apk.id}`)}
                  >
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="flex h-6 w-4 items-center justify-center text-sm font-bold text-slate-400">
                        {index + 1}
                      </div>
                      {/* Icon */}
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[1rem] border border-slate-100 bg-white p-1">
                        <img
                          src={apk.logoUrl}
                          alt={apk.appName}
                          className="h-full w-full rounded-lg object-contain"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col justify-center overflow-hidden">
                        <h3 className="truncate text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {apk.appName}
                        </h3>
                        <p className="truncate text-xs font-medium text-slate-500">
                          {apk.category || "Study Tool"}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">

                          <span>•</span>
                          <span>{apk.downloadCount || "100"} Downloads</span>
                        </div>
                      </div>
                    </div>

                    {/* App Store "Get" Button */}
                    <button className="shrink-0 rounded-full bg-indigo-50 px-5 py-1.5 text-sm font-bold text-indigo-600 transition-colors hover:bg-indigo-100">
                      GET
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : activeTab === "notes" ? (
          /* Notes Tab Content */
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Course Materials
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Textbooks, lecture notes, and practice papers
                </p>
              </div>

              {/* Minimalist Filter */}
              <div className="relative group">
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="appearance-none cursor-pointer rounded-full bg-white py-2.5 pl-5 pr-12 text-sm font-bold text-indigo-600 shadow-sm ring-1 ring-slate-900/5 transition-all hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {classLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl === "All" ? "All Grades" : lvl}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 items-center text-indigo-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {filteredPdfs?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
  {filteredPdfs.map((pdf) => (
    <div
      key={pdf.id}
      className="transition-transform duration-300 hover:-translate-y-1"
    >
      <PdfCard pdf={pdf} />
    </div>
  ))}
</div>
            ) : (
              /* Clean App Store Empty State */
              <div className="mt-16 flex flex-col items-center justify-center rounded-3xl bg-white py-20 shadow-sm ring-1 ring-slate-900/5 text-center px-4">
                <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">No materials found</h3>
                <p className="mt-2 text-sm text-slate-500 max-w-sm">
                  We couldn't find any documents matching this specific grade level. Try adjusting your filters.
                </p>
                <button
                  onClick={() => setClassFilter("All")}
                  className="mt-8 rounded-full bg-indigo-600 px-8 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>
        ) : (
          /* About Tab Content */
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5">
              {/* Premium Hero Banner */}
              <div className="relative h-48 sm:h-64 w-full bg-[#0B1220] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-yellow-400 text-[10px] font-black uppercase tracking-[0.2em] text-black mb-4">
                    Est. 2013
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    Defacto Institute
                  </h2>
                  <p className="mt-2 text-indigo-200 text-sm sm:text-base font-medium">Empowering Students in Bhaniyawala</p>
                </div>
              </div>

              <div className="p-6 sm:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Left Column: Mission */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Our Vision</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Defacto Institute is more than just a coaching center; it's a hub for academic excellence.
                      Since 2013, we have been dedicated to providing high-quality, concept-based education
                      to students in Dehradun, focusing on deep understanding rather than rote learning.
                    </p>
                    <div className="space-y-4">
                      {[
                        { title: "Personalized Mentorship", icon: "👤" },
                        { title: "Concept-Based Learning", icon: "💡" },
                        { title: "Academic Excellence", icon: "🏆" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 transition-colors hover:bg-indigo-50/50">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="font-semibold text-slate-700">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key Details */}
                  <div className="bg-slate-50/50 rounded-[2rem] p-6 sm:p-8 ring-1 ring-slate-900/5">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      Expert Leadership
                    </h3>
                    <div className="flex items-start gap-4 mb-8">
                      <div className="h-14 w-14 shrink-0 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                        GN
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Mr. Gopal Negi</h4>
                        <p className="text-sm text-slate-500">Founder & Academic Head</p>
                        <p className="mt-1 text-xs font-semibold text-indigo-600 uppercase tracking-wider">Math & Science Specialist</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-4">Core Focus</h3>
                    <ul className="space-y-3">
                      {[
                        "CBSE, UK Board & ICSE Curriculum",
                        "Comprehensive Learning (Class 4–8)",
                        "Science Stream Specialization (Class 9–12)",
                        "Live & Recorded Online Classes",
                        "Smartboard Interactive Teaching",
                        "Highly Experienced Faculty",
                        "Fully Air-Conditioned Environment"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                          <svg className="h-5 w-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Section: Location & Contact */}
                <div className="mt-12 pt-12 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                        <p className="text-sm font-bold text-slate-700">Bhaniyawala, Dehradun, Uttarakhand</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="tel:+918191930475"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Now
                      </a>
                      <a
                        href="https://wa.me/+918191930475"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-[0.98]"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.658 1.43 5.632 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}