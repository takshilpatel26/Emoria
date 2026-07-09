# Scroll-to-Play Videos for Mobile Home Page

## Overview
Replace hover-based video playback with scroll-based (Intersection Observer) video playback on mobile devices, while keeping the existing hover behavior on desktop. This creates a better mobile UX since hover effects don't exist on touch devices.

## Current State
- `ProjectsGrid` component uses `useState` + `useEffect` to manage `hoveredId`
- On desktop: hovering a card plays the video
- On mobile: no way to trigger video playback (hover doesn't exist)
- Videos are only rendered when hovered

## Desired Behavior
- **Mobile (< md breakpoint):** Videos auto-play when any part of the card enters viewport while scrolling, pause when scrolled out of view
- **Desktop (md and up):** Keep existing hover behavior unchanged
- Videos should be muted and loop
- When video plays via scroll, it should start from the beginning

## Recommended Approach: Intersection Observer + Responsive Logic

### What Changes
1. **Enhance ProjectsGrid.tsx:**
   - Add `IntersectionObserver` hook to detect when video cards enter/exit viewport
   - Introduce `isInView` state per project to track visibility
   - Keep existing `hoveredId` state for desktop hover behavior
   - Render video based on either `hoveredId` (desktop) OR `isInView` (mobile)
   - Use Tailwind `hidden md:block` and `block md:hidden` classes to show/hide video conditionally

2. **Implementation Details:**
   - Create intersection observer that triggers when element is visible
   - Store viewport visibility state in a map: `{ [projectId]: boolean }`
   - Play video when `isInView` becomes true on mobile
   - Pause and reset video when `isInView` becomes false
   - Preserve existing hover behavior on desktop (no changes needed there)

### Key Files to Modify
- `client/components/ProjectsGrid.tsx` - Add intersection observer logic and conditional rendering

### Intersection Observer Logic
```
1. Create intersection observer with threshold: 0.1 (triggers at 10% visibility)
2. For each project card, observe its DOM element
3. When visible: set isInView[projectId] = true → play video
4. When not visible: set isInView[projectId] = false → pause and reset video
5. Video element renders when: hoveredId === projectId (desktop) OR isInView[projectId] (mobile)
6. Use responsive classes to ensure:
   - Desktop: hover-to-play behavior works
   - Mobile: scroll-to-play behavior works
```

### Responsive Behavior Strategy
- Keep video swapping logic based on hover for desktop
- Add parallel intersection observer state for mobile
- Video renders when: `(isDesktop && hoveredId === id) || (!isDesktop && isInView[id])`
- Or simpler: Always render video if either hover OR inView is true
- The existing `hidden md:block` patterns in the codebase show this is the preferred approach

### Benefits
- No breaking changes to desktop hover experience
- Mobile users get native scroll-based video discovery
- Uses standard Intersection Observer API (performant, no scroll listeners needed)
- Can be toggled per device without duplicating code

### Implementation Flow
1. Add state for intersection visibility map
2. Set up intersection observer on component mount
3. Create ref callback to observe each project card
4. Update video rendering condition to include intersection state
5. Test on mobile and desktop to ensure both behaviors work
