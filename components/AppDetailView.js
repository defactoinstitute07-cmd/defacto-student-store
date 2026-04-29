"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DownloadControl from "./DownloadControl";

export default function AppDetailView({ apk }) {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef(null);

  if (!apk) return null;

  const handleUserScroll = () => {
    if (!isScrolled) setIsScrolled(true);
  };

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setIsScrolled(true);
  };

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % apk.screenshots.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + apk.screenshots.length) % apk.screenshots.length);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 pb-20 text-slate-900 overflow-hidden">

      {/* Ambient Background Blur Orbs for Premium Glass Effect */}
      <div className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-indigo-300/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[50vh] w-[50vw] rounded-full bg-purple-300/30 blur-[120px] pointer-events-none" />

      {/* Premium Glass Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/60 shadow-sm px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 group text-indigo-700 font-bold text-sm transition-all"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/60 shadow-sm border border-white/50 transition-all group-hover:bg-white group-hover:shadow-md">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="hidden sm:inline">Back to Hub</span>
            <span className="sm:hidden">Back</span>
          </button>



          <div className="w-20 hidden sm:block"></div>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl ">

        {/* Main Glassmorphism Container */}
        <div className="relative flex flex-col overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.08)] border border-white/60 md:flex-row">

          {/* Left Sidebar */}
          <div className="relative flex flex-col border-b border-white/40 bg-white/20 p-6 sm:p-8 md:w-[380px] lg:w-[420px] md:shrink-0 md:border-b-0 md:border-r md:p-12">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">

              {/* App Icon */}
              <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] bg-white/50 p-2 shadow-xl shadow-indigo-900/5 backdrop-blur-md border border-white/60">
                <img src={apk.logoUrl} alt={apk.appName} className="h-full w-full rounded-xl sm:rounded-2xl md:rounded-[1.75rem] object-contain bg-white" />
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col">
                <span className="mb-2 inline-flex items-center self-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-indigo-600 md:self-start bg-indigo-100/50 px-3 py-1 rounded-full border border-indigo-200/50">
                  Student Module
                </span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  {apk.appName}
                </h1>
                <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-slate-600 md:justify-start">
                  <span className="rounded-full bg-white/60 backdrop-blur-md border border-white/50 px-3 py-1 shadow-sm">
                    v{apk.version}
                  </span>

                </div>
              </div>

              <div className="mt-8 sm:mt-10 w-full">
                <DownloadControl
                  apkId={apk.id}
                  initialDownloadCount={apk.downloadCount}
                  buttonClassName="flex w-full items-center justify-center gap-2 rounded-2xl sm:rounded-full bg-indigo-600/90 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-black text-white shadow-[0_8px_20px_rgba(79,70,229,0.3)] border border-indigo-500/50 transition-all hover:bg-indigo-600 hover:shadow-[0_8px_25px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 active:scale-[0.98]"
                  label={
                    <>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </>
                  }
                />
              </div>

              <div className="mt-8 flex-1 border-t border-white/40 pt-8 w-full">
                <h3 className="text-xs sm:text-sm font-black text-slate-800 mb-4 uppercase tracking-wider">
                  Module Features
                </h3>

                <ul className="space-y-3">
                  {[

                    "Student Management System",
                    "Attendance Tracking",
                    "Fee Management & Payment Records",
                    "Class & Subject Management",
                    "Exam & Result System",

                    "Parent-Student Communication",

                    "Notice & Announcement System",
                    "Performance Analytics Dashboard"
                  ].map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm font-semibold text-slate-700 bg-white/30 backdrop-blur-sm rounded-xl p-2.5 border border-white/40"
                    >
                      <div className="bg-green-100/80 rounded-full p-1 shadow-sm">
                        <svg
                          className="h-3.5 w-3.5 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-1 flex-col p-6 sm:p-8 md:p-12">
            <div className="mb-6 sm:mb-8 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 md:text-3xl">App Preview</h2>
              {apk.screenshots?.length > 1 && (
                <div className="flex gap-2">
                  <button onClick={() => handleScroll("left")} className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/60 backdrop-blur-md text-slate-600 border border-white/60 shadow-sm transition-all hover:bg-white hover:text-indigo-600 hover:shadow-md">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button onClick={() => handleScroll("right")} className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/60 backdrop-blur-md text-slate-600 border border-white/60 shadow-sm transition-all hover:bg-white hover:text-indigo-600 hover:shadow-md">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {apk.screenshots?.length > 0 ? (
              <div
                ref={scrollContainerRef}
                onScroll={handleUserScroll}
                className="flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {apk.screenshots.map((s, idx) => (
                  <div
                    key={idx}
                    className="group relative w-[180px] sm:w-[220px] md:w-[260px] shrink-0 snap-center cursor-pointer"
                    onClick={() => openLightbox(idx)}
                  >
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-white/40 backdrop-blur-sm border border-white/60 p-1 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 group-hover:-translate-y-1.5">
                      <img src={s.url} alt={s.caption || `Screenshot ${idx + 1}`} className="h-full w-full object-cover rounded-[1.25rem] sm:rounded-[1.75rem]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[1.5rem] sm:rounded-[2rem]"></div>
                    </div>
                    {s.caption && (
                      <p className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                        {s.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center rounded-[1.5rem] sm:rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-white/60 text-slate-400 shadow-sm">
                <span className="text-3xl sm:text-4xl">📱</span>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold">No previews available</p>
              </div>
            )}

            <div className="mt-8 sm:mt-12 rounded-[1.5rem] sm:rounded-[2rem] bg-white/50 backdrop-blur-xl border border-white/60 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 sm:mb-4">
                Description
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Welcome to the official <span className="font-bold text-slate-900">student-store defacto</span>. Experience a powerful and smart ERP system designed to transform the way students, parents, and institutes connect.

                With <span className="font-bold text-yellow-600">Defacto Institute</span>’s advanced digital platform, you can easily track attendance, manage fees, access study materials, check results,
                and stay updated with real-time notifications — all in one place.

                <span className="font-semibold text-slate-900">Defacto</span> ensures transparency, better communication, and efficient academic management, making learning more organized,
                accessible, and stress-free for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Lightbox */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-2xl animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4 sm:p-8">
            <div className="rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-black tracking-widest text-white backdrop-blur-md shadow-lg">
              {selectedImageIndex + 1} / {apk.screenshots.length}
            </div>
            <button onClick={closeLightbox} className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg transition-all hover:bg-white/20 hover:scale-105">
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative flex h-[75vh] sm:h-[85vh] w-full items-center justify-center px-4">
            {apk.screenshots.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 sm:left-8 z-10 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg transition-all hover:scale-110 hover:bg-white/20">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={nextImage} className="absolute right-2 sm:right-8 z-10 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg transition-all hover:scale-110 hover:bg-white/20">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            <div className="max-h-full overflow-hidden rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl ring-1 ring-white/20">
              <img src={apk.screenshots[selectedImageIndex].url} alt="Screenshot Preview" className="h-full w-auto object-contain" onClick={(e) => e.stopPropagation()} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}