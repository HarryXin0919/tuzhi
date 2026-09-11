#!/usr/bin/env node
/**
 * GitHub/package.json-compatible alias of copy-pglite-preview.mjs.
 * Skips when DATABASE_URL is set (production Neon). Never throws.
 */
import { copyPglitePreviewAssets } from "./copy-pglite-preview.mjs";

copyPglitePreviewAssets();
