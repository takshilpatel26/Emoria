# Background Update Task

## Current State Analysis
- **Current background file**: `client/images/bg.JPEG`
- **CSS styling location**: `client/global.css` (lines 24-31)
- **Current styling**:
  ```css
  background-color: #faf0e6;
  background-image: url("client\images\bg.JPEG");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  ```

## Target Background Characteristics
User provided image shows:
- Soft, warm beige/cream tone (approximately #E8D4C8 to #ECD9CC)
- Fine, subtle linen or canvas texture throughout
- Uniform, consistent appearance
- Muted, calming aesthetic without patterns or sharp gradients
- No visible variations in tone

## Implementation Plan

### Step 1: Replace Background Image
- Replace the current `client/images/bg.JPEG` with the target image
- Keep the filename as `bg.JPEG` (or update the CSS URL if renamed)

### Step 2: Update CSS if Needed
- If the tone/appearance differs, adjust `background-color` fallback in `client/global.css`
- The current fallback (#faf0e6) is close to the target but may need refinement
- Keep all other CSS properties unchanged (cover, fixed, center positioning)

### Step 3: Verification
- Test appearance on desktop and mobile viewports
- Verify texture visibility and background consistency
- Check that no text readability is affected

## Critical Files
- `client/global.css` - Contains background styling
- `client/images/bg.JPEG` - Background image asset

## Success Criteria
✓ Background visually matches the user's target image
✓ Maintains proper styling across all screen sizes
✓ No performance degradation
✓ Text remains readable

## Why This Approach
- Preserves existing, working CSS architecture
- Minimal changes reduce risk
- Maintains responsive behavior with fixed attachment
- Simple to execute and rollback if needed
