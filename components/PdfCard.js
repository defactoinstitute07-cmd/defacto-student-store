"use client";

import { useState } from "react";

export default function PdfCard({ pdf }) {
  const [downloadCount, setDownloadCount] = useState(pdf.downloadCount || 0);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white p-5 border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 hover:border-blue-200">
  
  {/* Top Section: Icon & Badge */}
  <div className="flex items-start justify-between">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-50 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-blue-200">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
      {pdf.classLevel}
    </span>
  </div>
  
  {/* Middle Section: Title & Details */}
  <div className="mt-5 flex-1">
    <h3 className="line-clamp-1 text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
      {pdf.name}
    </h3>
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-500">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
      {pdf.subject || "General"} Material
    </p>
    {pdf.description && (
      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
        {pdf.description}
      </p>
    )}
  </div>

  {/* Bottom Section: Meta & Action */}
  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {pdf.createdAt ? new Date(pdf.createdAt).toLocaleDateString() : "Live"}
      <span className="mx-0.5">•</span>
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {downloadCount}
    </div>
    
    <button
      onClick={async () => {
        try {
          const res = await fetch(`/api/pdfs/${pdf.id}/download`, { method: "POST" });
          const data = await res.json();
          if (data.downloadUrl) {
            if (data.downloadCount !== undefined) {
              setDownloadCount(data.downloadCount);
            } else {
              setDownloadCount(prev => prev + 1);
            }
            window.open(data.downloadUrl, "_blank");
          }
        } catch (e) {
          alert("Failed to download PDF.");
        }
      }}
      aria-label={`View PDF for ${pdf.name}`}
      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
    >
      View PDF
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </button>
  </div>
</div>
  );


  
}
