#!/usr/bin/env node
/**
 * Build a browser-injectable bundle from dembrandt's extractors.
 * 
 * Reads dembrandt's extractors.js and colors.js, extracts the browser-side
 * functions (the ones that run inside page.evaluate()), and bundles them
 * into a single self-contained IIFE that can be injected via browser evaluate().
 * 
 * Output: scripts/dembrandt-bundle.js
 */

const fs = require('fs');
const path = require('path');

const DEMBRANDT_PATH = '/tmp/dembrandt-repo/lib';
const OUTPUT_PATH = path.join(__dirname, 'dembrandt-bundle.js');

// Read source files
const colorsSource = fs.readFileSync(path.join(DEMBRANDT_PATH, 'colors.js'), 'utf8');
const extractorsSource = fs.readFileSync(path.join(DEMBRANDT_PATH, 'extractors.js'), 'utf8');

// Clean colors.js for browser use (remove ESM exports/imports)
const colorsClean = colorsSource
  .replace(/^export /gm, '')
  .replace(/^import .*/gm, '');

// Extract the evaluate() callback bodies from extractors.js
// Each extractor function calls page.evaluate(() => { ... })
// We need to extract those callback bodies

// For functions that do page.evaluate((arg) => { ... }, arg), we need to handle the argument too.
// Most extractors don't take arguments, except extractLogo which takes `url`.

// Strategy: Instead of parsing JS AST, we'll extract the function bodies manually
// by finding the evaluate callback patterns. But that's fragile.
// 
// Better strategy: Since all the evaluate callbacks are self-contained browser JS,
// we can just copy the function contents directly. The functions are:
// - extractColors -> page.evaluate(() => { ... })
// - extractTypography -> page.evaluate(() => { ... })  
// - extractSpacing -> page.evaluate(() => { ... })
// - extractBorderRadius -> page.evaluate(() => { ... })
// - extractBorders -> page.evaluate(() => { ... })
// - extractShadows -> page.evaluate(() => { ... })
// - extractButtonStyles -> page.evaluate(() => { ... })
// - extractInputStyles -> page.evaluate(() => { ... })
// - extractLinkStyles -> page.evaluate(() => { ... })
// - extractBadgeStyles -> page.evaluate(() => { ... })
// - extractBreakpoints -> page.evaluate(() => { ... })
// - detectIconSystem -> page.evaluate(() => { ... })
// - detectFrameworks -> page.evaluate(() => { ... })
// - extractLogo -> page.evaluate((baseUrl) => { ... }, url)
//
// The simplest approach: use regex to find each `async function XXX(page` block,
// then extract the evaluate callback.

// Actually, the SIMPLEST approach is to just make each function callable without page:
// since each function body is `return await page.evaluate(() => { ... })`,
// we can convert each to just the inner function body.

// Let's build the bundle by wrapping the whole extractors module to work in browser.
// We replace `page.evaluate(() => { CODE })` with just `(() => { CODE })()`
// and `page.evaluate((arg) => { CODE }, value)` with `((arg) => { CODE })(value)`

let browserBundle = extractorsSource;

// Remove imports
browserBundle = browserBundle.replace(/^import .*/gm, '');

// Remove the main extractBranding function and everything related to Playwright
// We only need the individual extractor functions

// Convert page.evaluate calls to direct calls
// Pattern: return await page.evaluate(() => {
browserBundle = browserBundle.replace(
  /return await page\.evaluate\(\(\) => \{/g,
  'return (() => {'
);

// Pattern: return await page.evaluate((baseUrl) => {
browserBundle = browserBundle.replace(
  /return await page\.evaluate\(\(baseUrl\) => \{/g, 
  'return ((baseUrl) => {'
);

// Close the evaluate calls: }, url);  -> })(url);
// and: });  at function end -> })();
// This is tricky because we need to match the right closing

// Actually let's take yet another approach. Let me just write the bundle manually
// by copy-pasting the evaluate bodies. This is more reliable.

console.log("Building dembrandt browser bundle...");
console.log("Strategy: Manual extraction of evaluate() bodies");
console.log("The extractors.js functions all use page.evaluate() with self-contained browser JS.");
console.log("We need to extract those bodies and combine with colors.js.");
console.log("");
console.log("For reliable bundling, use the approach in dembrandt-bundle-manual.js");

// Write a placeholder that documents what needs to happen
fs.writeFileSync(OUTPUT_PATH, `// Auto-generated dembrandt browser bundle
// Run via: browser evaluate() on any authenticated page
// Generated at: ${new Date().toISOString()}

// This bundle combines dembrandt's extraction engine with color conversion utilities.
// It can be injected into any browser page to extract design tokens.

(() => {
  // COLOR UTILITIES
  ${colorsClean}
  
  // MAIN EXTRACTION
  // TODO: Inject extractor evaluate() bodies here
  
  return { status: 'bundle-placeholder', message: 'Use dembrandt-bundle-manual.js instead' };
})();
`);

console.log(`\nWrote placeholder to ${OUTPUT_PATH}`);
console.log("Bundle size:", fs.statSync(OUTPUT_PATH).size, "bytes");
