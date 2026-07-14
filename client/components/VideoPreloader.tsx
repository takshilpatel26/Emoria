import { useEffect } from "react";
import { getSharedVideo } from "@/lib/sharedVideoRegistry";
import { HOME_PREVIEW_VIDEO_URLS } from "@/lib/projectVideoUrls";
import { useLoader } from "@/context/LoaderContext";

const homeVideoUrls = HOME_PREVIEW_VIDEO_URLS;

function waitForInitialBuffer(video: HTMLVideoElement, minimumSeconds: number) {
  return new Promise<void>((resolve) => {
    const finish = () => {
      cleanup();
      resolve();
    };
    const checkBuffer = () => {
      if (video.buffered.length > 0 && video.buffered.end(video.buffered.length - 1) >= minimumSeconds) {
        finish();
      }
    };
    const timeoutId = window.setTimeout(finish, 20000);
    const cleanup = () => {
      window.clearTimeout(timeoutId);
      video.removeEventListener("progress", checkBuffer);
      video.removeEventListener("canplay", checkBuffer);
      video.removeEventListener("loadeddata", checkBuffer);
    };

    video.addEventListener("progress", checkBuffer);
    video.addEventListener("canplay", checkBuffer);
    video.addEventListener("loadeddata", checkBuffer);
    checkBuffer();
  });
}

export default function VideoPreloader() {
  const { setHomePreviewsReady } = useLoader();

  useEffect(() => {
    let nextIndex = 0;
    let timeoutId: number | undefined;
    let disposed = false;
    const mobilePreview = window.innerWidth < 768;

    if (!mobilePreview) {
      setHomePreviewsReady(true);
    }

    const preloadNext = () => {
      if (nextIndex >= homeVideoUrls.length) return;

      getSharedVideo(homeVideoUrls[nextIndex], { mobilePreview });
      nextIndex += 1;
      timeoutId = window.setTimeout(preloadNext, mobilePreview ? 250 : nextIndex < 3 ? 0 : 1500);
    };

    const prepareMobilePriorityPreviews = async () => {
      const priorityVideos = homeVideoUrls.slice(0, 5).map((url) =>
        getSharedVideo(url, { mobilePreview, mobileBufferSeconds: 12 })
      );
      await Promise.all(priorityVideos.map((video) => waitForInitialBuffer(video, 10)));
      if (disposed) return;

      setHomePreviewsReady(true);
      for (const url of homeVideoUrls.slice(5)) {
        getSharedVideo(url, { mobilePreview, mobileBufferSeconds: 7 });
      }
    };

    if (mobilePreview) {
      void prepareMobilePriorityPreviews();
    } else {
      preloadNext();
    }

    return () => {
      disposed = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [setHomePreviewsReady]);

  return null;
}
