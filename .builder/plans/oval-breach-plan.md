# Website Protection Plan

## Goal
Add client-side protection layers to deter casual users from inspecting the website and downloading videos.

## Important Disclaimer
Client-side protections cannot prevent determined users from accessing content. If a browser can display something, it can be accessed. This plan focuses on deterring casual copying, not preventing sophisticated attacks.

## Implementation Strategy

### 1. Disable Developer Tools & Inspect Features
- Disable right-click context menu (custom menu or no menu)
- Block keyboard shortcuts: F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
- Detect DevTools opening and show warning/disable page
- Hide DevTools via CSS tricks

**Files to modify:**
- `client/components/ProtectionLayer.tsx` (new file)
- `client/App.tsx` (integrate protection)
- `client/global.css` (add protection styles)

### 2. Video Download Prevention
- Disable right-click on video elements
- Disable video controls that allow saving/downloading
- Add watermark or copyright text overlay on videos (optional)
- Disable dragging/copying of video elements

**Files to modify:**
- `client/components/ProjectsGrid.tsx` (disable right-click on videos)
- `client/components/ProjectDetails.tsx` (disable video controls for save)

### 3. Code Obfuscation & Hiding
- Minify CSS and JavaScript (already done in production build)
- Add warning messages in console
- Hide API endpoints and sensitive info from inspect

**Files to modify:**
- `client/App.tsx` (add anti-tamper detection)

## Implementation Details

### Step 1: Create Protection Layer Component
Create `client/components/ProtectionLayer.tsx` that:
- Disables right-click globally
- Blocks DevTools keyboard shortcuts
- Detects DevTools opening
- Shows warning messages

### Step 2: Protect Video Elements
Update `ProjectsGrid.tsx` and `ProjectDetails.tsx`:
- Disable right-click context menu on videos
- Prevent video download attribute
- Add integrity checks

### Step 3: Integrate Global Protection
- Add ProtectionLayer to App.tsx root
- Apply protection to all pages
- Add global CSS protections

### Step 4: Add Visual Protections
- Watermark videos (optional)
- Add copyright notices
- Disable text selection on certain elements

## Expected Behavior
- Users cannot right-click to inspect or save
- F12 and related shortcuts are blocked
- DevTools opening triggers warning
- Videos cannot be easily downloaded via context menu
- Code appears minified in production

## Limitations
- Browser extensions can bypass protections
- Network tab can still see video URLs
- Determined users can use developer knowledge to access content
- This is deterrent, not absolute prevention

## Files to Create/Modify
- Create: `client/components/ProtectionLayer.tsx`
- Modify: `client/App.tsx`
- Modify: `client/global.css`
- Modify: `client/components/ProjectsGrid.tsx`
- Modify: `client/components/ProjectDetails.tsx`
