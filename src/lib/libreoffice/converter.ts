/**
 * LibreOffice WASM Converter
 *
 * Simplified version: loads WASM assets from raw.githubusercontent.com (CORS-enabled CDN).
 * Large .gz files are decompressed in-browser via DecompressionStream.
 *
 * CDN URL: https://raw.githubusercontent.com/yysam123456-source/pdfcraft/wasm-assets/<file>
 * Files: soffice.wasm.gz (47MB), soffice.data.gz (27MB)
 */

import { WorkerBrowserConverter } from '@matbee/libreoffice-converter/browser';

// CDN base: raw.githubusercontent.com supports CORS (Access-Control-Allow-Origin: *)
const CDN_BASE = 'https://raw.githubusercontent.com/yysam123456-source/pdfcraft/wasm-assets';

// Asset filenames on CDN (gzipped)
const SOFFICE_JS       = 'soffice.js';
const SOFFICE_WASM_GZ  = 'soffice.wasm.gz';
const SOFFICE_DATA_GZ  = 'soffice.data.gz';
const SOFFICE_WORKER_JS = 'soffice.worker.js';
const BROWSER_WORKER_JS = 'browser.worker.global.js';
const NOTO_SANS_FONT   = 'NotoSansSC-Regular.ttf';

export interface LoadProgress {
    phase: 'loading' | 'initializing' | 'converting' | 'complete' | 'ready';
    percent: number;
    message: string;
}

export type ProgressCallback = (progress: LoadProgress) => void;

let converterInstance: LibreOfficeConverter | null = null;

/**
 * Fetch with retry logic for unstable networks.
 */
async function fetchWithRetry(url: string, retries = 3, init?: RequestInit): Promise<Response> {
    let lastError: Error | undefined;
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, { mode: 'cors', ...init });
            if (response.ok) return response;
            // For 5xx or 429, retry; for 4xx (except 429), fail immediately
            if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }
            lastError = new Error(`HTTP ${response.status} ${response.statusText}`);
        } catch (e) {
            lastError = e instanceof Error ? e : new Error(String(e));
        }
        if (i < retries - 1) {
            const delay = 1000 * (i + 1); // exponential-ish backoff
            console.warn(`[LibreOffice] Fetch retry ${i + 1}/${retries - 1} for ${url} in ${delay}ms...`);
            await new Promise(r => setTimeout(r, delay));
        }
    }
    throw lastError || new Error(`Failed to fetch ${url} after ${retries} retries`);
}

/**
 * Fetch a .gz file from CDN and decompress via DecompressionStream.
 * Returns a Blob (decompressed).
 */
async function fetchAndDecompress(url: string, onProgress?: (loaded: number, total: number) => void): Promise<Blob> {
    const response = await fetchWithRetry(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);

    const contentLength = response.headers.get('content-length');
    const total = contentLength ? parseInt(contentLength) : 0;

    // If server sends Content-Encoding: gzip, browser already decompressed — return as-is
    const contentEncoding = response.headers.get('content-encoding');
    if (contentEncoding?.includes('gzip')) {
        return response.blob();
    }

    // Manually decompress .gz via DecompressionStream
    const decompressor = new DecompressionStream('gzip');
    const reader = response.body!.getReader();
    const writer = decompressor.writable.getWriter();
    const outputReader = decompressor.readable.getReader();

    // Pipe response body → decompressor (with progress tracking)
    const pipePromise = (async () => {
        let loaded = 0;
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            loaded += value.length;
            onProgress?.(loaded, total);
            await writer.write(value);
        }
        await writer.close();
    })();

    // Collect decompressed output
    const chunks: Uint8Array[] = [];
    const readPromise = (async () => {
        while (true) {
            const { done, value } = await outputReader.read();
            if (done) break;
            chunks.push(value);
        }
    })();

    await Promise.all([pipePromise, readPromise]);

    // Concatenate chunks into single Uint8Array
    const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }

    // Determine MIME type from URL for Safari compatibility
    const mimeType = url.endsWith('.wasm.gz') || url.endsWith('.wasm')
        ? 'application/wasm'
        : 'application/octet-stream';
    return new Blob([result], { type: mimeType });
}

/**
 * Fetch a JS file from CDN and return as Blob with proper MIME type.
 * Safari requires Worker scripts to have application/javascript MIME type.
 * raw.githubusercontent.com returns text/plain, so we must override it.
 */
async function fetchJs(url: string): Promise<Blob> {
    const response = await fetchWithRetry(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
    const text = await response.text();
    return new Blob([text], { type: 'application/javascript' });
}

/**
 * Fetch a binary file from CDN as Blob.
 */
async function fetchBlob(url: string): Promise<Blob> {
    const response = await fetchWithRetry(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
    return response.blob();
}

export class LibreOfficeConverter {
    private converter: WorkerBrowserConverter | null = null;
    private initialized = false;
    private initPromise: Promise<void> | null = null;
    private progressCallback?: ProgressCallback;
    private blobUrls: string[] = [];

    async initialize(onProgress?: ProgressCallback): Promise<void> {
        if (onProgress) this.progressCallback = onProgress;
        if (this.initialized) return;
        if (this.initPromise) return this.initPromise;

        this.initPromise = this._doInitialize();
        try {
            await this.initPromise;
        } catch (e) {
            this.initPromise = null;
            throw e;
        }
    }

    private async _doInitialize(): Promise<void> {
        try {
            this.progressCallback?.({ phase: 'loading', percent: 0, message: 'Checking environment...' });

            await this.checkEnvironment();

            this.progressCallback?.({ phase: 'loading', percent: 5, message: 'Downloading conversion engine (~90 MB, may take 1-3 min)...' });

            // Step 1: Fetch small JS files + font in parallel (with proper MIME type for Safari)
            const [sofficeJs, sofficeWorkerJs, browserWorkerJs, fontBlob] = await Promise.all([
                fetchJs(`${CDN_BASE}/${SOFFICE_JS}`),
                fetchJs(`${CDN_BASE}/${SOFFICE_WORKER_JS}`),
                fetchJs(`${CDN_BASE}/${BROWSER_WORKER_JS}`),
                fetchBlob(`${CDN_BASE}/${NOTO_SANS_FONT}`),
            ]);

            // Load CJK font into ArrayBuffer for the converter
            const fontArrayBuffer = await fontBlob.arrayBuffer();

            // Step 2: Fetch large WASM file (serial to avoid network congestion)
            this.progressCallback?.({ phase: 'loading', percent: 15, message: 'Downloading engine core (~47 MB)...' });
            const sofficeWasmBlob = await fetchAndDecompress(`${CDN_BASE}/${SOFFICE_WASM_GZ}`, (loaded, total) => {
                const pct = total > 0 ? Math.round(10 + (loaded / total) * 35) : 45;
                this.progressCallback?.({
                    phase: 'loading',
                    percent: pct,
                    message: `Downloading engine core: ${(loaded / 1024 / 1024).toFixed(1)} MB / ${(total / 1024 / 1024).toFixed(1)} MB`,
                });
            });

            // Step 3: Fetch data file (serial)
            this.progressCallback?.({ phase: 'loading', percent: 50, message: 'Downloading engine data (~27 MB)...' });
            const sofficeDataBlob = await fetchAndDecompress(`${CDN_BASE}/${SOFFICE_DATA_GZ}`, (loaded, total) => {
                const pct = total > 0 ? Math.round(50 + (loaded / total) * 35) : 85;
                this.progressCallback?.({
                    phase: 'loading',
                    percent: pct,
                    message: `Downloading engine data: ${(loaded / 1024 / 1024).toFixed(1)} MB / ${(total / 1024 / 1024).toFixed(1)} MB`,
                });
            });

            const sofficeJsUrl       = URL.createObjectURL(sofficeJs);
            const sofficeWasmUrl    = URL.createObjectURL(sofficeWasmBlob);
            const sofficeDataUrl     = URL.createObjectURL(sofficeDataBlob);
            const sofficeWorkerJsUrl = URL.createObjectURL(sofficeWorkerJs);
            const browserWorkerJsUrl  = URL.createObjectURL(browserWorkerJs);

            this.blobUrls = [sofficeJsUrl, sofficeWasmUrl, sofficeDataUrl, sofficeWorkerJsUrl, browserWorkerJsUrl];

            this.converter = new WorkerBrowserConverter({
                sofficeJs:       sofficeJsUrl,
                sofficeWasm:    sofficeWasmUrl,
                sofficeData:     sofficeDataUrl,
                sofficeWorkerJs: sofficeWorkerJsUrl,
                browserWorkerJs:  browserWorkerJsUrl,
                verbose: false,
                fonts: [
                    { filename: 'NotoSansSC-Regular.ttf', data: fontArrayBuffer },
                ],
                onProgress: (info: { phase: string; percent: number; message: string }) => {
                    if (this.progressCallback && !this.initialized) {
                        this.progressCallback({
                            phase: info.phase as LoadProgress['phase'],
                            percent: info.percent,
                            message: info.message,
                        });
                    }
                },
                onReady: () => console.log('[LibreOffice] Ready!'),
                onError: (error: Error) => console.error('[LibreOffice] Error:', error),
            });

            this.progressCallback?.({ phase: 'initializing', percent: 95, message: 'Initializing conversion engine...' });

            console.log('[LibreOffice] Starting initialization via WorkerBrowserConverter...');
            const initStart = performance.now();
            await this.converter.initialize();
            const initDuration = Math.round(performance.now() - initStart);
            console.log(`[LibreOffice] Initialization completed in ${initDuration}ms`);

            this.initialized = true;
            this.progressCallback?.({ phase: 'ready', percent: 100, message: 'Conversion engine ready!' });
            this.progressCallback = undefined;
        } catch (e) {
            this.converter = null;
            this.initialized = false;
            throw e;
        }
    }

    /**
     * Check that SharedArrayBuffer / Cross-Origin Isolation is available.
     * Also verify CDN connectivity.
     */
    private async checkEnvironment(): Promise<void> {
        console.warn('[LibreOffice] === Environment Check ===');

        const isIsolated = typeof window !== 'undefined' && window.crossOriginIsolated;
        console.warn(`[LibreOffice] Cross-Origin Isolated: ${isIsolated ? 'YES ✅' : 'NO ❌'}`);

        const hasSAB = typeof SharedArrayBuffer !== 'undefined';
        console.warn(`[LibreOffice] SharedArrayBuffer: ${hasSAB ? 'Available ✅' : 'NOT available ❌'}`);

        if (!isIsolated || !hasSAB) {
            throw new Error(
                `SharedArrayBuffer is not available (crossOriginIsolated=${isIsolated}). ` +
                'The server must set Cross-Origin-Opener-Policy: same-origin and ' +
                'Cross-Origin-Embedder-Policy: require-corp headers.'
            );
        }

        // Verify CDN connectivity (just check soffice.js HEAD)
        try {
            const res = await fetch(`${CDN_BASE}/${SOFFICE_JS}`, { method: 'HEAD', mode: 'cors' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            console.warn(`[LibreOffice] CDN connectivity: OK ✅ (${res.status})`);
        } catch (e) {
            console.error('[LibreOffice] CDN connectivity: FAILED ❌', e);
            throw new Error(`Cannot reach WASM CDN at ${CDN_BASE}. Please check your internet connection.`);
        }

        console.warn('[LibreOffice] === Environment Check Passed ✅ ===');
    }

    isReady(): boolean {
        return this.initialized && this.converter !== null;
    }

    async convert(file: File, outputFormat: string): Promise<Blob> {
        if (!this.converter) throw new Error('Converter not initialized');

        console.log(`[LibreOffice] Converting ${file.name} to ${outputFormat}...`);
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const ext = file.name.split('.').pop()?.toLowerCase() || '';

        const startTime = Date.now();
        const result = await this.converter.convert(uint8Array, {
            outputFormat: outputFormat as any,
            inputFormat: ext as any,
        }, file.name);
        const duration = Date.now() - startTime;
        console.log(`[LibreOffice] Conversion complete! Duration: ${duration}ms`);

        const isSAB = typeof SharedArrayBuffer !== 'undefined'
            && result.data.buffer instanceof SharedArrayBuffer;
        const outputData = isSAB ? new Uint8Array(result.data) : result.data;
        return new Blob([outputData as BlobPart], { type: result.mimeType });
    }

    async convertToPdf(file: File): Promise<Blob> {
        return this.convert(file, 'pdf');
    }

    async wordToPdf(file: File): Promise<Blob> { return this.convertToPdf(file); }
    async pptToPdf(file: File): Promise<Blob>  { return this.convertToPdf(file); }
    async excelToPdf(file: File): Promise<Blob> { return this.convertToPdf(file); }

    async destroy(): Promise<void> {
        if (this.converter) await this.converter.destroy();
        this.blobUrls.forEach(url => URL.revokeObjectURL(url));
        this.blobUrls = [];
        this.converter = null;
        this.initialized = false;
    }
}

export function getLibreOfficeConverter(): LibreOfficeConverter {
    if (!converterInstance) converterInstance = new LibreOfficeConverter();
    return converterInstance;
}
