'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { isAdsEnabled, isAdsEnabledSync } from '@/lib/config/ads';

/**
 * AdLoader - Client component that conditionally loads ad scripts.
 *
 * Uses runtime config (remote or hardcoded) to decide whether to load ads.
 * This runs on the client after hydration, so remote config fetch works.
 */
export function AdLoader() {
  const [adsEnabled, setAdsEnabled] = useState(isAdsEnabledSync());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const enabled = await isAdsEnabled();
      if (!cancelled) {
        setAdsEnabled(enabled);
      }
    }

    check();
    return () => { cancelled = true; };
  }, []);

  if (!adsEnabled) return null;

  return (
    <>
      {/* Monetag Vignette Banner */}
      <Script
        id="monetag-vignette"
        src="/monetag-vignette.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />

      {/* Add other ad scripts below as needed, controlled by the same switch */}
      {/* <Script id="monetag-popunder" src="/monetag-popunder.js" strategy="afterInteractive" /> */}
    </>
  );
}
