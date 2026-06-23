/**
 * Ad configuration module for pdfcraft
 *
 * Uses Monetag vignette banner.
 * Centralized control via craftisle-configs repo.
 */

// ========== Ad platform for this project ==========
// 'monetag' or 'adsense' — tells isAdsEnabled() which remote field to check
export const AD_PLATFORM = 'monetag' as const;

// ========== Local hardcoded switch ==========
export const ADS_ENABLED = true;

// ========== Remote unified control ==========
export const USE_REMOTE_CONFIG = true;

// Central config URL - all Craftisle projects read from this same file
export const ADS_REMOTE_URL =
  'https://raw.githubusercontent.com/yysam123456-source/craftisle-configs/main/configs/ads-config.json';

// Cache duration for remote config (ms)
const REMOTE_CACHE_TTL = 300_000;

let remoteCache: { value: boolean; fetchedAt: number } | null = null;

export interface AdsRemoteConfig {
  enabled: boolean;
  monetag?: boolean;
  adsense?: boolean;
  updatedAt: string;
  note?: string;
}

/**
 * Get ad enabled status.
 *
 * Priority (highest first):
 * 1. localStorage override (for testing: set `ads_override` to "true" or "false")
 * 2. Remote config (if USE_REMOTE_CONFIG is true) — checks platform-specific field
 * 3. Hardcoded ADS_ENABLED fallback
 */
export async function isAdsEnabled(): Promise<boolean> {
  if (typeof window === 'undefined') return ADS_ENABLED;

  // 1. localStorage override
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
        // Check platform-specific field
        let enabled: boolean;
        if (AD_PLATFORM === 'monetag') {
          enabled = config.enabled && config.monetag !== false;
        } else {
          enabled = config.enabled && config.adsense !== false;
        }
        remoteCache = { value: enabled, fetchedAt: now };
        return enabled;
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
 */
export function isAdsEnabledSync(): boolean {
  if (typeof window === 'undefined') return ADS_ENABLED;

  const override = localStorage.getItem('ads_override');
  if (override === 'true') return true;
  if (override === 'false') return false;

  return ADS_ENABLED;
}
