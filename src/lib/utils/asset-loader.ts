/**
 * src/lib/utils/asset-loader.ts
 *
 * Simple asset fetcher.
 * WASM files are now hosted on raw.githubusercontent.com (CORS-enabled).
 * No chunk reassembly needed — files are fetched as-is.
 */

/**
 * Fetch an asset as a Blob.
 * @param url The full URL of the asset
 * @returns A Blob containing the asset
 */
export async function fetchAssembledBlob(url: string): Promise<Blob> {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    return response.blob();
}
