/**
 * Dembrandt Browser Bundle
 * 
 * Extracts all 14 extractor functions from dembrandt and bundles them
 * into a single self-contained script that can be run via browser evaluate().
 * 
 * Usage: Read this file and pass it to browser evaluate() on any page.
 * Returns the complete extraction result as JSON.
 */

const fs = require('fs');
const path = require('path');

// Read the dembrandt extractors source
const extractorsPath = '/tmp/dembrandt-repo/lib/extractors.js';
const colorsPath = '/tmp/dembrandt-repo/lib/colors.js';

const extractorsSource = fs.readFileSync(extractorsPath, 'utf8');
const colorsSource = fs.readFileSync(colorsPath, 'utf8');

// Extract all the page.evaluate() function bodies from extractors.js
// These are the actual browser-side functions we need

// Build the browser bundle
const bundle = `
// ========== COLOR CONVERSION (from dembrandt/lib/colors.js) ==========
${colorsSource
  .replace(/^export /gm, '')
  .replace(/^import .*/gm, '')}

// ========== EXTRACTION FUNCTIONS (from dembrandt/lib/extractors.js) ==========
// These are adapted from the page.evaluate() calls in extractBranding()

async function runDembrandtExtraction() {
  const results = {};
  
  // Run all extractors
  try {
    // 1. Colors
    results.colors = (() => {
      ${extractColorsFunctionBody()}
    })();
    
    // Post-process colors with LCH/OKLCH
    if (results.colors && results.colors.palette) {
      results.colors.palette = results.colors.palette.map(colorItem => {
        const converted = convertColor(colorItem.normalized || colorItem.color);
        if (converted) {
          return { ...colorItem, lch: converted.lch, oklch: converted.oklch };
        }
        return colorItem;
      });
    }
    if (results.colors && results.colors.cssVariables) {
      const enhanced = {};
      for (const [name, value] of Object.entries(results.colors.cssVariables)) {
        const converted = convertColor(typeof value === 'string' ? value : value.value || value);
        if (converted) {
          enhanced[name] = { value: typeof value === 'string' ? value : value.value || value, lch: converted.lch, oklch: converted.oklch };
        } else {
          enhanced[name] = { value: typeof value === 'string' ? value : value.value || value };
        }
      }
      results.colors.cssVariables = enhanced;
    }
    
    // 2-14: Other extractors run in parallel via Promise.all would be ideal
    // but evaluate() is sync, so we run sequentially
    
    results.typography = extractTypography();
    results.spacing = extractSpacing();
    results.borderRadius = extractBorderRadius();
    results.borders = extractBorders();
    results.shadows = extractShadows();
    results.buttons = extractButtonStyles();
    results.inputs = extractInputStyles();
    results.links = extractLinkStyles();
    results.badges = extractBadgeStyles();
    results.breakpoints = extractBreakpoints();
    results.iconSystem = detectIconSystem();
    results.frameworks = detectFrameworks();
    results.logo = extractLogo();
    
  } catch (e) {
    results.error = e.message;
    results.stack = e.stack;
  }
  
  results.url = window.location.href;
  results.extractedAt = new Date().toISOString();
  results.extractor = 'dembrandt-browser-bundle';
  
  return results;
}

return runDembrandtExtraction();
`;

console.log('Bundle generated. Length:', bundle.length);

// For now, just output the concept. The actual bundle needs the function bodies extracted.
// Let me create a simpler approach: extract just the evaluate() callback bodies.

// Actually, let's take a different approach. Instead of trying to parse and reassemble,
// let's create a Playwright script that reuses dembrandt's browser context but connects
// to an existing session.

console.log('Use approach: extract evaluate() bodies from each function and combine.');
