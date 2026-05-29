/**
 * Cloudflare Pages cleanup: Remove large WASM files that exceed 25MB limit.
 * 
 * LibreOffice WASM files (soffice.wasm.gz 47MB, soffice.data.gz 27MB) 
 * exceed Cloudflare Pages' 25MB per-file limit. This script removes them
 * from the build output so the deployment stays under the limit.
 * 
 * PyMuPDF files are kept (all under 25MB individually).
 * 
 * LibreOffice functionality will be restored when WASM files are migrated to R2/CDN.
 * 
 * Triggered automatically when CF_PAGES=1 (set by Cloudflare Pages).
 */

import { rmSync, existsSync } from 'fs';
import { join } from 'path';

const BASE_PATH = process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || '';
const CLEAN_BASE_PATH = BASE_PATH.startsWith('/') ? BASE_PATH.slice(1) : BASE_PATH;

const OUT_DIR = join(process.cwd(), 'out');

// Only run on Cloudflare Pages
if (process.env.CF_PAGES !== '1') {
    console.log('[cf-cleanup] Not Cloudflare Pages build, skipping.');
    process.exit(0);
}

console.log('[cf-cleanup] Cloudflare Pages build detected. Removing large WASM files...');

// Remove libreoffice-wasm (too large for Cloudflare Pages 25MB limit)
for (const subpath of ['libreoffice-wasm', CLEAN_BASE_PATH ? join(CLEAN_BASE_PATH, 'libreoffice-wasm') : null].filter(Boolean)) {
    const dir = join(OUT_DIR, subpath);
    if (existsSync(dir)) {
        try {
            rmSync(dir, { recursive: true, force: true });
            console.log(`[cf-cleanup]   ✓ Removed ${subpath}/ (47MB+27MB > 25MB limit)`);
        } catch (err) {
            console.error(`[cf-cleanup]   ✗ Failed to remove ${subpath}: ${err.message}`);
        }
    }
}

console.log('[cf-cleanup] Cleanup complete.');
