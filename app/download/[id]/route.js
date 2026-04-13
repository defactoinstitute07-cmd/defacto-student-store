import mongoose from "mongoose";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { incrementApkDownloadCount } from "../../../lib/apks";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  const apk = await incrementApkDownloadCount(id);

  if (!apk?.apkUrl) {
    notFound();
  }

  return NextResponse.redirect(apk.apkUrl);
}
