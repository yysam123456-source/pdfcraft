/**
 * Ad configuration module
 * 
 * Two modes:
 * 1. Hardcoded mode (default): Set ADS_ENABLED below to true/false
 * 2. Remote mode: Set USE_REMOTE_CONFIG to true, all projects read from one central URL
 */

// ========== Local hardcoded switch ==========
// Change this to true/false to enable/disable ads for this project
// This is the simplest approach - just change and redeploy
export const ADS_ENABLED = true;

// ========== Remote unified control ==========
// Set to true to fetch ad config from a central URL (for managing many projects at once)
// Set to false to use the hardcoded ADS_ENABLED above
export const USE_REMOTE_CONFIG = false;

// Central config URL - all your projects can read from this same file
// Host this JSON file on GitHub Raw, Cloudflare R2, or any static file host
// Example: https://raw.githubusercontent.com/yourusername/configs/main/ads-config.json
export const ADS_REMOTE_URL =
  'https://raw.githubusercontent.com/yysam123456-source/configs/main/ads-config.json';

// Cache duration for remote config (ms)
// 300000 = 5 minutes, so changes propagate within 5 min
const REMOTE_CACHE_TTL = 300_000;

let remoteCache: { value: boolean; fetchedAt: number } | null = null;

export interface AdsRemoteConfig {
  enabled: boolean;
  updatedAt: string; // ISO timestamp
  note?: string; // optional note, e.g. "disabled during maintenance"
}

/**
 * Get ad enabled status.
 * 
 * Priority (highest first):
 * 1. localStorage override (for testing: set `ads_override` to "true" or "false")
 * 2. Remote config (if USE_REMOTE_CONFIG is true)
 * 3. Hardcoded ADS_ENABLED fallback
 * 
 * This function is safe to call from client components.
 * On the server / at build time, it always returns the hardcoded value.
 */
export async function isAdsEnabled(): Promise<boolean> {
  if (typeof window === 'undefined') return ADS_ENABLED;

  // 1. localStorage override (for development / testing)
  const override = localStorage.getItem('ads_override');
  if (override === 'true') return true;
  if (override === 'false') return false;

  // 2. Remote config
  if (USE_REMOTE_CONFIG && ADS_REMOTE_URL) {
    const cached = remoteCache;
    const now = Date.now();
    if (cached && now - cached.fetchedAt < REMOTE_CACHE_TTL) {
      return cached.value;
    }

    try {
      const res = await fetch(`${ADS_REMOTE_URL}?_t=${now}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const config: AdsRemoteConfig = await res.json();
        remoteCache = { value: config.enabled, fetchedAt: now };
        return config.enabled;
      }
    } catch {
      // fetch failed - fall through to fallback
    }
  }

  // 3. Hardcoded fallback
  return ADS_ENABLED;
}

/**
 * Synchronous version - returns hardcoded value immediately.
 * Use this in places where you can't await (e.g. render path).
 * For runtime control, use the async version in a useEffect.
 */
export function isAdsEnabledSync(): boolean {
  if (typeof window === 'undefined') return ADS_ENABLED;

  const override = localStorage.getItem('ads_override');
  if (override === 'true') return true;
  if (override === 'false') return false;

  return ADS_ENABLED;
}
