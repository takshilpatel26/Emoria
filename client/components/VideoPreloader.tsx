import { useEffect } from "react";
import { getSharedVideo } from "@/lib/sharedVideoRegistry";
import { PROJECT_VIDEO_URLS } from "@/lib/projectVideoUrls";

const homeVideoUrls = PROJECT_VIDEO_URLS;

export default function VideoPreloader() {
  useEffect(() => {
    let nextIndex = 0;
    let timeoutId: number | undefined;

    const preloadNext = () => {
      if (nextIndex >= homeVideoUrls.length) return;

      getSharedVideo(homeVideoUrls[nextIndex]);
      nextIndex += 1;
      timeoutId = window.setTimeout(preloadNext, nextIndex < 3 ? 0 : 1500);
    };

    preloadNext();

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
