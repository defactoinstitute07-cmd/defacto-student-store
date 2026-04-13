"use client";

export default function PdfCard({ pdf }) {
  return (
    <div className="group relative flex flex-col rounded-2xl bg-white p-5 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 border border-slate-100" style={{ fontFamily: '"DM Sans", sans-serif' }}>
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {pdf.classLevel}
        </span>
      </div>
      
      <div className="mt-4">
        <h3 className="line-clamp-1 text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {pdf.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-slate-500">
          {pdf.subject || "General"} • PDF Material
        </p>
        {pdf.description && (
          <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-slate-400 font-medium">
            {pdf.description}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
        <span className="text-[10px] text-slate-400">
          Sync: {pdf.createdAt ? new Date(pdf.createdAt).toLocaleDateString() : "Live"}
        </span>
        <a
          href={pdf.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View PDF for ${pdf.name}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
        >
          View PDF
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
