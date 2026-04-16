import "server-only";
import Pdf from "../models/Pdf";
import { connectToDatabase } from "./mongodb";

export async function getPdfs() {
  await connectToDatabase();

  const pdfs = await Pdf.find({})
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  return pdfs.map((pdf) => ({
    id: pdf._id.toString(),
    name: pdf.name,
    classLevel: pdf.classLevel,
    subject: pdf.subject,
    pdfUrl: pdf.pdfUrl,
    description: pdf.description || "",
    createdAt: pdf.createdAt?.toISOString?.() ?? null,
    downloadCount: pdf.downloadCount || 0,
  }));
}

export async function incrementPdfDownloadCount(id) {
  await connectToDatabase();
  const pdf = await Pdf.findByIdAndUpdate(
    id,
    { $inc: { downloadCount: 1 } },
    { new: true }
  ).lean();
  return pdf;
}
