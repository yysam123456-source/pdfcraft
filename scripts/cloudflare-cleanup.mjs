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

import { rmSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const BASE_PATH = process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || '';
const CLEAN_BASE_PATH = BASE_PATH.startsWith('/') ? BASE_PATH.slice(1) : BASE_PATH;

const OUT_DIR = join(process.cwd(), 'out');
const MAX_FILE_SIZE = 25 * 1024 * 1024; // Cloudflare Pages 25MB per-file limit

// Only run on Cloudflare Pages
if (process.env.CF_PAGES !== '1') {
    console.log('[cf-cleanup] Not Cloudflare Pages build, skipping.');
    process.exit(0);
}

console.log('[cf-cleanup] Cloudflare Pages build detected. Removing files > 25MB...');

/**
 * Remove individual files exceeding Cloudflare's 25MB limit,
 * while keeping smaller files (JS workers, etc.) intact.
 */
function removeLargeFiles(dir) {
    if (!existsSync(dir)) return;
    const entries = readdirSync(dir);
    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
            removeLargeFiles(fullPath);
        } else if (stat.size > MAX_FILE_SIZE) {
            rmSync(fullPath);
            console.log(`[cf-cleanup]   ✓ Removed ${entry} (${(stat.size/1024/1024).toFixed(1)}MB > 25MB limit)`);
        }
    }
}

for (const subpath of ['libreoffice-wasm', CLEAN_BASE_PATH ? join(CLEAN_BASE_PATH, 'libreoffice-wasm') : null].filter(Boolean)) {
    removeLargeFiles(join(OUT_DIR, subpath));
}

console.log('[cf-cleanup] Cleanup complete.');
