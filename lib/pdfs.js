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
  }));
}
