import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { incrementPdfDownloadCount } from "../../../../../lib/pdfs";

export const dynamic = "force-dynamic";

export async function POST(_request, { params }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid PDF id." }, { status: 400 });
  }

  const pdf = await incrementPdfDownloadCount(id);

  if (!pdf?.pdfUrl) {
    return NextResponse.json({ error: "PDF not found." }, { status: 404 });
  }

  return NextResponse.json({
    downloadUrl: pdf.pdfUrl,
    downloadCount: pdf.downloadCount ?? 0,
  });
}
