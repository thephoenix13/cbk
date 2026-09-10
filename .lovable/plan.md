
# Add CBK Logo to Fix Preview Crash

## Overview
Save the uploaded CBK logo to `src/assets/cbk.jpeg` so the existing Navbar import resolves and the preview renders again.

## Steps
1. Copy `user-uploads://cbk.jpeg` → `src/assets/cbk.jpeg`
2. No code changes needed — `Navbar.tsx` already imports `@/assets/cbk.jpeg` and renders it at `h-10 w-auto` next to the "CBK Infra Projects" wordmark.

## Files Modified
- `src/assets/cbk.jpeg` — new file (from your upload)
