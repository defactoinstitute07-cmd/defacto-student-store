"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

export default function DownloadControl({
  apkId,
  initialDownloadCount,
  countClassName,
  buttonClassName,
  label = "Install",
}) {
  const router = useRouter();
  const [downloadCount, setDownloadCount] = useState(initialDownloadCount);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDownload() {
    if (isLoading) {
      return;
    }

    const previousCount = downloadCount;
    setIsLoading(true);
    setDownloadCount(previousCount + 1);

    try {
      const response = await fetch(`/api/apks/${apkId}/download`, {
        method: "POST",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to prepare APK download.");
      }

      const data = await response.json();

      if (typeof data.downloadCount === "number") {
        setDownloadCount(data.downloadCount);
      }

      if (data.downloadUrl) {
        window.open(data.downloadUrl, "_blank", "noopener,noreferrer");
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
      setDownloadCount(previousCount);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <p className={countClassName}>
        {downloadCount.toLocaleString()} download{downloadCount === 1 ? "" : "s"}
      </p>
      <button
        className={buttonClassName}
        disabled={isLoading}
        onClick={handleDownload}
        type="button"
      >
        {isLoading ? "Preparing..." : label}
      </button>
    </>
  );
}
