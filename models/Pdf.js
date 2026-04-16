import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    classLevel: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    pdfUrl: {
      type: String,
      required: true,
    },
    cloudinaryPdfId: {
      type: String,
    },
    // Kept as optional for compatibility with existing student store logic if needed
    description: {
      type: String,
      trim: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// We export it as 'Pdf' so Mongoose looks at the 'pdfs' collection by default
export default mongoose.models.Pdf || mongoose.model("Pdf", pdfSchema);
