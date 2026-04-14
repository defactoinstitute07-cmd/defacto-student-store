import { getApkById } from "../../../lib/apks";
import AppDetailView from "../../../components/AppDetailView";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;
  const apk = await getApkById(id);

  if (!apk) {
    notFound();
  }

  return <AppDetailView apk={apk} />;
}
