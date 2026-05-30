#!/bin/bash
# Upload libreoffice-wasm files to Cloudflare R2
# Usage: ./scripts/upload-wasm-to-r2.sh <bucket-name>
# Requires: wrangler CLI installed and authenticated (npx wrangler login)

set -e

BUCKET="${1:-pdfcraft-wasm}"
WASM_DIR="public/libreoffice-wasm"

if [ ! -d "$WASM_DIR" ]; then
  echo "Error: $WASM_DIR not found. Run this from the project root."
  exit 1
fi

echo "=== Checking wrangler ==="
npx wrangler --version 2>/dev/null || {
  echo "Installing wrangler..."
  npm install -g wrangler
}

echo "=== Creating R2 bucket: $BUCKET ==="
npx wrangler r2 bucket create "$BUCKET" 2>/dev/null || echo "(bucket may already exist)"

echo "=== Uploading WASM files to R2 ==="
for file in "$WASM_DIR"/*; do
  filename=$(basename "$file")
  echo "Uploading: libreoffice-wasm/$filename..."
  npx wrangler r2 object put "$BUCKET/libreoffice-wasm/$filename" --file "$file"
done

echo ""
echo "=== Upload complete! ==="
echo ""
echo "Next steps:"
echo "1. Allow public access: npx wrangler r2 bucket notification create $BUCKET --type allow-public"
echo "2. Or bind a custom domain in Cloudflare Dashboard → R2 → $BUCKET → Settings → Custom Domains"
echo "3. Copy the public URL (e.g. https://pub-xxxx.r2.dev)"
echo "4. Set env var in Cloudflare Pages: NEXT_PUBLIC_WASM_CDN_URL=https://pub-xxxx.r2.dev"
echo "5. Redeploy from Git to pick up the converter.ts change"
