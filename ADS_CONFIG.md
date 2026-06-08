# Ads Configuration Guide

## Overview

This document explains how to enable/disable ads in the PDFCraft project. Ads are controlled via **build-time environment variables** that get baked into the static build output.

## Current Configuration

Ads are controlled by two environment variables:

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| `NEXT_PUBLIC_ADVER_ENABLE` | Master switch for all ads | `true` / `false` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense client ID | `ca-pub-xxxxxxxxxxxxxxx` |

## How to Enable/Disable Ads

The build command in `package.json` has `NEXT_PUBLIC_ADVER_ENABLE=true` hardcoded:

```json
"build": "NEXT_PUBLIC_APP_URL=https://pdf.craftisle.com NEXT_PUBLIC_ADVER_ENABLE=true NODE_ENV=production next build"
```

**To disable ads:**
1. Open `package.json`
2. Change `NEXT_PUBLIC_ADVER_ENABLE=true` to `NEXT_PUBLIC_ADVER_ENABLE=false`
3. Commit and push → Cloudflare Pages will auto-redeploy

**To enable ads:**
1. Open `package.json`
2. Ensure `NEXT_PUBLIC_ADVER_ENABLE=true` is set
3. Commit and push → Cloudflare Pages will auto-redeploy

---

## Ad Components Location

### Monetag Vignette Banner
- **File**: `src/app/layout.tsx` (lines 76-83)
- **Condition**: `process.env.NEXT_PUBLIC_ADVER_ENABLE === 'true'`
- **Script**: `/monetag-vignette.js` (placed in `public/`)

### Google AdSense
- **File**: `src/app/layout.tsx` (lines 65-72)
- **Condition**: `process.env.NEXT_PUBLIC_ADSENSE_CLIENT` is truthy
- **Script**: Google AdSense auto-loads via `adsbygoogle.js`

---

## How to Verify Ads Are Working

After deployment, verify ads are injected:

```bash
# Check for Monetag script
curl -s https://pdf.craftisle.com | grep -i "monetag-vignette"

# Check for AdSense script
curl -s https://pdf.craftisle.com | grep -i "adsbygoogle"
```

Or manually:
1. Open `https://pdf.craftisle.com`
2. Right-click → **View Page Source**
3. Search for `monetag-vignette` and `adsbygoogle`

---

## Important Notes

1. **Static export limitation**: Since this project uses `output: 'export'`, environment variables are baked in at build time. Changing them requires a **rebuild**.
2. **No runtime config**: You cannot change ad settings without rebuilding and redeploying.
3. **Cloudflare cache**: After redeployment, wait ~30 seconds for cache to clear, or do a hard refresh (Cmd+Shift+R).

---

## Quick Reference

| Task | Action |
|------|--------|
| Disable all ads | Set `NEXT_PUBLIC_ADVER_ENABLE=false` in `package.json` → commit → push |
| Enable Monetag ads | Set `NEXT_PUBLIC_ADVER_ENABLE=true` in `package.json` → commit → push |
| Enable AdSense | Ensure `NEXT_PUBLIC_ADSENSE_CLIENT` is set in build env |
| Verify ads injected | `curl https://pdf.craftisle.com \| grep monetag` |
| Force rebuild on Cloudflare | Dashboard → Deployments → Retry latest deployment |
