const videos = new Map<string, HTMLVideoElement>();

export function getSharedVideo(src: string) {
  const existing = videos.get(src);
  if (existing) return existing;

  const video = document.createElement("video");
  video.src = src;
  video.preload = "auto";
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("controlsList", "nodownload");
  videos.set(src, video);
  video.load();
  return video;
}
