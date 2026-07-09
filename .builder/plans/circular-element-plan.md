# Home Page Redesign Plan

## Overview
Redesign the home page for simplicity, clean aesthetics, and cozy vibes. Replace the cinematic vertical scroll layout with a minimalist 2-column grid showcasing 5-6 main projects. Update the navbar to use full-screen side drawer hamburger menu instead of dropdown.

## Key Changes

### 1. Navbar Refactoring (`client/components/Navbar.tsx`)
- **Remove desktop navigation** - Only keep logo centered and hamburger icon on right
- **Implement side drawer menu** - Full-screen menu slides in from right when hamburger is clicked
- **Update styling** - Keep logo centered, hamburger icon (three lines) on right side only
- **Menu items** - Home, Work, About, Contact (same links as before)
- **Interaction** - Click icon to open drawer, click outside or X to close
- **Animations** - Smooth slide-in/slide-out of drawer with backdrop

### 2. Projects Grid Component (`client/components/ProjectsGrid.tsx`) - NEW
Create a new minimal projects display component:
- **Layout** - 2-column grid (responsive: 1 column on mobile, 2 on tablet+)
- **Per project** - Thumbnail image + project title only (minimal display)
- **Card styling** - Clean, simple with hover effect (slight scale or opacity change)
- **Total projects** - Show 5-6 projects
- **Data source** - Use project data from existing `CinematicScroll.tsx` mock data (6 projects)
- **No hover overlays** - Simple, clean design without play buttons or "Watch" labels

### 3. Home Page Update (`client/pages/Index.tsx`)
- **Keep loader** - Maintain current loader with smooth transition
- **Keep navbar** - Use updated Navbar with side drawer
- **Hero section** - Simplify or adjust text for cozy vibe (can keep current structure)
- **Projects section** - Replace `<CinematicScroll />` with new `<ProjectsGrid />` component
- **Keep footer** - Maintain current footer styling

### 4. Styling & Visual Design
- **Color scheme** - Keep existing beige/cream background from global.css
- **Typography** - Maintain Carlton Std font usage
- **Spacing** - Generous whitespace for "cozy" feel
- **Images** - Keep using Unsplash images from existing project data
- **Hover states** - Subtle (scale 1.02 or opacity change) for interactivity

## Files to Modify
- `client/components/Navbar.tsx` - Remove desktop nav, add side drawer
- `client/pages/Index.tsx` - Replace CinematicScroll with ProjectsGrid

## Files to Create
- `client/components/ProjectsGrid.tsx` - New 2-column grid component

## Files to Keep As-Is
- `client/components/CinematicScroll.tsx` - Keep for /work page
- `client/pages/Work.tsx` - Still uses CinematicScroll
- Loader, other pages, footer

## Design Approach
1. Side drawer menu replaces dropdown navbar - provides clean mobile-first design
2. 2-column grid replaces vertical cinematic scroll - minimalist, cozy aesthetic
3. Minimal project cards (image + title only) - focus on visual content
4. Leverage existing Unsplash project data - no new data structure needed
5. Maintain smooth animations throughout - consistent with current design

## Success Criteria
✓ Home page displays 5-6 projects in 2-column grid
✓ Grid is responsive (1 column mobile, 2 columns desktop)
✓ Only thumbnail + project title shown per card
✓ Navbar has hamburger menu only (no desktop nav)
✓ Side drawer menu slides in from right smoothly
✓ Home page feels simple, clean, and cozy
✓ All navigation links work (Home, Work, About, Contact)
✓ Existing /work page still works with CinematicScroll
