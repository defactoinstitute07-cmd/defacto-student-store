import { getApks } from "../lib/apks";
import { getSiteUrl } from "../lib/site";

export default async function sitemap() {
  const siteUrl = getSiteUrl();
  let apks = [];

  try {
    apks = await getApks();
  } catch (error) {
    apks = [];
  }

  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const appRoutes = apks.map((apk) => ({
    url: `${siteUrl}/app/${apk.id}`,
    lastModified: apk.createdAt ? new Date(apk.createdAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...appRoutes];
}
