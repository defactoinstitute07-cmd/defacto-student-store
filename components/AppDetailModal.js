"use client";

import { useState, useRef, useEffect } from "react";
// import Image from "next/image"; 
import DownloadControl from "./DownloadControl";

export default function AppDetailModal({ apk, onClose }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef(null);

  if (!apk) return null;

  // Function to hide the "Swipe" animation once the user starts interacting
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      style={{ fontFamily: '"DM Sans", sans-serif' }}
    >
      {/* Google Font Import & Hide Scrollbar completely */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Custom floating animation for the app icon */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}} />

      {/* Cinematic Dark/Blur Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-2xl transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Main Modal - Premium Glassmorphism with Glowing Border */}
      <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-y-auto overflow-x-hidden rounded-[1.5rem] bg-white/95 shadow-[0_0_100px_-20px_rgba(139,92,246,0.4)] ring-1 ring-white/60 md:h-[650px] md:max-h-[85vh] md:flex-row md:overflow-hidden animate-in fade-in zoom-in-95 duration-500 ease-out">

        {/* Left Sidebar - Vibrant Student-Focused Theme */}
        <div className="relative flex flex-col border-b border-slate-100/50 bg-gradient-to-b from-violet-50/80 via-white to-white p-6 sm:p-8 md:w-[340px] md:shrink-0 md:border-b-0 md:border-r md:border-slate-100 md:p-10">

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-400 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-md transition-all hover:scale-110 hover:bg-slate-100 hover:text-slate-900 md:hidden z-10"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-5 pr-10 md:flex-col md:items-start md:pr-0 md:gap-6">
            {/* Super Cool Floating App Icon with Neon Glow */}
            <div className="animate-float relative h-20 w-20 shrink-0 rounded-[1.5rem] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 p-[3px] shadow-[0_0_30px_rgba(167,139,250,0.5)] sm:h-24 sm:w-24 md:h-32 md:w-32 md:rounded-[2rem]">
              <div className="h-full w-full overflow-hidden rounded-[1.3rem] bg-white p-2 md:rounded-[1.8rem] md:p-3">
                <img
                  src={apk.logoUrl}
                  alt={apk.appName}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              {/* Eye-catching "Must Have" badge */}
              <div className="mb-2 hidden md:block">
                <span className="inline-flex animate-pulse items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-amber-600 ring-1 ring-amber-500/20">
                  <span>🔥</span> Essential Module
                </span>
              </div>
              <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:whitespace-normal md:leading-tight">
                {apk.appName}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-700">
                  v{apk.version}
                </span>
                <span className="font-bold text-slate-400 text-xs flex items-center gap-1">
                  ⭐ 4.9/5
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <DownloadControl
              apkId={apk.id}
              initialDownloadCount={apk.downloadCount}
              buttonClassName="
    group relative overflow-hidden rounded-2xl py-4.5 px-8 w-full 
    bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-700 
    text-black font-black tracking-widest text-xs 
    transition-all duration-300 
    hover:scale-[1.04] active:scale-95 
    shadow-lg shadow-amber-500/30
    "

              label={
                <div className="relative z-10 flex items-center justify-center gap-3">

                  INSTALL NOW

                  {/* Icon */}
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>

                  {/* Moving Triangle */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/2 -left-10 -translate-y-1/2 
          animate-triangleMove">

                      <div className="w-0 h-0 
            border-t-[10px] border-t-transparent
            border-b-[10px] border-b-transparent
            border-l-[16px] border-l-white/70
            blur-[1px]"></div>

                    </div>
                  </div>

                </div>
              }
            />
          </div>

          {/* Student Centric Description in Sidebar for Desktop */}
          <div className="mt-8 hidden flex-1 rounded-2xl bg-slate-50/80 p-5 ring-1 ring-slate-100 md:block">
            <h4 className="text-xs font-black uppercase tracking-widest text-violet-600 mb-2">Why you need this</h4>
            <p className="text-sm font-medium leading-relaxed text-slate-600">
              Unlock exclusive study materials, instant updates, and seamless integration with the Defacto ecosystem. Designed specifically for top-tier students.
            </p>
          </div>
        </div>

        {/* Right Content - Screenshots (The "Look at Me" Section) */}
        <div className="relative flex flex-1 flex-col bg-white p-6 md:overflow-y-auto md:p-10">

          {/* Desktop Close Button */}
          <button
            onClick={onClose}
            className="absolute right-8 top-8 hidden h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-slate-400 ring-1 ring-slate-200 transition-all hover:scale-110 hover:bg-slate-100 hover:text-slate-900 md:flex z-10"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Irresistible Screenshot Header */}
          <div className="mb-5 flex flex-col gap-2 sm:mb-6 md:mt-2">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
                Swipe to explore features
              </h3>

              {/* Arrow Navigations (Desktop) */}
              {apk.screenshots && apk.screenshots.length > 1 && (
                <div className="hidden gap-2 md:flex">
                  <button
                    onClick={() => handleScroll("left")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 ring-1 ring-slate-200 transition-all hover:scale-110 hover:bg-violet-50 hover:text-violet-600 hover:ring-violet-200"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleScroll("right")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 ring-1 ring-slate-200 transition-all hover:scale-110 hover:bg-violet-50 hover:text-violet-600 hover:ring-violet-200"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Animated hint to ensure they know to scroll */}
            {!isScrolled && apk.screenshots?.length > 1 && (
              <div className="flex items-center gap-1.5 text-violet-500 animate-pulse">
                <span className="text-xs font-bold uppercase tracking-widest">Swipe to explore features</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            )}
          </div>

          {apk.screenshots && apk.screenshots.length > 0 ? (
            <div
              ref={scrollContainerRef}
              onScroll={handleUserScroll}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pt-2 scrollbar-hide sm:gap-6"
            >
              {apk.screenshots.map((s, idx) => (
                <div
                  key={idx}
                  className="group relative w-[160px] shrink-0 snap-start cursor-pointer transition-all duration-500 hover:-translate-y-2 sm:w-[220px] md:w-[260px]"
                  onClick={() => openLightbox(idx)}
                >
                  {/* Glowing Screenshot Frame */}
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-slate-100 p-1 ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-pink-500 group-hover:shadow-[0_20px_40px_rgba(139,92,246,0.3)] group-hover:ring-transparent sm:rounded-[2rem]">
                    <div className="h-full w-full overflow-hidden rounded-[1.25rem] bg-white sm:rounded-[1.75rem]">
                      <img
                        src={s.url}
                        alt={s.caption || `Screenshot ${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* "Tap to Preview" Overlay - Always visible at bottom, expands on hover */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-4 pt-16 opacity-90 transition-opacity duration-300 group-hover:opacity-100 rounded-b-[1.5rem] sm:rounded-b-[2rem]">
                      <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-white/30">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-wider text-white sm:text-xs">Tap to view</span>
                      </div>
                    </div>
                  </div>

                  {s.caption && (
                    <p className="mt-4 px-2 text-center text-xs font-black text-slate-600 transition-colors group-hover:text-violet-600 sm:text-sm">
                      {s.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-violet-200 bg-violet-50/50 py-16 text-center">
              <div className="mb-4 text-5xl opacity-40 drop-shadow-md sm:mb-5 sm:text-6xl">🚀</div>
              <p className="text-base font-bold text-violet-600 sm:text-lg">Exciting preview coming soon!</p>
            </div>
          )}

          <div className="mt-6 rounded-[1.5rem] 
bg-gradient-to-br from-black via-zinc-900 to-black 
p-6 border border-yellow-500/20 
shadow-[0_0_30px_rgba(255,215,0,0.08)] 
backdrop-blur-xl md:hidden">

            <h3 className="mb-3 text-sm font-black uppercase tracking-widest text-yellow-400">
              Smart Learning Starts Here
            </h3>

            <p className="text-sm font-medium leading-relaxed text-gray-300">
              At <span className="font-bold text-white">Defacto Institute</span>, learning goes beyond the classroom.
              With our dedicated <span className="font-bold text-yellow-400">ERP system</span>, students get instant access
              to notes, class updates, announcements, and everything they need — all in one place.
              It’s a smarter, faster, and more connected way to stay ahead, making Defacto not just an institute,
              but a complete digital learning experience.
            </p>

          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Preview - Cinematic & Immersive */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-3xl animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4 sm:p-8">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md ring-1 ring-white/20">
              <span className="text-sm font-black tracking-widest text-white">
                {selectedImageIndex + 1} <span className="text-white/40">/ {apk.screenshots.length}</span>
              </span>
            </div>
            <button
              onClick={closeLightbox}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md ring-1 ring-white/20 transition-all hover:scale-110 hover:bg-red-500 hover:ring-red-400 sm:h-12 sm:w-12"
            >
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image Viewer */}
          <div className="relative flex h-[75vh] w-full items-center justify-center p-2 sm:h-[80vh] sm:p-10">
            {/* Massive Nav Arrows for easy tapping */}
            {apk.screenshots.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white shadow-2xl backdrop-blur-md ring-1 ring-white/20 transition-all hover:scale-110 hover:bg-white/20 sm:left-10 sm:h-20 sm:w-20"
                >
                  <svg className="h-8 w-8 pr-1 sm:h-10 sm:w-10 sm:pr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white shadow-2xl backdrop-blur-md ring-1 ring-white/20 transition-all hover:scale-110 hover:bg-white/20 sm:right-10 sm:h-20 sm:w-20"
                >
                  <svg className="h-8 w-8 pl-1 sm:h-10 sm:w-10 sm:pl-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="relative h-full w-auto overflow-hidden rounded-[2rem] shadow-[0_0_150px_rgba(167,139,250,0.15)] ring-1 ring-white/20 transition-transform duration-500 sm:rounded-[2.5rem]">
              <img
                src={apk.screenshots[selectedImageIndex].url}
                alt="Screenshot Preview"
                className="h-full w-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Footer Caption */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-end bg-gradient-to-t from-black via-black/80 to-transparent pb-8 pt-24 sm:pb-12">
            {apk.screenshots[selectedImageIndex].caption && (
              <p className="mb-6 max-w-sm px-6 text-center text-base font-black text-white sm:max-w-3xl sm:text-2xl">
                {apk.screenshots[selectedImageIndex].caption}
              </p>
            )}

            {/* Pagination Dots */}
            <div className="flex gap-3 rounded-full bg-white/10 px-5 py-2.5 backdrop-blur-md ring-1 ring-white/20">
              {apk.screenshots.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-500 ${i === selectedImageIndex ? 'w-10 bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.8)]' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}