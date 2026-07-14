# Mobile Center-Video Autoplay Plan

## Goal
Replace mobile home-page touch-and-hold playback with automatic playback for the project nearest the viewport center. Keep normal mobile taps opening Project Details, and do not change desktop behavior.

## Current findings
- `client/components/ProjectsGrid.tsx` currently uses `touchHeldId` to mount, start, and stop mobile previews.
- Mobile home previews are lazy-loaded; desktop uses the existing `VideoPreloader` behavior.
- `client/components/SharedVideo.tsx` attaches cached shared video elements and can expose playback callbacks.
- `client/lib/sharedVideoRegistry.ts` caches HLS/video elements and provides start/stop helpers.
- No existing viewport observer or center-card selection exists in the grid.

## Recommended implementation
1. Add mobile-only viewport-center tracking in `ProjectsGrid` using card element refs and an `IntersectionObserver`/scroll calculation that selects the card whose center is closest to the viewport center.
2. Replace mobile autoplay ownership from `touchHeldId` to a new `activeMobileProjectId` state:
   - Mount only the active mobile card’s `SharedVideo`.
   - Reset its playback position to zero and start muted autoplay when it becomes active.
   - Stop playback/loading for the previously active card when the active id changes.
   - Keep desktop hover, mounting, preload, and navigation logic unchanged.
3. Preserve mobile tap navigation:
   - Scrolling/viewport position controls preview playback.
   - A normal tap continues to navigate to `/project/:id`.
   - Remove hold-timer playback behavior from the mobile path without changing desktop click behavior.
4. Use the existing shared registry helpers to start/stop only the active mobile HLS stream. Do not introduce background mobile preloading.
5. Keep thumbnail behavior stable while the active video attaches; reveal the video after its first playable/rendered frame if needed to avoid black flashes.
6. Validate responsive behavior at mobile and desktop widths, including scrolling between cards, stopping at a card, quick taps, route navigation, and returning home.

## Files expected to change
- `client/components/ProjectsGrid.tsx`
- Potentially `client/components/SharedVideo.tsx` if an additional playback-ready callback is needed
- Potentially `client/lib/sharedVideoRegistry.ts` only if active-stream lifecycle helpers need a small adjustment

## Validation
- Run `pnpm typecheck`.
- Run `pnpm test`.
- Run `pnpm build`.
- Browser-test mobile center selection, autoplay/pause transitions, quick-tap navigation, and desktop hover behavior.
