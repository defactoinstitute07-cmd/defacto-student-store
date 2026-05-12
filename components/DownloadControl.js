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

  function startDownload(downloadUrl) {
    const url = new URL(downloadUrl, window.location.href);
    const link = document.createElement("a");

    link.href = url.href;
    if (url.origin === window.location.origin) {
      link.download = url.pathname.split("/").pop() || "app.apk";
    } else {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

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
        startDownload(data.downloadUrl);
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
