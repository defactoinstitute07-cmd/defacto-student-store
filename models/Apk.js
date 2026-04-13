import mongoose from "mongoose";

const apkSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      required: true,
      trim: true,
    },
    version: {
      type: String,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    apkUrl: {
      type: String,
      required: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    cloudinaryLogoId: {
      type: String,
    },
    cloudinaryApkId: {
      type: String,
    },
    screenshots: [
      {
        url: String,
        cloudinaryId: String,
        caption: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Apk || mongoose.model("Apk", apkSchema);
