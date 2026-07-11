import { useEffect } from "react";
import { getSharedVideo } from "@/lib/sharedVideoRegistry";

const homeVideoUrls = [
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/GAURAV_MUNISH_FINAL.m4v",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/COLOURS_OF_SILENCE.m4v",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/SHIVAM_VAIDEHI.m4v",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/BAA_BAAPUJI.m4v",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/ANJANA_SLVIAN.m4v",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/COURT_MARRIAGE.m4v",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/NOOR_RAMU.m4v",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/LIFE.M4V",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/SHIVAM_VAIDEHI_FINAL.m4v",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/TAJ.m4v",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/HITCHED.m4v",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/DEVOTION.M4V",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/HIMANI_NIHAR.mp4",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/JAY_MEETEXA.m4v",
];

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
