#!/usr/bin/env node
/**
 * generate-portable.cjs
 * 
 * Generates a portable design token package from extraction data.
 * Supports both legacy (dembrandt) and new (designkit browser extraction) formats.
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
  if (hex.length === 8) hex = hex.slice(0, 6); // strip alpha
  const num = parseInt(hex, 16);
  if (isNaN(num)) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(c => Math.round(Math.min(255, Math.max(0, c))).toString(16).padStart(2, '0')).join('');
}

function parseColor(color) {
  if (!color || typeof color !== 'string') return null;
  color = color.trim();
  if (color.startsWith('#')) return hexToRgb(color);
  
  const rgbMatch = color.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
  
  const hslaMatch = color.match(/hsla?\(\s*([\d.]+),?\s*([\d.]+)%?,?\s*([\d.]+)%?/);
  if (hslaMatch) {
    const h = +hslaMatch[1], s = +hslaMatch[2] / 100, l = +hslaMatch[3] / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => { const k = (n + h / 30) % 12; return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); };
    return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
  }
  
  // Named
  if (color === 'red') return { r: 255, g: 0, b: 0 };
  if (color === 'white') return { r: 255, g: 255, b: 255 };
  if (color === 'black') return { r: 0, g: 0, b: 0 };
  
  return null;
}

function colorToHex(color) {
  const rgb = parseColor(color);
  return rgb ? rgbToHex(rgb.r, rgb.g, rgb.b) : null;
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
  if (!base) return {};
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };
  const steps = {
    50: 0.05, 100: 0.1, 200: 0.2, 300: 0.35, 400: 0.55,
    500: 1, 600: 0.15, 700: 0.3, 800: 0.45, 900: 0.6,
  };
  const result = {};
  for (const [step, t] of Object.entries(steps)) {
    const rgb = +step <= 400 ? mixColors(white, base, t) : (+step === 500 ? base : mixColors(base, black, t));
    result[step] = rgbToHex(rgb.r, rgb.g, rgb.b);
  }
  return result;
}

// --- Detect extraction format ---

function isNewFormat(data) {
  return data.light || data.dark || data.fonts?.body || data.mode;
}

// --- Extract from NEW format (designkit browser extraction) ---

function extractFromNew(tokensData, componentsData) {
  // Normalize: could be {light:{...}, dark:{...}} or {mode:"light", fonts:{...}, ...}
  let light, dark;
  if (tokensData.light) {
    light = tokensData.light;
    dark = tokensData.dark || {};
  } else if (tokensData.mode === 'light' || tokensData.fonts) {
    light = tokensData;
    dark = {};
  } else {
    light = {};
    dark = tokensData.dark || {};
  }

  const fonts = light.fonts || tokensData.fonts || {};
  const bg = colorToHex(light.bg || '#ffffff');
  const fg = colorToHex(light.color || '#000000');
  const radius = light.radius || tokensData.radius || null;
  const keyVars = light.keyVars || light.cssVars || {};
  const darkKeyVars = dark.keyVars || dark.cssVars || {};

  // Find primary color: foreground for monochromatic (Vercel-style), or blue/brand
  const blueVar = keyVars['blue-700'] || keyVars['blue-600'] || keyVars['blue-500'];
  const primaryHex = colorToHex(blueVar) || fg;

  // Font parsing
  const fontSans = (fonts.body || 'system-ui').split(',')[0].replace(/['"]/g, '').trim();
  const fontMono = (fonts.mono || '').split(',')[0].replace(/['"]/g, '').trim() || null;

  // Build semantic colors from keyVars
  const semanticColors = {};
  for (const [key, value] of Object.entries(keyVars)) {
    const hex = colorToHex(value);
    if (hex) semanticColors[key] = hex;
  }

  // Gray scale from keyVars
  const grayScale = {};
  for (const [key, value] of Object.entries(keyVars)) {
    const grayMatch = key.match(/^gray-(\d+)$/);
    if (grayMatch) {
      const hex = colorToHex(value);
      if (hex) grayScale[grayMatch[1]] = hex;
    }
  }

  // Dark mode colors
  const darkColors = {};
  for (const [key, value] of Object.entries(darkKeyVars)) {
    const hex = colorToHex(value);
    if (hex) darkColors[key] = hex;
  }
  const darkBg = colorToHex(dark.bg) || '#000000';
  const darkFg = colorToHex(dark.color) || '#ffffff';

  // Component specs
  let componentSpecs = {};
  if (componentsData) {
    const cl = componentsData.light || componentsData;
    const cd = componentsData.dark || {};
    componentSpecs = { light: cl, dark: cd };
  }

  // Build tokens
  const tokens = {
    meta: {
      format: 'designkit-v2',
      generatedAt: new Date().toISOString(),
    },
    colors: {
      primary: primaryHex,
      primaryScale: generateScale(primaryHex),
      background: bg,
      foreground: fg,
      accent: colorToHex(blueVar) || colorToHex(keyVars['focus-color']) || null,
      link: colorToHex(keyVars['link-color']) || colorToHex(blueVar) || null,
      error: colorToHex(keyVars['error']) || null,
      warning: colorToHex(keyVars['warning']) || null,
      success: colorToHex(keyVars['success']) || null,
      gray: grayScale,
      semantic: semanticColors,
      dark: { background: darkBg, foreground: darkFg, colors: darkColors },
    },
    typography: {
      fontFamily: { sans: fontSans, mono: fontMono, display: null },
      baseSize: fonts.size || '16px',
      baseLineHeight: fonts.lineHeight || '1.5',
      sizes: [],
      weights: [],
    },
    borderRadius: {
      default: radius || '6px',
      values: [],
    },
    layout: {
      sidebarWidth: light.sidebarWidth || tokensData.sidebarWidth || null,
      headerHeight: light.headerHeight || tokensData.headerHeight || null,
      pageWidth: light.pageWidth || tokensData.pageWidth || null,
      formHeight: light.formHeight || tokensData.formHeight || null,
    },
    shadows: [],
    components: componentSpecs,
  };

  // Extract unique sizes/weights from components
  if (componentsData) {
    const sizes = new Set();
    const weights = new Set();
    const allComps = Object.values(componentsData.light || componentsData);
    for (const comp of allComps) {
      if (typeof comp !== 'object') continue;
      if (comp.fontSize) sizes.add(comp.fontSize);
      if (comp.fontWeight) weights.add(comp.fontWeight);
    }
    tokens.typography.sizes = [...sizes].sort((a, b) => parseFloat(a) - parseFloat(b));
    tokens.typography.weights = [...weights].sort();
  }

  // Extract border radius values from components
  if (componentsData) {
    const radii = new Set();
    const allComps = Object.values(componentsData.light || componentsData);
    for (const comp of allComps) {
      if (typeof comp !== 'object') continue;
      if (comp.borderRadius) radii.add(comp.borderRadius);
    }
    tokens.borderRadius.values = [...radii];
  }

  return tokens;
}

// --- Extract from LEGACY format (dembrandt) ---

function extractFromLegacy(data) {
  // [existing extractTokens logic, simplified]
  const tokens = {
    meta: { format: 'legacy', url: data.url, generatedAt: new Date().toISOString() },
    colors: {
      primary: null, primaryScale: {}, background: '#ffffff', foreground: '#000000',
      accent: null, link: null, error: null, warning: null, success: null,
      gray: {}, semantic: {}, dark: {},
    },
    typography: {
      fontFamily: { sans: 'system-ui', mono: null, display: null },
      baseSize: '16px', baseLineHeight: '1.5', sizes: [], weights: [],
    },
    borderRadius: { default: null, values: [] },
    layout: {},
    shadows: [],
    components: {},
  };

  const palette = (data.colors?.palette || []).filter(c => c.confidence === 'high');
  const semanticPrimary = data.colors?.semantic?.primary;
  const buttonBg = data.components?.buttons?.[0]?.bg;
  const primaryRaw = semanticPrimary || buttonBg || palette[0]?.color;
  const primaryHex = colorToHex(primaryRaw);
  
  if (primaryHex) {
    tokens.colors.primary = primaryHex;
    tokens.colors.primaryScale = generateScale(primaryHex);
  }

  for (const p of palette) {
    const rgb = parseColor(p.color);
    if (!rgb) continue;
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    if (brightness > 200 && tokens.colors.background === '#ffffff') tokens.colors.background = hex;
    if (brightness < 80 && tokens.colors.foreground === '#000000') tokens.colors.foreground = hex;
  }

  for (const p of palette) {
    const hex = colorToHex(p.color);
    if (hex && hex !== tokens.colors.primary && hex !== tokens.colors.background && hex !== tokens.colors.foreground) {
      tokens.colors.accent = hex;
      break;
    }
  }

  const typoStyles = data.typography?.styles || [];
  const families = new Set();
  const sizes = new Set();
  const weights = new Set();
  for (const s of typoStyles) {
    const fam = (s.family || s.fontFamily || '').split(',')[0].replace(/['"]/g, '').trim();
    if (fam) families.add(fam);
    if (s.size || s.fontSize) sizes.add(s.size || s.fontSize);
    if (s.weight || s.fontWeight) weights.add(String(s.weight || s.fontWeight));
  }
  const fams = [...families];
  tokens.typography.fontFamily.sans = fams[0] || 'system-ui';
  tokens.typography.fontFamily.mono = fams.find(f => /mono|code|courier/i.test(f)) || null;
  tokens.typography.sizes = [...sizes].sort((a, b) => parseFloat(a) - parseFloat(b));
  tokens.typography.weights = [...weights].sort();

  const rawRadius = Array.isArray(data.borderRadius?.values) ? data.borderRadius.values : [];
  const radiusParsed = rawRadius.map(v => typeof v === 'object' ? v : { value: v, count: 1 });
  tokens.borderRadius.values = radiusParsed.map(v => v.value);
  const sane = radiusParsed.filter(v => { const n = parseFloat(v.value); return !isNaN(n) && n < 100 && n > 0; });
  if (sane.length) {
    sane.sort((a, b) => (b.count || 0) - (a.count || 0));
    tokens.borderRadius.default = sane[0].value;
  }

  tokens.shadows = (Array.isArray(data.shadows) ? data.shadows : (data.shadows?.values || []))
    .slice(0, 10).map(s => typeof s === 'string' ? s : (s.shadow || s.value || ''));

  return tokens;
}

// --- Generate CSS ---

function generateCSS(tokens) {
  const lines = [
    '/* Design System Tokens — Auto-generated */',
    `/* Format: ${tokens.meta.format} | Generated: ${tokens.meta.generatedAt} */`,
    '',
    ':root {',
  ];

  // Colors
  lines.push('  /* === Colors === */');
  if (tokens.colors.primary) lines.push(`  --color-primary: ${tokens.colors.primary};`);
  lines.push(`  --color-background: ${tokens.colors.background};`);
  lines.push(`  --color-foreground: ${tokens.colors.foreground};`);
  if (tokens.colors.accent) lines.push(`  --color-accent: ${tokens.colors.accent};`);
  if (tokens.colors.link) lines.push(`  --color-link: ${tokens.colors.link};`);
  if (tokens.colors.error) lines.push(`  --color-error: ${tokens.colors.error};`);
  if (tokens.colors.warning) lines.push(`  --color-warning: ${tokens.colors.warning};`);
  if (tokens.colors.success) lines.push(`  --color-success: ${tokens.colors.success};`);

  // Primary scale
  if (tokens.colors.primary && Object.keys(tokens.colors.primaryScale).length) {
    lines.push('');
    lines.push('  /* Primary scale */');
    for (const [step, hex] of Object.entries(tokens.colors.primaryScale)) {
      lines.push(`  --color-primary-${step}: ${hex};`);
    }
  }

  // Gray scale
  if (Object.keys(tokens.colors.gray).length) {
    lines.push('');
    lines.push('  /* Gray scale */');
    for (const [step, hex] of Object.entries(tokens.colors.gray)) {
      lines.push(`  --color-gray-${step}: ${hex};`);
    }
  }

  // Typography
  lines.push('');
  lines.push('  /* === Typography === */');
  lines.push(`  --font-sans: '${tokens.typography.fontFamily.sans}', system-ui, sans-serif;`);
  if (tokens.typography.fontFamily.mono) {
    lines.push(`  --font-mono: '${tokens.typography.fontFamily.mono}', monospace;`);
  }
  lines.push(`  --font-size-base: ${tokens.typography.baseSize};`);
  lines.push(`  --line-height-base: ${tokens.typography.baseLineHeight};`);

  // Border radius
  lines.push('');
  lines.push('  /* === Border Radius === */');
  if (tokens.borderRadius.default) {
    lines.push(`  --radius: ${tokens.borderRadius.default};`);
    lines.push(`  --radius-sm: calc(${tokens.borderRadius.default} * 0.5);`);
    lines.push(`  --radius-lg: calc(${tokens.borderRadius.default} * 1.5);`);
    lines.push(`  --radius-xl: calc(${tokens.borderRadius.default} * 2);`);
    lines.push(`  --radius-full: 9999px;`);
  }

  // Layout
  if (tokens.layout && Object.values(tokens.layout).some(v => v)) {
    lines.push('');
    lines.push('  /* === Layout === */');
    if (tokens.layout.sidebarWidth) lines.push(`  --sidebar-width: ${tokens.layout.sidebarWidth};`);
    if (tokens.layout.headerHeight) lines.push(`  --header-height: ${tokens.layout.headerHeight};`);
    if (tokens.layout.pageWidth) lines.push(`  --page-width: ${tokens.layout.pageWidth};`);
    if (tokens.layout.formHeight) lines.push(`  --form-height: ${tokens.layout.formHeight};`);
  }

  // Shadows
  if (tokens.shadows.length) {
    lines.push('');
    lines.push('  /* === Shadows === */');
    tokens.shadows.forEach((s, i) => {
      lines.push(`  --shadow-${i + 1}: ${typeof s === 'string' ? s : JSON.stringify(s)};`);
    });
  }

  lines.push('}');

  // Dark mode
  if (tokens.colors.dark && tokens.colors.dark.background) {
    lines.push('');
    lines.push('.dark {');
    lines.push(`  --color-background: ${tokens.colors.dark.background};`);
    lines.push(`  --color-foreground: ${tokens.colors.dark.foreground};`);
    if (tokens.colors.dark.colors) {
      for (const [key, hex] of Object.entries(tokens.colors.dark.colors)) {
        const grayMatch = key.match(/^gray-(\d+)$/);
        if (grayMatch) lines.push(`  --color-gray-${grayMatch[1]}: ${hex};`);
      }
    }
    lines.push('}');
  }

  return lines.join('\n');
}

// --- Generate Tailwind preset ---

function generateTailwindPreset(tokens) {
  const colors = {
    primary: {},
    background: tokens.colors.background,
    foreground: tokens.colors.foreground,
  };

  if (tokens.colors.primary) {
    colors.primary.DEFAULT = tokens.colors.primary;
    for (const [step, hex] of Object.entries(tokens.colors.primaryScale)) {
      colors.primary[step] = hex;
    }
  }
  if (tokens.colors.accent) colors.accent = { DEFAULT: tokens.colors.accent };
  if (tokens.colors.link) colors.link = tokens.colors.link;
  if (tokens.colors.error) colors.error = tokens.colors.error;
  if (tokens.colors.warning) colors.warning = tokens.colors.warning;
  if (tokens.colors.success) colors.success = tokens.colors.success;

  // Gray scale
  if (Object.keys(tokens.colors.gray).length) {
    colors.gray = {};
    for (const [step, hex] of Object.entries(tokens.colors.gray)) {
      colors.gray[step] = hex;
    }
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

  if (tokens.borderRadius.default) {
    preset.theme.extend.borderRadius = {
      DEFAULT: tokens.borderRadius.default,
      sm: `calc(${tokens.borderRadius.default} * 0.5)`,
      lg: `calc(${tokens.borderRadius.default} * 1.5)`,
      xl: `calc(${tokens.borderRadius.default} * 2)`,
      full: '9999px',
    };
  }

  const domain = tokens.meta.url || 'unknown';
  return `/** Tailwind CSS Preset — ${domain} */\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`;
}

// --- Generate README ---

function generateReadme(tokens, domain) {
  const fontStr = tokens.typography.fontFamily.sans;
  const monoStr = tokens.typography.fontFamily.mono || 'N/A';
  const grayKeys = Object.keys(tokens.colors.gray);
  const hasDark = !!(tokens.colors.dark && tokens.colors.dark.background);

  return `# ${domain} — Design Tokens

> Auto-generated: ${tokens.meta.generatedAt}
> Format: ${tokens.meta.format}

## Summary

- **Primary:** ${tokens.colors.primary || 'N/A'}
- **Background:** ${tokens.colors.background}
- **Foreground:** ${tokens.colors.foreground}
- **Accent:** ${tokens.colors.accent || 'N/A'}
- **Link:** ${tokens.colors.link || 'N/A'}
- **Error:** ${tokens.colors.error || 'N/A'}
- **Warning:** ${tokens.colors.warning || 'N/A'}
- **Success:** ${tokens.colors.success || 'N/A'}
- **Gray scale:** ${grayKeys.length ? grayKeys.join(', ') : 'N/A'}
- **Dark mode:** ${hasDark ? 'Yes' : 'No'}
- **Font (sans):** ${fontStr}
- **Font (mono):** ${monoStr}
- **Base size:** ${tokens.typography.baseSize}
- **Border radius:** ${tokens.borderRadius.default || 'N/A'}
${tokens.layout.sidebarWidth ? `- **Sidebar:** ${tokens.layout.sidebarWidth}` : ''}
${tokens.layout.pageWidth ? `- **Page width:** ${tokens.layout.pageWidth}` : ''}

## Files

| File | Description |
|------|-------------|
| \`tokens.json\` | Complete token data (colors, typography, radius, layout, components) |
| \`tokens.css\` | CSS custom properties (light + dark) |
| \`tailwind.preset.js\` | Tailwind CSS preset |
| \`components.json\` | Component-level specs (if available) |

## Usage

### CSS
\`\`\`css
@import './tokens.css';
\`\`\`

### Tailwind v3
\`\`\`js
// tailwind.config.js
module.exports = { presets: [require('./tailwind.preset.js')] }
\`\`\`

### Tailwind v4
\`\`\`css
@import './tokens.css';
/* v4 auto-detects --color-* variables */
\`\`\`

### AI Agents
Feed \`tokens.css\`, \`components.json\`, and screenshots to your agent.
\`components.json\` has concrete numeric specs — no ambiguous adjectives.
`;
}

// --- Main ---

function processDomain(domain) {
  const extractionDir = path.join(EXTRACTIONS_DIR, domain);
  if (!fs.existsSync(extractionDir)) {
    console.error(`No extraction found for ${domain}`);
    return false;
  }

  const files = fs.readdirSync(extractionDir).filter(f => f.endsWith('.json')).sort();
  if (files.length === 0) {
    console.error(`No JSON files in ${extractionDir}`);
    return false;
  }

  // Find tokens file (prefer tokens-raw.json, tokens-raw-light.json)
  const tokensFile = files.find(f => f.includes('tokens')) || files[0];
  const tokensPath = path.join(extractionDir, tokensFile);
  const tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

  // Find components file if exists
  const compsFile = files.find(f => f.includes('components'));
  let componentsData = null;
  if (compsFile) {
    componentsData = JSON.parse(fs.readFileSync(path.join(extractionDir, compsFile), 'utf-8'));
  }

  // Detect format and extract
  let tokens;
  if (isNewFormat(tokensData)) {
    tokens = extractFromNew(tokensData, componentsData);
  } else {
    tokens = extractFromLegacy(tokensData);
  }
  tokens.meta.url = domain;

  // Output dir
  const outDir = path.join(PORTABLE_DIR, domain);
  fs.mkdirSync(outDir, { recursive: true });

  // Write files (preserve existing files like components.json, screenshots/, README.md)
  fs.writeFileSync(path.join(outDir, 'tokens.json'), JSON.stringify(tokens, null, 2));
  fs.writeFileSync(path.join(outDir, 'tokens.css'), generateCSS(tokens));
  fs.writeFileSync(path.join(outDir, 'tailwind.preset.js'), generateTailwindPreset(tokens));
  
  // Only write README if it doesn't exist (don't overwrite hand-crafted ones)
  const readmePath = path.join(outDir, 'README.md');
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, generateReadme(tokens, domain));
  }

  console.log(`✅ ${domain} → ${outDir}/`);
  console.log(`   Primary: ${tokens.colors.primary}, Font: ${tokens.typography.fontFamily.sans}, Radius: ${tokens.borderRadius.default}`);
  if (Object.keys(tokens.colors.gray).length) console.log(`   Gray scale: ${Object.keys(tokens.colors.gray).length} steps`);
  if (tokens.colors.dark?.background) console.log(`   Dark mode: bg=${tokens.colors.dark.background}, fg=${tokens.colors.dark.foreground}`);
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
