import "server-only";
import Apk from "../models/Apk";
import { connectToDatabase } from "./mongodb";

export async function getApks() {
  await connectToDatabase();

  const apks = await Apk.find({})
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  return apks.map((apk) => ({
    id: apk._id.toString(),
    appName: apk.appName,
    version: apk.version,
    logoUrl: apk.logoUrl,
    apkUrl: apk.apkUrl,
    downloadCount: apk.downloadCount ?? 0,
    screenshots: (apk.screenshots || []).map((s) => ({
      url: s.url,
      caption: s.caption || "",
      cloudinaryId: s.cloudinaryId || null,
    })),
    createdAt: apk.createdAt?.toISOString?.() ?? null,
  }));
}

export async function incrementApkDownloadCount(id) {
  await connectToDatabase();

  const apk = await Apk.findByIdAndUpdate(
    id,
    { $inc: { downloadCount: 1 } },
    {
      returnDocument: "after",
      lean: true,
      select: "apkUrl downloadCount appName version",
    }
  ).exec();

  return apk;
}
export async function getApkById(id) {
  await connectToDatabase();

  const apk = await Apk.findById(id).lean().exec();

  if (!apk) return null;

  return {
    id: apk._id.toString(),
    appName: apk.appName,
    version: apk.version,
    logoUrl: apk.logoUrl,
    apkUrl: apk.apkUrl,
    downloadCount: apk.downloadCount ?? 0,
    screenshots: (apk.screenshots || []).map((s) => ({
      url: s.url,
      caption: s.caption || "",
      cloudinaryId: s.cloudinaryId || null,
    })),
    createdAt: apk.createdAt?.toISOString?.() ?? null,
  };
}
