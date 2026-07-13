# HLS Playback Integration Plan

## Goal
Make the HLS manifests currently configured in `ProjectsGrid` and `ProjectDetails` play reliably, share the persistent video element across routes, and preload the actual HLS resources instead of the old progressive video files.

## Current Findings
- Both page project arrays now use remote `master.m3u8` URLs hosted on R2.
- `client/lib/sharedVideoRegistry.ts` already uses native HLS on Safari and `hls.js` for browsers using Media Source Extensions.
- `client/components/SharedVideo.tsx` already moves one shared `HTMLVideoElement` between Home and Project Details.
- `client/components/VideoPreloader.tsx` still references the old `.m4v`/`.mp4` URLs, so its requests do not warm the HLS streams used by the UI.
- The representative HLS master playlist exposes 4K and 1080p variants through relative variant-playlist paths.
- The working tree includes untracked local `HLS/` output and conversion scripts; these must not be blindly committed or removed while the branch reports a merge-conflict state.

## Recommended Implementation
1. Resolve the existing merge-conflict state without resetting or discarding the current HLS changes.
2. Replace the preloader’s old progressive URL list with the same HLS manifest URLs used by the project pages.
3. Keep the staged preloading behavior so only a small number of HLS streams begin immediately and the rest are queued, preventing mobile bandwidth saturation.
4. Harden `sharedVideoRegistry.ts`:
   - Keep native HLS for Safari.
   - Keep `hls.js` for MSE browsers.
   - Add HLS error handling and cleanup for failed/destroyed instances.
   - Preserve the shared video element and current buffer across route changes.
5. Preserve the current Project Details behavior of resetting the shared video to `currentTime = 0` when it attaches.
6. Verify all HLS URLs are identical between Home and Project Details, including case-sensitive folder and file names.
7. Validate the production build and typecheck, then test Home hover/touch playback, route transfer to Project Details, controls, and return navigation.

## Hosting Requirements
The R2 bucket must serve:
- `.m3u8` files as `application/vnd.apple.mpegurl` or `application/x-mpegURL`.
- `.ts` segments as `video/mp2t`.
- CORS headers allowing the deployed Vercel origin.
- Public access to every variant playlist and segment referenced by each master playlist.
- Byte/range-friendly caching where supported.

## Scope Decision
Use the current 4K/1080p HLS master playlists. Do not add new 720p/480p variants in this implementation; that would require regenerating and uploading media assets separately.

## Files Expected To Change
- `client/components/VideoPreloader.tsx`
- `client/lib/sharedVideoRegistry.ts`
- Potentially a shared project-video URL module if needed to eliminate duplicate URL lists
- Existing HLS-related package/config files only if validation identifies a deployment issue
