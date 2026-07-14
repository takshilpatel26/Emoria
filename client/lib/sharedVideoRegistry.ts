import Hls from "hls.js";

const videos = new Map<string, HTMLVideoElement>();
const hlsInstances = new Map<string, Hls>();

interface SharedVideoOptions {
  mobilePreview?: boolean;
}

export function getSharedVideo(src: string, options: SharedVideoOptions = {}) {
  const { mobilePreview = false } = options;
  const existing = videos.get(src);
  if (existing) return existing;

  const video = document.createElement("video");

  video.preload = "auto";
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.crossOrigin = "anonymous";
  video.setAttribute("controlsList", "nodownload");

  if (src.endsWith(".m3u8")) {
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        autoStartLoad: true,
        startLevel: mobilePreview ? 0 : -1,
        capLevelToPlayerSize: mobilePreview,
        maxBufferLength: mobilePreview ? 12 : 30,
        maxMaxBufferLength: mobilePreview ? 12 : 30,
        backBufferLength: mobilePreview ? 24 : 90,
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;

        if (data.type === "networkError") {
          hls.startLoad();
        } else if (data.type === "mediaError") {
          hls.recoverMediaError();
        } else {
          hls.destroy();
          hlsInstances.delete(src);
          videos.delete(src);
        }
      });

      hls.loadSource(src);
      hls.attachMedia(video);
      hlsInstances.set(src, hls);
    } else {
      console.error("HLS is not supported in this browser.");
    }
  } else {
    video.src = src;
  }

  videos.set(src, video);

  return video;
}

export function destroySharedVideos() {
  hlsInstances.forEach((hls) => hls.destroy());
  videos.forEach((video) => {
    video.pause();
    video.removeAttribute("src");
    video.load();
  });
  hlsInstances.clear();
  videos.clear();
}
