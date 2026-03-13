---
name: designkit
description: "Extract complete design systems from web applications and generate dedicated Next.js + shadcn styleguide projects with component development. Use when user wants to: analyze a website's design tokens, extract a design system, copy a site's visual style, reverse-engineer a brand's design language, add components to a styleguide, or create new UI components. Triggers on: 'extract design system from', 'analyze the design of', 'get the colors/fonts from', 'extract design tokens from', 'extract design', 'list styleguides', 'show the styleguide', 'add component', 'create a component', 'new component for', or when user shares a URL asking about its visual design."
---

# Extract Design System (App Extraction + shadcn styleguide)

Extract complete design tokens from a web **application** (not landing pages) via authenticated browser extraction, then generate a dedicated Next.js + shadcn/ui styleguide project with the tokens applied.

## ⚠️ CRITICAL RULE: App-First Extraction

**Extraction MUST happen inside the authenticated application UI.** Landing pages use marketing-specific styles that do NOT reflect the real product design system.

- The **only** use for the landing page (Playwright screenshot script) is to capture a screenshot for the hub card thumbnail.
- All token extraction (colors, typography, spacing, radius, shadows, CSS variables) comes from the **app UI**.
- If you cannot access the authenticated app, **return an error with the reason** — do NOT fall back to landing page extraction as a substitute.

### Error Cases
If access to the app fails, reply with:
```
❌ Cannot extract design system from <domain>
Reason: <specific reason>
- Could not authenticate (no credentials, login flow blocked, etc.)
- Browser relay not connected
- App requires SSO/enterprise auth not available
- etc.
```
Do NOT generate a styleguide from landing page tokens. That produces incorrect results.

## Prerequisites

- `playwright` — used for LP screenshots via `scripts/screenshot.cjs`
- screenshot script at `~/design-system-hub/scripts/screenshot.cjs`
- Tailscale network: `100.109.88.111`
- Browser access (Chrome relay or OpenClaw browser)

## Storage

```
~/design-system-hub/
  ├── extractions/        ← raw browser tokens by domain
  │   ├── app.linear.app/
  │   │   └── tokens-raw.json     ← browser-extracted tokens
  │   └── app.cal.com/
  │       └── tokens-raw.json
  ├── portable/           ← portable token packages (framework-agnostic)
  │   ├── linear.app/
  │   │   ├── tokens.json
  │   │   ├── tokens.css
  │   │   ├── tailwind.preset.js
  │   │   └── README.md
  │   └── cal.com/
  ├── screenshots/        ← LP screenshots for hub cards
  │   └── cal.com.png
  └── styleguides/        ← dedicated Next.js projects by domain
      ├── linear.app/
      └── cal.com/
```

## Commands

### 1. Extract: "extraia o design system de <URL>" / "extract design de <URL>"

This is the PRIMARY command. It extracts from the **authenticated app UI**.

#### Step 1: Access the app

Determine the app URL (e.g., `https://app.cal.com`, `https://app.linear.app`, `https://dashboard.stripe.com`).

**Authentication methods (try in order):**
1. **Browser relay (Chrome extension):** Use `profile="chrome"` — user must have the tab attached via OpenClaw Browser Relay toolbar icon. Best when user is already logged in.
2. **Auto-auth:** If credentials are available (e.g., free signup, magic link via email), handle auth programmatically using the OpenClaw browser.
3. **Ask user:** If neither works, ask the user to log in and attach the tab.

**If none of these work → return error.** Do NOT fall back to landing page extraction.

#### Step 2: Navigate to key app pages

Once authenticated, navigate to 3-5 representative pages to capture the full token set:
- Main dashboard / home
- A detail view (e.g., event detail, project detail)
- Settings page
- A form or creation flow
- Any page with rich UI (tables, charts, modals)

Take screenshots of each page for reference.

#### Step 3: Extract tokens via JavaScript evaluation

Run this on each page to capture all CSS custom properties and computed styles:

```javascript
(() => {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const body = getComputedStyle(document.body);
  const allVars = [];
  for (let i = 0; i < styles.length; i++) {
    if (styles[i].startsWith('--') && !styles[i].startsWith('--sx-')) {
      const val = styles.getPropertyValue(styles[i]).trim();
      if (val) allVars.push({ name: styles[i], value: val });
    }
  }
  const fonts = {
    body: body.fontFamily,
    size: body.fontSize,
    lineHeight: body.lineHeight
  };
  const bg = body.backgroundColor;
  const color = body.color;
  return JSON.stringify({ cssVars: allVars, fonts, bg, color }, null, 2);
})();
```

Use the browser tool's `evaluate` action. Merge results from multiple pages to get the complete token set.

#### Step 4: Save raw tokens

Save the extracted data to `~/design-system-hub/extractions/<app-domain>/tokens-raw.json`.

#### Step 5: Handle lch() and modern color values

Modern apps often use `lch()`, `oklch()`, or `lab()` color spaces in CSS variables:
- **If target stack supports it:** Use lch()/oklch() values as-is
- **For broader compatibility:** Convert to hex or hsl
- **In globals.css:** Comment the original color space value alongside converted values
- **In portable tokens:** Include both original and converted values

#### Step 6: Map tokens to shadcn theme

Map the extracted CSS variables to the shadcn theme structure in `globals.css`:
- Group variables by purpose (colors, spacing, typography, borders, shadows)
- Identify semantic patterns (e.g., `--color-bg-primary`, `--color-text-secondary`)
- Map to shadcn's `--primary`, `--secondary`, `--muted`, `--accent`, etc.
- Preserve any additional tokens as extra CSS variables for fidelity

#### Step 7: Create the styleguide project

```bash
cd ~/design-system-hub/styleguides
npx create-next-app@latest <domain> --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack --yes
cd <domain>
npx shadcn@latest init -y --defaults
npx shadcn@latest add card badge alert separator tabs switch label button input select textarea dialog sonner navigation-menu table accordion dropdown-menu command chart -y
```

> **Note:** shadcn v2+ uses base-ui, NOT radix. Components do NOT support `asChild` prop. Use `render` prop or controlled state (useState + onClick) instead of `<DialogTrigger asChild>`.

#### Step 8: Generate `globals.css` with extracted tokens

Map app tokens to shadcn variables:
- Map primary color → `--primary` + generate 50-900 scale
- Map neutral colors → grey scale 50-900
- Map semantic colors (success, warning, error, info)
- Map border, border-radius, shadows
- Include dark mode with inverted values
- Set font-feature-settings if extracted

#### Step 9: Create styleguide pages

1. **Token showcase** at `/app/styleguide/page.tsx`:
   - Color palette (primary scale, grey scale, semantic)
   - Typography specimens at extracted sizes/weights
   - Border radius examples
   - Shadow examples
   - Basic components: Button (all variants + custom site buttons), Card, Badge, Alert
   - Dark mode toggle
   - Design Summary (primary color, font, style, radius, feel)

2. **Sidebar layout** with navigation (token showcase + all component pages)

3. **10 component showcase pages** (one page per component):

   Each page goes in `/app/styleguide/components/[name]/page.tsx` with multiple variants, all states (default, hover, focus, disabled), dark mode support.

   **Style components to match the app's aesthetic feel**, not just apply tokens mechanically. Study the app's UI patterns (rounded vs sharp, dense vs spacious, vibrant vs muted) and reflect that character in how you style each component.

   **Default component set (create all of these):**

   | Component | Page path | Variants to show |
   |-----------|-----------|-----------------|
   | **Form** | `components/form/page.tsx` | Input + Label, Select, Textarea, validation states (error, success), disabled state |
   | **Dialog** | `components/dialog/page.tsx` | Basic modal, with form, confirmation dialog, scrollable content |
   | **Toast** | `components/toast/page.tsx` | Success, error, warning, info variants, with action button |
   | **Navigation Menu** | `components/navigation-menu/page.tsx` | Horizontal nav with links, active state, dropdown sub-menus |
   | **Data Table** | `components/data-table/page.tsx` | Basic table, striped rows, sortable headers, pagination controls |
   | **Cards** | `components/cards/page.tsx` | Product card, feature card, pricing card (3 tiers) |
   | **Tabs** | `components/tabs/page.tsx` | Horizontal tabs, vertical tabs, with icons, disabled tab |
   | **Dropdown Menu** | `components/dropdown-menu/page.tsx` | Basic menu, with icons, nested sub-menu, with keyboard shortcuts |
   | **Command Palette** | `components/command-palette/page.tsx` | Search overlay (⌘K), grouped items, with icons |
   | **Charts** | `components/charts/page.tsx` | Bar chart, area chart, radar chart using site's color tokens |

   All components MUST use the extracted design tokens from `globals.css`. Style them to match the original app's aesthetic (radius, colors, fonts, shadows).

4. **Navigation** at `/lib/navigation.ts` with all component pages organized in sections.

#### Step 10: Generate portable token package

```bash
cd ~/design-system-hub
node scripts/generate-portable.cjs <domain>
```

This creates `portable/<domain>/` with:
- `tokens.json` — structured token data
- `tokens.css` — CSS custom properties (works in any project)
- `tailwind.preset.js` — Tailwind CSS preset
- `README.md` — usage instructions

#### Step 11: Capture LP screenshot (for hub card only)

```bash
cd ~/design-system-hub
node index.js <domain> --save-output --no-sandbox
```

Save a screenshot to `~/design-system-hub/screenshots/<domain>.png`. This is ONLY for the hub card thumbnail, NOT for token extraction.

#### Step 12: Build and verify

```bash
cd ~/design-system-hub/styleguides/<domain>
npx next build
```

DO NOT start the dev server. Just verify it builds clean.

#### Step 13: Reply with summary

- Tokens extracted (colors, fonts, radius, shadows)
- Components generated (list all 10)
- Portable package location
- Any issues or notes

### 2. List: "lista styleguides"

```bash
ls ~/design-system-hub/styleguides/
```

Reply with domain list + extraction dates.

### 3. Show: "mostra o styleguide do <domain>"

1. Start the project:
```bash
cd ~/design-system-hub/styleguides/<domain>
PORT=3200 npx next dev --hostname 0.0.0.0 &
```

2. Reply with link: `http://100.109.88.111:3200/styleguide`

3. After user is done (or after ~30 min), kill the process.

### 4. Stop: "derruba o styleguide"

Kill the running next dev process on port 3200.

### 5. Export: "exporta tokens do <domain>" / "pacote portável do <domain>"

Generate or regenerate the portable token package:
```bash
cd ~/design-system-hub
node scripts/generate-portable.cjs <domain>
```

Reply with file paths and summary.
To regenerate all: `node scripts/generate-portable.cjs --all`

### 6. Use in project: "usa o design do <domain> no projeto"

Guide the user on how to integrate:

**React + Tailwind (v3):**
```js
// tailwind.config.js
module.exports = {
  presets: [require('./path/to/tailwind.preset.js')],
}
```

**Tailwind v4 / any CSS project:**
```css
@import './path/to/tokens.css';
```

**Copy files from:** `~/design-system-hub/portable/<domain>/`

### 7. Add Component: "add [component] to <domain>" / "create [component] for <domain>"

Add a new component to an existing styleguide project.

#### Step 1: Check if component exists in shadcn

- Component exists → install with `npx shadcn@latest add [name]`
- Component doesn't exist → build custom using shadcn primitives + extracted tokens

#### Step 2: Install or build

If shadcn component:
```bash
cd ~/design-system-hub/styleguides/<domain>
npx shadcn@latest add [component-name]
```

If custom, build using:
- CSS variables from `globals.css`
- Tailwind classes referencing CSS variables
- shadcn's patterns for consistency

#### Step 3: Create component showcase

Add to `/app/styleguide/components/[component-name]/page.tsx`:
- All variants side by side
- All states (default, hover, focus, disabled, loading)
- Dark mode preview
- Code examples

#### Step 4: Update navigation

Add to `/lib/navigation.ts` in the Components section.

#### Rules

- **CSS variables** from `globals.css` are the source of truth
- **Extend, don't rebuild** — customize shadcn components
- **No `asChild`** — shadcn v2+ uses base-ui, use `render` prop or controlled state
- After adding, reply with: component name, location, variants, showcase page path

## Token Mapping: Browser Extraction → shadcn

| Extracted CSS Variable Pattern | shadcn |
|-------------------------------|--------|
| `--color-bg-*`, `--bg-*` | --background, --card, --muted |
| `--color-text-*`, `--text-*` | --foreground, --muted-foreground |
| `--color-primary-*`, `--accent-*` | --primary, --accent |
| `--color-border-*`, `--border-*` | --border, --input |
| `--radius-*`, `--border-radius-*` | --radius |
| `--shadow-*`, `--elevation-*` | --shadow-* (custom) |
| `--font-*`, `--typography-*` | --font-sans, --font-mono |
| `--space-*`, `--spacing-*` | spacing scale (custom) |

For semantic color tokens:
- `--color-success-*` → --success, --success-foreground
- `--color-warning-*` → --warning, --warning-foreground
- `--color-error-*` / `--color-danger-*` → --destructive, --destructive-foreground
- `--color-info-*` → --info, --info-foreground

## Reference Project

See `~/design-system-hub/styleguides/vercel.com/` as the reference implementation for project structure, globals.css format, layout, and component pages.

## Notes

- One project per domain, stored on disk
- Styleguides are static exports (`output: "export"`) — no dev servers needed
- nginx serves static exports at `/s/<domain>/` via symlinks in `~/design-system-hub/static/`
- Google Fonts loaded via `next/font/google` in layout.tsx
- Custom fonts (not on Google Fonts) fall back to declared fallback
- **lch() colors:** Convert to hex/hsl for portable tokens, keep originals in comments
- **shadcn v2+:** Uses base-ui, NOT radix. No `asChild` prop. Use `render` prop or controlled state.
- **NEVER extract from landing page for tokens.** LP = screenshot only.
- **If app access fails → error, not fallback.**

## ⚠️ Known Issues & Workarounds

### Dark Mode in Tailwind v4
`@theme inline` declarations have higher precedence than `@layer base` overrides. For dark mode to work:
- Define light/dark colors as CSS variables in `:root` / `.dark` (using HSL values)
- Reference them in `@theme inline` via `hsl(var(--variable-name))`
- DO NOT put dark mode overrides inside `@layer base { .dark { } }` with `@theme inline` colors — they won't override

**Correct pattern:**
```css
:root { --background: 0 0% 100%; }
.dark { --background: 220 20% 3%; }
@theme inline { --color-background: hsl(var(--background)); }
```

### Screenshots in Hub
- Next.js 404s on files with dots in name (e.g., `cal.com.jpg`) — interprets `.com` as route extension
- Solution: nginx serves `/screenshots/` directly from filesystem (bypasses Next.js)
- Screenshots use `?v=` cache-buster to avoid stale 404 cached by CDN/browser

### Hub Startup
- `nohup` alone is not enough — process gets killed by shell cleanup
- Use `setsid npx next start -p 3100 </dev/null &>/tmp/hub.log &` for full detachment

### Static Export Config
Each styleguide needs in `next.config.ts`:
```ts
{ output: "export", basePath: "/s/<domain>", images: { unoptimized: true } }
```
And a symlink: `~/design-system-hub/static/<domain> → styleguides/<domain>/out`

## Why App-First Extraction Matters

Extracting from the authenticated app UI (not landing pages) produces dramatically better results:

1. **Real tokens:** App UI uses the actual design system. Landing pages use one-off marketing styles.
2. **Semantic tokens:** Apps have success/error/warning/info patterns. LPs often don't.
3. **Component patterns:** Sidebars, tables, forms, modals — all from real usage.
4. **Dark mode:** Most apps support dark mode natively. LP dark mode is rare.
5. **Full palette:** Apps expose 50→900 scales, visualization colors, chart palettes.
6. **Typography scale:** Apps have structured scales (micro→title1). LPs use arbitrary sizes.

When an AI agent has browser access to the authenticated application, extraction quality is significantly higher than any public page analysis tool can achieve.
