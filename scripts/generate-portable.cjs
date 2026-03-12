#!/usr/bin/env node
/**
 * generate-portable.cjs
 * 
 * Generates a portable design token package from dembrandt extraction JSON.
 * Output: tokens.json, tokens.css, tailwind.preset.js, README.md
 * 
 * Usage: node scripts/generate-portable.cjs <domain>
 *        node scripts/generate-portable.cjs --all
 */

const fs = require('fs');
const path = require('path');

const HUB_DIR = path.join(require('os').homedir(), 'design-system-hub');
const EXTRACTIONS_DIR = path.join(HUB_DIR, 'extractions');
const PORTABLE_DIR = path.join(HUB_DIR, 'portable');

// --- Color utilities ---

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(c => Math.round(c).toString(16).padStart(2, '0')).join('');
}

function parseColor(color) {
  if (!color) return null;
  if (color.startsWith('#')) return hexToRgb(color);
  const rgbMatch = color.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
  // oklch/oklab — skip, return null
  return null;
}

function mixColors(c1, c2, t) {
  return {
    r: c1.r + (c2.r - c1.r) * t,
    g: c1.g + (c2.g - c1.g) * t,
    b: c1.b + (c2.b - c1.b) * t,
  };
}

function generateScale(baseHex) {
  const base = hexToRgb(baseHex);
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };
  
  const steps = {
    50:  mixColors(white, base, 0.05),
    100: mixColors(white, base, 0.1),
    200: mixColors(white, base, 0.2),
    300: mixColors(white, base, 0.35),
    400: mixColors(white, base, 0.55),
    500: base,
    600: mixColors(base, black, 0.15),
    700: mixColors(base, black, 0.3),
    800: mixColors(base, black, 0.45),
    900: mixColors(base, black, 0.6),
  };

  const result = {};
  for (const [step, rgb] of Object.entries(steps)) {
    result[step] = rgbToHex(rgb.r, rgb.g, rgb.b);
  }
  return result;
}

// --- Extract tokens from dembrandt JSON ---

function extractTokens(data) {
  const tokens = {
    meta: {
      url: data.url,
      extractedAt: data.extractedAt,
      generatedAt: new Date().toISOString(),
    },
    colors: {
      primary: null,
      primaryScale: {},
      background: null,
      foreground: null,
      accent: null,
      neutral: {},
      semantic: {},
      raw: [],
    },
    typography: {
      fontFamily: { sans: null, mono: null, display: null },
      sizes: [],
      weights: [],
      lineHeights: [],
    },
    borderRadius: {
      default: null,
      values: [],
    },
    shadows: [],
    borders: [],
    spacing: [],
    components: {
      buttons: [],
    },
  };

  // Colors
  const palette = (data.colors?.palette || []).filter(c => c.confidence === 'high');
  
  // Primary: from semantic or first button bg
  const semanticPrimary = data.colors?.semantic?.primary;
  const buttonBg = data.components?.buttons?.[0]?.bg;
  const primaryRaw = semanticPrimary || buttonBg || palette[0]?.color;
  const primaryParsed = parseColor(primaryRaw);
  
  if (primaryParsed) {
    tokens.colors.primary = rgbToHex(primaryParsed.r, primaryParsed.g, primaryParsed.b);
    tokens.colors.primaryScale = generateScale(tokens.colors.primary);
  }

  // Background & foreground from palette
  for (const p of palette) {
    const parsed = parseColor(p.color);
    if (!parsed) continue;
    const hex = rgbToHex(parsed.r, parsed.g, parsed.b);
    const brightness = (parsed.r * 299 + parsed.g * 587 + parsed.b * 114) / 1000;
    
    if (brightness > 200 && !tokens.colors.background) {
      tokens.colors.background = hex;
    }
    if (brightness < 80 && !tokens.colors.foreground) {
      tokens.colors.foreground = hex;
    }
  }

  // Fallbacks
  if (!tokens.colors.background) tokens.colors.background = '#ffffff';
  if (!tokens.colors.foreground) tokens.colors.foreground = '#000000';

  // Accent: second most used color that isn't primary/bg/fg
  for (const p of palette) {
    const parsed = parseColor(p.color);
    if (!parsed) continue;
    const hex = rgbToHex(parsed.r, parsed.g, parsed.b);
    if (hex !== tokens.colors.primary && hex !== tokens.colors.background && hex !== tokens.colors.foreground) {
      tokens.colors.accent = hex;
      break;
    }
  }

  // Neutral scale from background
  if (tokens.colors.background) {
    tokens.colors.neutral = generateScale(tokens.colors.foreground || '#000000');
  }

  // Raw palette
  tokens.colors.raw = palette.map(p => ({
    color: p.normalized || p.color,
    count: p.count,
  }));

  // Typography
  const typoStyles = data.typography?.styles || [];
  const fontFamilies = new Set();
  const sizes = new Set();
  const weights = new Set();
  const lineHeights = new Set();
  
  for (const style of typoStyles) {
    const fam = style.family || style.fontFamily;
    if (fam) {
      const family = fam.split(',')[0].replace(/['"]/g, '').trim();
      fontFamilies.add(family);
    }
    const sz = style.size || style.fontSize;
    if (sz) sizes.add(sz);
    if (style.weight || style.fontWeight) weights.add(String(style.weight || style.fontWeight));
    if (style.lineHeight) lineHeights.add(style.lineHeight);
  }

  const families = [...fontFamilies];
  tokens.typography.fontFamily.sans = families[0] || 'system-ui';
  tokens.typography.fontFamily.mono = families.find(f => /mono|code|courier/i.test(f)) || null;
  if (families.length > 1 && !tokens.typography.fontFamily.mono) {
    tokens.typography.fontFamily.display = families[1];
  }
  tokens.typography.sizes = [...sizes].sort((a, b) => parseFloat(a) - parseFloat(b));
  tokens.typography.weights = [...weights].sort();
  tokens.typography.lineHeights = [...lineHeights];

  // Border radius
  const rawRadius = data.borderRadius?.values || [];
  // Values can be objects with {value, count} or plain strings
  const radiusParsed = rawRadius.map(v => typeof v === 'object' ? v : { value: v, count: 1 });
  tokens.borderRadius.values = radiusParsed.map(v => v.value);
  
  if (radiusParsed.length > 0) {
    // Most common radius (by count), prefer high confidence, filter out pill/crazy values
    const sane = radiusParsed.filter(v => {
      const num = parseFloat(v.value);
      return !isNaN(num) && num < 100 && num > 0;
    });
    const highConf = sane.filter(v => v.confidence === 'high');
    const pool = highConf.length > 0 ? highConf : (sane.length > 0 ? sane : null);
    if (pool) {
      pool.sort((a, b) => (b.count || 0) - (a.count || 0));
      tokens.borderRadius.default = pool[0].value;
    } else {
      // All values are pill/extreme — default is pill style
      tokens.borderRadius.default = '9999px';
    }
    
    // Also store pill radius if present
    const pill = radiusParsed.find(v => parseFloat(v.value) >= 100);
    if (pill) tokens.borderRadius.pill = pill.value;
  }

  // Shadows
  const rawShadows = Array.isArray(data.shadows) ? data.shadows : (data.shadows?.values || []);
  tokens.shadows = rawShadows.slice(0, 10).map(s => typeof s === 'string' ? s : (s.shadow || s.value || ''));

  // Borders
  tokens.borders = (data.borders?.combinations || []).slice(0, 10).map(b => ({
    width: b.width,
    style: b.style,
    color: b.color,
  }));

  // Spacing
  tokens.spacing = data.spacing?.values || data.spacing || [];

  // Button styles
  tokens.components.buttons = (data.components?.buttons || []).slice(0, 5).map(b => ({
    bg: b.bg,
    color: b.color,
    borderRadius: b.borderRadius,
    padding: b.padding,
    fontSize: b.fontSize,
    fontWeight: b.fontWeight,
    border: b.border,
  }));

  return tokens;
}

// --- Generate CSS variables ---

function generateCSS(tokens) {
  const lines = [
    '/* Design System Tokens — Auto-generated */',
    `/* Source: ${tokens.meta.url} */`,
    `/* Generated: ${tokens.meta.generatedAt} */`,
    '',
    ':root {',
    '  /* === Colors === */',
  ];

  if (tokens.colors.primary) {
    lines.push(`  --color-primary: ${tokens.colors.primary};`);
    for (const [step, hex] of Object.entries(tokens.colors.primaryScale)) {
      lines.push(`  --color-primary-${step}: ${hex};`);
    }
  }

  lines.push(`  --color-background: ${tokens.colors.background};`);
  lines.push(`  --color-foreground: ${tokens.colors.foreground};`);
  
  if (tokens.colors.accent) {
    lines.push(`  --color-accent: ${tokens.colors.accent};`);
  }

  lines.push('');
  lines.push('  /* Neutral scale */');
  for (const [step, hex] of Object.entries(tokens.colors.neutral)) {
    lines.push(`  --color-neutral-${step}: ${hex};`);
  }

  lines.push('');
  lines.push('  /* === Typography === */');
  lines.push(`  --font-sans: '${tokens.typography.fontFamily.sans}', system-ui, sans-serif;`);
  if (tokens.typography.fontFamily.mono) {
    lines.push(`  --font-mono: '${tokens.typography.fontFamily.mono}', monospace;`);
  }
  if (tokens.typography.fontFamily.display) {
    lines.push(`  --font-display: '${tokens.typography.fontFamily.display}', serif;`);
  }

  lines.push('');
  lines.push('  /* === Border Radius === */');
  if (tokens.borderRadius.default) {
    lines.push(`  --radius: ${tokens.borderRadius.default};`);
    lines.push(`  --radius-sm: calc(${tokens.borderRadius.default} * 0.5);`);
    lines.push(`  --radius-lg: calc(${tokens.borderRadius.default} * 1.5);`);
    lines.push(`  --radius-xl: calc(${tokens.borderRadius.default} * 2);`);
  }

  // Shadows
  if (tokens.shadows.length > 0) {
    lines.push('');
    lines.push('  /* === Shadows === */');
    tokens.shadows.forEach((s, i) => {
      const val = typeof s === 'string' ? s : s.value || s.shadow || JSON.stringify(s);
      lines.push(`  --shadow-${i + 1}: ${val};`);
    });
  }

  lines.push('}');

  return lines.join('\n');
}

// --- Generate Tailwind preset ---

function generateTailwindPreset(tokens) {
  const colors = {
    primary: {},
    neutral: {},
    background: tokens.colors.background,
    foreground: tokens.colors.foreground,
  };

  if (tokens.colors.primary) {
    colors.primary.DEFAULT = tokens.colors.primary;
    for (const [step, hex] of Object.entries(tokens.colors.primaryScale)) {
      colors.primary[step] = hex;
    }
  }

  if (tokens.colors.accent) {
    colors.accent = { DEFAULT: tokens.colors.accent };
  }

  for (const [step, hex] of Object.entries(tokens.colors.neutral)) {
    colors.neutral[step] = hex;
  }

  const preset = {
    theme: {
      extend: {
        colors,
        fontFamily: {
          sans: [`'${tokens.typography.fontFamily.sans}'`, 'system-ui', 'sans-serif'],
        },
        borderRadius: {},
      },
    },
  };

  if (tokens.typography.fontFamily.mono) {
    preset.theme.extend.fontFamily.mono = [`'${tokens.typography.fontFamily.mono}'`, 'monospace'];
  }
  if (tokens.typography.fontFamily.display) {
    preset.theme.extend.fontFamily.display = [`'${tokens.typography.fontFamily.display}'`, 'serif'];
  }

  if (tokens.borderRadius.default) {
    preset.theme.extend.borderRadius = {
      DEFAULT: tokens.borderRadius.default,
      sm: `calc(${tokens.borderRadius.default} * 0.5)`,
      lg: `calc(${tokens.borderRadius.default} * 1.5)`,
      xl: `calc(${tokens.borderRadius.default} * 2)`,
    };
  }

  return `/** Tailwind CSS Preset — ${tokens.meta.url} */\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`;
}

// --- Generate README ---

function generateReadme(tokens, domain) {
  return `# ${domain} — Design Tokens

> Auto-extracted from ${tokens.meta.url}
> Generated: ${tokens.meta.generatedAt}

## Files

| File | Description |
|------|-------------|
| \`tokens.json\` | Complete token data (colors, typography, radius, shadows, components) |
| \`tokens.css\` | CSS custom properties — drop into any project |
| \`tailwind.preset.js\` | Tailwind CSS preset — import in tailwind.config.js |

## Quick Start

### Any project (CSS variables)

Copy \`tokens.css\` to your project and import it:

\`\`\`css
@import './tokens.css';
\`\`\`

Then use the variables:

\`\`\`css
.button {
  background: var(--color-primary);
  border-radius: var(--radius);
  font-family: var(--font-sans);
}
\`\`\`

### Tailwind CSS (v3)

\`\`\`js
// tailwind.config.js
module.exports = {
  presets: [require('./tailwind.preset.js')],
  // ... your config
}
\`\`\`

Then use: \`bg-primary\`, \`text-primary-500\`, \`rounded-DEFAULT\`, \`font-sans\`, etc.

### Tailwind CSS (v4)

Import the CSS variables in your main CSS file:

\`\`\`css
@import './tokens.css';
\`\`\`

Tailwind v4 auto-detects CSS variables prefixed with \`--color-*\`.

### React / Next.js

Import the CSS file in your root layout or App component:

\`\`\`tsx
import './tokens.css';
\`\`\`

## Token Summary

- **Primary:** ${tokens.colors.primary || 'N/A'}
- **Background:** ${tokens.colors.background}
- **Foreground:** ${tokens.colors.foreground}
- **Accent:** ${tokens.colors.accent || 'N/A'}
- **Font (sans):** ${tokens.typography.fontFamily.sans}
- **Font (mono):** ${tokens.typography.fontFamily.mono || 'N/A'}
- **Font (display):** ${tokens.typography.fontFamily.display || 'N/A'}
- **Border radius:** ${tokens.borderRadius.default || 'N/A'}
`;
}

// --- Main ---

function processDomain(domain) {
  const extractionDir = path.join(EXTRACTIONS_DIR, domain);
  if (!fs.existsSync(extractionDir)) {
    console.error(`No extraction found for ${domain}`);
    return false;
  }

  // Find latest JSON
  const files = fs.readdirSync(extractionDir).filter(f => f.endsWith('.json')).sort();
  if (files.length === 0) {
    console.error(`No JSON files in ${extractionDir}`);
    return false;
  }

  const jsonPath = path.join(extractionDir, files[files.length - 1]);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  const tokens = extractTokens(data);
  
  // Output dir
  const outDir = path.join(PORTABLE_DIR, domain);
  fs.mkdirSync(outDir, { recursive: true });

  // Write files
  fs.writeFileSync(path.join(outDir, 'tokens.json'), JSON.stringify(tokens, null, 2));
  fs.writeFileSync(path.join(outDir, 'tokens.css'), generateCSS(tokens));
  fs.writeFileSync(path.join(outDir, 'tailwind.preset.js'), generateTailwindPreset(tokens));
  fs.writeFileSync(path.join(outDir, 'README.md'), generateReadme(tokens, domain));

  console.log(`✅ ${domain} → ${outDir}/`);
  console.log(`   Primary: ${tokens.colors.primary}, Font: ${tokens.typography.fontFamily.sans}, Radius: ${tokens.borderRadius.default}`);
  return true;
}

// CLI
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node scripts/generate-portable.cjs <domain>');
  console.log('       node scripts/generate-portable.cjs --all');
  process.exit(1);
}

if (args[0] === '--all') {
  const domains = fs.readdirSync(EXTRACTIONS_DIR).filter(d => 
    fs.statSync(path.join(EXTRACTIONS_DIR, d)).isDirectory()
  );
  console.log(`Generating portable packages for ${domains.length} domains...\n`);
  let ok = 0;
  for (const domain of domains) {
    if (processDomain(domain)) ok++;
  }
  console.log(`\nDone: ${ok}/${domains.length} packages generated in ${PORTABLE_DIR}/`);
} else {
  processDomain(args[0]);
}
