export const PROJECT_VIDEO_URLS = [
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/GAURAV_MUNISH_FINAL/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/COLOURS_OF_SILENCE/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/SHIVAM_VAIDEHI/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/BAA_BAAPUJI/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/ANJANA_SLVIAN/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/COURT_MARRIAGE/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/NOOR_RAMU/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/LIFE/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/SHIVAM_VAIDEHI_FINAL/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/TAJ/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/HITCHED/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/DEVOTION/4k/playlist.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/HIMANI_NIHAR/master.m3u8",
  "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/HLS/JAY_MEETEXA/master.m3u8",
] as const;

export const HOME_PREVIEW_VIDEO_URLS = PROJECT_VIDEO_URLS.map((url, index) =>
  index === 11 ? url : url.replace("/master.m3u8", "/1080p/playlist.m3u8")
);
