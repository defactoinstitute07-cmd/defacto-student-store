"use client";

import { useState, useRef } from "react";
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Hide Scrollbar completely */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Cinematic Dark/Blur Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Main Modal - Premium iOS-style Card */}
      <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-y-auto overflow-x-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-900/10 md:h-[650px] md:max-h-[85vh] md:flex-row md:overflow-hidden animate-in fade-in zoom-in-95 duration-300 ease-out">

        {/* Left Sidebar - Clean & Structured */}
        <div className="relative flex flex-col border-b border-slate-200/60 bg-[#F5F5F7] p-6 sm:p-8 md:w-[360px] md:shrink-0 md:border-b-0 md:border-r md:p-10">

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/80 text-slate-500 backdrop-blur-md transition-all hover:bg-slate-300 hover:text-slate-900 md:hidden z-10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex items-center gap-5 pr-10 md:flex-col md:items-start md:pr-0 md:gap-6">
            {/* Clean App Icon */}
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[1.25rem] bg-white p-1.5 shadow-sm ring-1 ring-slate-900/5 sm:h-28 sm:w-28 md:h-32 md:w-32 md:rounded-[1.5rem]">
              <div className="h-full w-full overflow-hidden rounded-xl bg-slate-50 md:rounded-[1.25rem]">
                <img
                  src={apk.logoUrl}
                  alt={apk.appName}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              {/* Premium Category Badge */}
              <div className="mb-2 hidden md:block">
                <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Essential Module
                </span>
              </div>
              <h2 className="truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:whitespace-normal md:leading-tight">
                {apk.appName}
              </h2>
              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
                <span className="rounded-md bg-slate-200/60 px-2 py-0.5 text-slate-700">
                  v{apk.version}
                </span>
                <span className="flex items-center gap-1">
                  4.9
                  <svg className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200/60 pt-8 md:mt-10">
            <DownloadControl
              apkId={apk.id}
              initialDownloadCount={apk.downloadCount}
              buttonClassName="
                flex w-full items-center justify-center gap-2 rounded-full 
                bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white 
                shadow-sm transition-all duration-200 
                hover:bg-indigo-700 hover:shadow active:scale-[0.98]
              "
              label={
                <>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Get App
                </>
              }
            />
          </div>

          {/* Student Centric Description in Sidebar for Desktop */}
          <div className="mt-8 hidden flex-1 md:block">
            <p className="text-sm leading-relaxed text-slate-600">
              Access your digital learning environment. Unlock exclusive study materials, instant updates, and seamless integration with your student ecosystem.
            </p>
          </div>
        </div>

        {/* Right Content - Screenshots Gallery */}
        <div className="relative flex flex-1 flex-col bg-white p-6 md:overflow-y-auto md:p-10">

          {/* Desktop Close Button */}
          <button
            onClick={onClose}
            className="absolute right-8 top-8 hidden h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 md:flex z-10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Gallery Header */}
          <div className="mb-6 flex flex-col gap-2 sm:mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Preview
              </h3>

              {/* Arrow Navigations (Desktop) */}
              {apk.screenshots && apk.screenshots.length > 1 && (
                <div className="hidden gap-2 md:flex">
                  <button
                    onClick={() => handleScroll("left")}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 ring-1 ring-slate-200 transition-all hover:bg-slate-100 hover:text-slate-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleScroll("right")}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 ring-1 ring-slate-200 transition-all hover:bg-slate-100 hover:text-slate-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {apk.screenshots && apk.screenshots.length > 0 ? (
            <div
              ref={scrollContainerRef}
              onScroll={handleUserScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pt-2 scrollbar-hide sm:gap-6"
            >
              {apk.screenshots.map((s, idx) => (
                <div
                  key={idx}
                  className="group relative w-[160px] shrink-0 snap-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 sm:w-[220px] md:w-[240px]"
                  onClick={() => openLightbox(idx)}
                >
                  {/* Clean Screenshot Frame */}
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-[#F5F5F7] ring-1 ring-slate-900/5 transition-shadow duration-300 group-hover:shadow-lg sm:rounded-[2rem]">
                    <img
                      src={s.url}
                      alt={s.caption || `Screenshot ${idx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/10" />
                  </div>

                  {s.caption && (
                    <p className="mt-4 px-1 text-center text-xs font-medium text-slate-500 transition-colors group-hover:text-slate-900">
                      {s.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-[2rem] bg-slate-50 py-16 text-center ring-1 ring-slate-900/5">
              <div className="mb-4 text-4xl text-slate-300 sm:mb-5 sm:text-5xl">📱</div>
              <p className="text-sm font-semibold text-slate-500">Previews currently unavailable</p>
            </div>
          )}

          {/* Mobile Description Footer */}
          <div className="mt-4 rounded-2xl bg-[#F5F5F7] p-5 md:hidden">
            <h3 className="mb-2 text-sm font-bold text-slate-900">
              About this app
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Access your digital learning environment. Unlock exclusive study materials, instant updates, and seamless integration with your student ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Preview - Kept Immersive but Cleaner */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between p-4 sm:p-8">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-white backdrop-blur-md">
              {selectedImageIndex + 1} / {apk.screenshots.length}
            </div>
            <button
              onClick={closeLightbox}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:h-12 sm:w-12"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image Viewer */}
          <div className="relative flex h-[75vh] w-full items-center justify-center p-4 sm:h-[80vh] sm:p-10">
            {/* Nav Arrows */}
            {apk.screenshots.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 sm:left-10 sm:h-16 sm:w-16"
                >
                  <svg className="h-6 w-6 pr-0.5 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 sm:right-10 sm:h-16 sm:w-16"
                >
                  <svg className="h-6 w-6 pl-0.5 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="relative h-full w-auto overflow-hidden rounded-[2rem] transition-transform duration-500">
              <img
                src={apk.screenshots[selectedImageIndex].url}
                alt="Screenshot Preview"
                className="h-full w-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Footer Caption */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-end pb-8 sm:pb-12">
            {apk.screenshots[selectedImageIndex].caption && (
              <p className="mb-6 max-w-sm px-6 text-center text-sm font-medium text-white sm:max-w-xl sm:text-base">
                {apk.screenshots[selectedImageIndex].caption}
              </p>
            )}

            {/* Clean Pagination Dots */}
            <div className="flex gap-2.5">
              {apk.screenshots.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === selectedImageIndex ? "w-6 bg-white" : "w-1.5 bg-white/30"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}