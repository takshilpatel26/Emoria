import { useEffect, useRef } from "react";
import { getSharedVideo } from "@/lib/sharedVideoRegistry";
import { HOME_PREVIEW_VIDEO_URLS } from "@/lib/projectVideoUrls";

const homeVideoUrls = HOME_PREVIEW_VIDEO_URLS;

export default function VideoPreloader() {
  const stagingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let nextIndex = 0;
    let timeoutId: number | undefined;

    const preloadNext = () => {
      if (nextIndex >= homeVideoUrls.length) return;

      const video = getSharedVideo(homeVideoUrls[nextIndex]);
      video.muted = true;
      video.preload = "auto";
      video.playsInline = true;
      stagingRef.current?.appendChild(video);
      nextIndex += 1;
      timeoutId = window.setTimeout(preloadNext, nextIndex < 3 ? 0 : 1500);
    };

    preloadNext();

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={stagingRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        width: 1,
        height: 1,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
