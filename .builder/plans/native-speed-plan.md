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
  - Long-press/touch-hold triggers video playback
  - Single tap/click opens project details page
  - Video plays while held, pauses when user releases (or continues with pause button visible)

## Implementation Approach

### 1. Modify ProjectsGrid.tsx State
- Keep `hoveredId` for desktop hover
- Keep `inViewIds` for tracking scroll position (but only use on desktop)
- Add `touchHeldId` state to track which video is being long-pressed on mobile
- Add `touchStartTime` ref to measure press duration (threshold: 500ms)

### 2. Update Touch Event Handling
- Add `onTouchStart` handler: Record touch start time and track which card
- Add `onTouchEnd` handler: Calculate press duration
  - If duration >= 500ms: Set `touchHeldId` to play video
  - If duration < 500ms: Let default click behavior open project details
- Add `onTouchMove` handler: Detect if finger moved significantly (scrolling), cancel long-press

### 3. Update Video Visibility Logic
- `shouldShowVideo()` function updated:
  - Desktop: Show if `hoveredId === projectId` (existing logic)
  - Mobile: Show if `touchHeldId === projectId` (new logic)
- Intersection Observer: Only used for tracking on desktop, ignored on mobile

### 4. Remove Mobile Auto-Play
- Disable intersection observer's state management on mobile
- Ensure videos don't render when scrolled into view on mobile
- Prevent preload state from triggering video playback

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
2. Holds finger on thumbnail for ~0.5 seconds
3. Video starts playing
4. User can tap controls to pause/resume
5. Quick tap (< 0.5s) or dragging = opens project details as normal
