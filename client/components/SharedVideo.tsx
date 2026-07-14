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
  onPlaying?: () => void;
  onEnded?: () => void;
  onContextMenu?: (event: React.MouseEvent<HTMLVideoElement>) => void;
  onVideoReady?: (video: HTMLVideoElement) => void;
  mobilePreview?: boolean;
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
  onPlaying,
  onEnded,
  onContextMenu,
  onVideoReady,
  mobilePreview = false,
}: SharedVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const callbacksRef = useRef({ onLoadedData, onCanPlay, onPlaying, onEnded, onContextMenu });
  callbacksRef.current = { onLoadedData, onCanPlay, onPlaying, onEnded, onContextMenu };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const video = getSharedVideo(src, { mobilePreview });
    const handleLoadedData = () => callbacksRef.current.onLoadedData?.();
    const handleCanPlay = () => callbacksRef.current.onCanPlay?.();
    const handlePlaying = () => callbacksRef.current.onPlaying?.();
    const handleEnded = () => callbacksRef.current.onEnded?.();
    const handleContextMenu = (event: Event) => {
      callbacksRef.current.onContextMenu?.(event as unknown as React.MouseEvent<HTMLVideoElement>);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("ended", handleEnded);
    container.addEventListener("contextmenu", handleContextMenu);
    container.replaceChildren(video);
    onVideoReady?.(video);

    return () => {
      video.pause();
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("ended", handleEnded);
      container.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [src, mobilePreview]);

  useEffect(() => {
    const video = getSharedVideo(src, { mobilePreview });
    video.className = className || "";
    video.controls = controls;
    video.muted = muted;
    video.loop = loop;
    video.playsInline = true;
    video.poster = poster || "";
  }, [src, className, controls, loop, muted, poster, mobilePreview]);

  return <div ref={containerRef} className="contents" />;
}
