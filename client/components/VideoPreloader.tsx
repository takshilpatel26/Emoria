import { useEffect } from "react";
import { getSharedVideo } from "@/lib/sharedVideoRegistry";
import { HOME_PREVIEW_VIDEO_URLS } from "@/lib/projectVideoUrls";
import { useLoader } from "@/context/LoaderContext";

const homeVideoUrls = HOME_PREVIEW_VIDEO_URLS;

export default function VideoPreloader() {
  const { setHomePreviewsReady } = useLoader();

  useEffect(() => {
    let nextIndex = 0;
    let timeoutId: number | undefined;
    const mobilePreview = window.innerWidth < 768;

    const preloadNext = () => {
      if (nextIndex >= homeVideoUrls.length) return;

      getSharedVideo(homeVideoUrls[nextIndex], { mobilePreview });
      nextIndex += 1;
      timeoutId = window.setTimeout(preloadNext, mobilePreview ? 250 : nextIndex < 3 ? 0 : 1500);
    };

    if (mobilePreview) {
      setHomePreviewsReady(true);
    } else {
      preloadNext();
      setHomePreviewsReady(true);
    }

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [setHomePreviewsReady]);

  return null;
}
