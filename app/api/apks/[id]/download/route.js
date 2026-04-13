import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { incrementApkDownloadCount } from "../../../../../lib/apks";

export const dynamic = "force-dynamic";

export async function POST(_request, { params }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid APK id." }, { status: 400 });
  }

  const apk = await incrementApkDownloadCount(id);

  if (!apk?.apkUrl) {
    return NextResponse.json({ error: "APK not found." }, { status: 404 });
  }

  return NextResponse.json({
    downloadUrl: apk.apkUrl,
    downloadCount: apk.downloadCount ?? 0,
  });
}
