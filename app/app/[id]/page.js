import { getApkById } from "../../../lib/apks";
import AppDetailView from "../../../components/AppDetailView";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const apk = await getApkById(id);
  
  if (!apk) {
    return { title: 'Not Found | Student-Store Defacto' };
  }

  return {
    title: `${apk.appName} | student-store defacto`,
    description: `Download ${apk.appName} from the official student-store defacto. Access premium study materials and ERP modules for Defacto Institute.`,
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const apk = await getApkById(id);

  if (!apk) {
    notFound();
  }

  return <AppDetailView apk={apk} />;
}
