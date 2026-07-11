import { useEffect, useRef } from "react";
import { getSharedVideo } from "@/lib/sharedVideoRegistry";

interface SharedVideoProps {
  src: string;
  className?: string;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  onLoadedData?: () => void;
  onCanPlay?: () => void;
  onEnded?: () => void;
  onContextMenu?: (event: React.MouseEvent<HTMLVideoElement>) => void;
  onVideoReady?: (video: HTMLVideoElement) => void;
}

export default function SharedVideo({
  src,
  className,
  controls = false,
  loop = !controls,
  muted = true,
  poster,
  onLoadedData,
  onCanPlay,
  onEnded,
  onContextMenu,
  onVideoReady,
}: SharedVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const callbacksRef = useRef({ onLoadedData, onCanPlay, onEnded, onContextMenu });
  callbacksRef.current = { onLoadedData, onCanPlay, onEnded, onContextMenu };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const video = getSharedVideo(src);
    const handleLoadedData = () => callbacksRef.current.onLoadedData?.();
    const handleCanPlay = () => callbacksRef.current.onCanPlay?.();
    const handleEnded = () => callbacksRef.current.onEnded?.();
    const handleContextMenu = (event: Event) => {
      callbacksRef.current.onContextMenu?.(event as unknown as React.MouseEvent<HTMLVideoElement>);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);
    container.addEventListener("contextmenu", handleContextMenu);
    container.replaceChildren(video);
    onVideoReady?.(video);

    return () => {
      video.pause();
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
      container.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [src]);

  useEffect(() => {
    const video = getSharedVideo(src);
    video.className = className || "";
    video.controls = controls;
    video.muted = muted;
    video.loop = loop;
    video.playsInline = true;
    video.poster = poster || "";
  }, [src, className, controls, loop, muted, poster]);

  return <div ref={containerRef} className="contents" />;
}
