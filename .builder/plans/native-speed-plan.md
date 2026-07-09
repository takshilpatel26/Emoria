# Mobile Touch-to-Play Video Implementation

## Overview
Change ProjectsGrid mobile behavior from auto-play on scroll to manual playback on long-press (touch-hold). Desktop hover behavior remains unchanged.

## Current Behavior
- Desktop (md+): Videos play on hover, pause on mouse leave
- Mobile (<md): Videos auto-play when 10% visible in viewport during scroll
- Issue: Multiple videos play simultaneously, hard to focus on one video

## Desired Behavior
- Desktop (md+): Keep existing hover-to-play behavior (no changes)
- Mobile (<md):
  - Show thumbnail (no auto-play)
  - **Touch-hold (long-press):** Video plays while finger is held down, just like hover on desktop
  - **Release hold:** Video pauses and resets (like mouse leave on desktop)
  - **Quick tap (< 500ms):** Opens project details page (no video playback)
  - No auto-play on scroll

## Implementation Approach

### 1. Modify ProjectsGrid.tsx State
- Keep `hoveredId` for desktop hover
- Keep `inViewIds` for tracking scroll position (but only use on desktop)
- Add `touchHeldId` state to track which video is being long-pressed on mobile
- Add `touchStartTime` ref to measure press duration (threshold: 500ms)

### 2. Update Touch Event Handling
- Add `onTouchStart` handler: Record touch start time and track which card, start holding timer
- Add `onTouchEnd` handler:
  - If held >= 500ms: User was holding, don't navigate (video already playing)
  - If held < 500ms: Quick tap, navigate to project details
  - Clear `touchHeldId` so video stops playing
- Add `onTouchMove` handler: Detect if finger moved significantly (scrolling), cancel hold and reset timer

### 3. Update Video Visibility Logic
- `shouldShowVideo()` function updated:
  - Desktop: Show if `hoveredId === projectId` (existing logic)
  - Mobile: Show if `touchHeldId === projectId` (new logic)
- Intersection Observer: Only used for tracking on desktop, ignored on mobile

### 4. Remove Mobile Auto-Play
- Disable intersection observer's state management on mobile
- Ensure videos don't render when scrolled into view on mobile
- Only render video when `touchHeldId === projectId`
- Prevent scroll-based playback entirely on mobile

## Key Files to Modify
- `client/components/ProjectsGrid.tsx` - Main changes here
  - Add touch event handlers
  - Add `touchHeldId` state
  - Update `shouldShowVideo()` logic to distinguish desktop vs mobile
  - Keep all existing desktop hover behavior

## Responsive Breakpoint
- Use `md` breakpoint (768px) to determine desktop vs mobile
- Desktop: md and up (keep existing hover behavior)
- Mobile: Below md (new touch-hold behavior)

## User Experience
1. User sees thumbnail on mobile
2. **Scenario A - Watch preview:** User holds finger on thumbnail for ~0.5 seconds
   - Video starts playing immediately while holding
   - User releases finger = video stops and resets to thumbnail
3. **Scenario B - Open project:** User taps thumbnail quickly (< 0.5s)
   - Navigates to project details page
   - No video playback triggered
4. **Scenario C - Scroll:** User scrolls by dragging
   - Scroll works normally without triggering video playback
   - Hold timer cancels during drag movement
