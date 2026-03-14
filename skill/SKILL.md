---
name: designkit
description: "Extract complete design systems from web applications and generate dedicated Next.js + shadcn styleguide projects with component development. Use when user wants to: analyze a website's design tokens, extract a design system, copy a site's visual style, reverse-engineer a brand's design language, add components to a styleguide, or create new UI components. Triggers on: 'extract design system from', 'analyze the design of', 'get the colors/fonts from', 'extract design tokens from', 'extract design', 'list styleguides', 'show the styleguide', 'add component', 'create a component', 'new component for', or when user shares a URL asking about its visual design."
---

# Extract Design System (App Extraction + shadcn styleguide)

Extract complete design tokens AND component-level specs from a web **application** (not landing pages) via authenticated browser extraction, then generate a dedicated Next.js + shadcn/ui styleguide project that **visually matches** the original app.

## ⚡ OPTIMIZATION ASSETS (read these first for efficiency)

- **`SKILL-COMPACT.md`** — 100-line quick reference. Read this INSTEAD of full SKILL.md when you already know the flow.
- **`extract-all.js`** — Single comprehensive extraction script. Run ONCE per page instead of multiple evaluate calls.
- **`templates/`** — Reusable TSX templates for component pages. Copy + customize instead of generating from scratch.
  - `layout.tsx.template` — Sidebar layout (replace `{{BRAND}}`)
  - `navigation.ts.template` — Standard nav config (no changes needed)
  - `form.tsx.template` — Form page with `{{PLACEHOLDER}}` markers

### Token Budget Guidelines
- Use **snapshot** (text) for navigation/structure — **screenshot** (image) only for visual captures (max 5)
- Read SKILL-COMPACT.md (~2k tokens) instead of full SKILL.md (~10k tokens) for repeat extractions
- Use `extract-all.js` script: 1 evaluate call per page instead of 3-4
- Copy templates instead of generating component pages from scratch (~20k token savings)

## ⚠️ CRITICAL RULES

### Rule 1: App-First Extraction
**Extraction MUST happen inside the authenticated application UI.** Landing pages use marketing-specific styles that do NOT reflect the real product design system.

- The **only** use for the landing page is to capture a screenshot for the hub card thumbnail.
- All token extraction comes from the **app UI**.
- If you cannot access the authenticated app, **return an error** — do NOT fall back to landing page extraction.

### Rule 2: Tokens ≠ Aesthetics
**CSS variables alone do NOT reproduce a design system's identity.** A shadcn project with correct colors but default component styling will NOT look like the original app. You MUST also extract component-level specs (border-radius, padding, border-width, font-weight, density, shadows) and apply them as overrides.

### Error Cases
If access to the app fails:
```
❌ Cannot extract design system from <domain>
Reason: <specific reason>
```
Do NOT generate a styleguide from landing page tokens.

## Prerequisites

- `playwright` — used for LP screenshots via `scripts/screenshot.cjs`
- screenshot script at `~/design-system-hub/scripts/screenshot.cjs`
- Tailscale network: `100.109.88.111`
- Browser access (Chrome relay or OpenClaw browser)

## Storage

```
~/design-system-hub/
  ├── extractions/        ← raw browser tokens by domain
  │   └── app.<domain>/
  │       ├── tokens-raw.json       ← CSS variables
  │       └── components-raw.json   ← component computed styles
  ├── portable/           ← portable token packages (framework-agnostic)
  │   └── <domain>/
  │       ├── tokens.json           ← global design tokens
  │       ├── tokens.css            ← CSS custom properties
  │       ├── components.json       ← component-level specs (NEW)
  │       ├── screenshots/          ← annotated app screenshots (NEW)
  │       └── README.md             ← usage guide for humans + AI agents
  ├── public/screenshots/ ← LP screenshots for hub cards
  └── styleguides/        ← dedicated Next.js projects by domain
```

## Commands

### 1. Extract: "extraia o design system de <URL>"

#### Step 1: Access the app

Determine the app URL. Authentication methods (try in order):
1. **Browser on node:** Use `target=node` — user's machine with bat service running
2. **Browser relay (Chrome):** Use `profile="chrome"` — user must attach tab
3. **Auto-auth:** Handle auth programmatically if credentials available
4. **Ask user:** Last resort

**If none work → return error.**

#### Step 2: Navigate key app pages (maximize component coverage)

Navigate ~10 screens, prioritizing **variety of UI patterns**:
- Main dashboard / home
- Detail view (sidebar properties, metadata)
- Settings page (forms, toggles, selects)
- Creation flow (modals, multi-step wizards)
- List/table views (headers, pagination, filters)
- Board/kanban view (cards, columns)
- Inbox/notifications (grouped items, states)
- Command palette / search overlay (⌘K)
- Any page with rich UI (charts, activity logs)

**Click "Add/Create/New" buttons** to reveal modal forms.
**Take screenshots of every page** — these go into the portable package.

#### Step 3: Extract global tokens (CSS variables)

Run on each page via browser evaluate:

```javascript
(() => {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const body = getComputedStyle(document.body);
  const allVars = [];
  for (let i = 0; i < styles.length; i++) {
    if (styles[i].startsWith('--') && !styles[i].startsWith('--sx-') && !styles[i].startsWith('--tw-')) {
      const val = styles.getPropertyValue(styles[i]).trim();
      if (val) allVars.push({ name: styles[i], value: val });
    }
  }
  return JSON.stringify({
    cssVars: allVars,
    fonts: { body: body.fontFamily, size: body.fontSize, lineHeight: body.lineHeight },
    bg: body.backgroundColor,
    color: body.color
  }, null, 2);
})();
```

**Do this for both light AND dark mode.** Toggle dark mode via class manipulation:
```javascript
document.documentElement.className = 'dark';
document.documentElement.style.colorScheme = 'dark';
```

Save to `~/design-system-hub/extractions/app.<domain>/tokens-raw.json`

#### Step 4: Extract component-level specs (NEW — CRITICAL)

This is what makes the styleguide actually look like the original app. For each key component type visible on screen, extract computed styles from real DOM elements.

Run this audit script via browser evaluate:

```javascript
(() => {
  function getSpecs(el) {
    const s = getComputedStyle(el);
    return {
      borderRadius: s.borderRadius,
      borderWidth: s.borderWidth,
      borderColor: s.borderColor,
      borderStyle: s.borderStyle,
      padding: s.padding,
      margin: s.margin,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      fontFamily: s.fontFamily,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      textTransform: s.textTransform,
      backgroundColor: s.backgroundColor,
      color: s.color,
      boxShadow: s.boxShadow,
      gap: s.gap,
      height: s.height,
      minHeight: s.minHeight
    };
  }

  const audit = {};
  const selectors = {
    button: 'button:not([disabled])',
    'button-primary': 'button[data-variant="default"], button.bg-primary, button[class*="primary"], button[style*="background"]',
    'button-secondary': 'button[data-variant="secondary"], button.bg-secondary, button[class*="secondary"], button[class*="outline"]',
    input: 'input[type="text"], input[type="email"], input[type="number"], input:not([type])',
    select: 'select, [role="combobox"], [data-slot="select-trigger"]',
    textarea: 'textarea',
    card: '[data-slot="card"], [class*="card"], article',
    'table-row': 'tr, [role="row"]',
    'table-header': 'th, [role="columnheader"]',
    badge: '[data-slot="badge"], [class*="badge"]',
    sidebar: 'nav, [role="navigation"], aside',
    'sidebar-item': 'nav a, aside a, [role="navigation"] a',
    modal: '[role="dialog"], [data-slot="dialog"]',
    tab: '[role="tab"]',
    'tab-active': '[role="tab"][aria-selected="true"], [role="tab"][data-state="active"]',
    heading: 'h1, h2, h3',
    label: 'label',
    'small-text': '.text-xs, .text-sm, [class*="muted"], [class*="description"]'
  };

  for (const [name, selector] of Object.entries(selectors)) {
    try {
      const el = document.querySelector(selector);
      if (el) audit[name] = getSpecs(el);
    } catch(e) {}
  }

  return JSON.stringify(audit, null, 2);
})();
```

Run this on **multiple pages** (dashboard, settings, table view, form/modal) and merge results. Different pages expose different components.

**Also observe iconography patterns:**
- Are icons stroke-only or filled?
- Monochromatic (currentColor) or multi-color?
- What icon library is used? (check for Lucide, Heroicons, Phosphor, custom SVGs)
- What stroke weight? (1, 1.5, 2?)
- What default size? (16px, 20px, 24px?)
- Are emojis used anywhere, or strictly icons?
- Are there colored indicators (like category color squares)?

Save to `~/design-system-hub/extractions/app.<domain>/components-raw.json`

#### Step 5: Synthesize components.json (NEW — CRITICAL)

From the raw component audit, create a clean `components.json` with concrete specs:

```json
{
  "meta": {
    "source": "app.midday.ai",
    "extractedAt": "2026-03-13",
    "mode": "light"
  },
  "character": {
    "density": "compact|normal|spacious",
    "corners": "sharp|slightly-rounded|rounded",
    "elevation": "flat|subtle|layered",
    "borders": "none|thin|visible",
    "palette": "monochromatic|duotone|colorful",
    "feel": "one-sentence description of the visual character",
    "iconography": {
      "style": "monochromatic, stroke-only | filled | mixed",
      "weight": "1.5px stroke",
      "size": "20px default, 16px compact",
      "color": "currentColor | fixed colors",
      "library": "Lucide | Heroicons | Phosphor | custom",
      "never": "describe what's NOT used (e.g. no emojis, no filled icons)"
    }
  },
  "components": {
    "button": {
      "borderRadius": "0",
      "padding": "12px 24px",
      "fontWeight": "500",
      "fontSize": "14px",
      "letterSpacing": "-0.01em",
      "height": "40px",
      "borderWidth": "0",
      "shadow": "none"
    },
    "button-secondary": {
      "borderRadius": "0",
      "padding": "12px 24px",
      "fontWeight": "500",
      "borderWidth": "1px",
      "shadow": "none"
    },
    "input": {
      "borderRadius": "2px",
      "padding": "8px 12px",
      "fontSize": "14px",
      "borderWidth": "1px",
      "height": "40px"
    },
    "card": {
      "borderRadius": "0",
      "padding": "24px",
      "borderWidth": "1px",
      "shadow": "none"
    },
    "table-row": {
      "height": "48px",
      "padding": "0 16px",
      "fontSize": "14px",
      "borderWidth": "0 0 1px 0"
    },
    "badge": {
      "borderRadius": "4px",
      "padding": "2px 8px",
      "fontSize": "11px",
      "fontWeight": "500"
    },
    "sidebar-item": {
      "padding": "6px 10px",
      "fontSize": "14px",
      "borderRadius": "6px",
      "fontWeight": "400"
    },
    "tab": {
      "padding": "8px 16px",
      "fontSize": "14px",
      "fontWeight": "400",
      "borderRadius": "0"
    },
    "modal": {
      "borderRadius": "8px",
      "padding": "24px",
      "shadow": "0 25px 50px -12px rgba(0,0,0,0.25)",
      "maxWidth": "480px"
    },
    "typography": {
      "display": { "fontSize": "36px", "fontWeight": "300", "letterSpacing": "-0.02em" },
      "h1": { "fontSize": "30px", "fontWeight": "400", "letterSpacing": "-0.02em" },
      "h2": { "fontSize": "24px", "fontWeight": "400", "letterSpacing": "-0.01em" },
      "h3": { "fontSize": "18px", "fontWeight": "500" },
      "body": { "fontSize": "14px", "fontWeight": "400", "lineHeight": "1.5" },
      "small": { "fontSize": "12px", "fontWeight": "400" },
      "label": { "fontSize": "11px", "fontWeight": "500", "textTransform": "uppercase", "letterSpacing": "0.05em" }
    }
  }
}
```

Values come from the component audit. The `character` section is synthesized from the overall patterns you observe.

**This file is THE source of truth** for anyone (human or AI) building with this design system.

#### Step 6: Save screenshots to portable package

Copy/save the app screenshots taken in Step 2 to `~/design-system-hub/portable/<domain>/screenshots/`. Name them descriptively:
- `dashboard.png`
- `settings.png`
- `create-modal.png`
- `table-view.png`
- `dark-mode-dashboard.png`
- etc.

These serve as visual reference for anyone implementing the design system.

#### Step 7: Map tokens to shadcn theme (globals.css)

Map extracted CSS variables to shadcn theme structure. Standard mapping:

| Extracted Pattern | shadcn Variable |
|---|---|
| `--color-bg-*`, `--bg-*` | --background, --card, --muted |
| `--color-text-*`, `--text-*` | --foreground, --muted-foreground |
| `--color-primary-*` | --primary, --accent |
| `--color-border-*` | --border, --input |
| `--radius-*` | --radius |
| `--shadow-*` | --shadow-* (custom) |

Include both `:root` (light) and `.dark` sections. Use HSL values in variables, reference via `hsl(var(...))` in `@theme inline`.

#### Step 8: Generate component overrides in globals.css (NEW — CRITICAL)

After the shadcn token variables, add a **component override section** that applies the specs from `components.json`. This is what makes components actually match the original app:

```css
/* ============================================
   COMPONENT OVERRIDES — extracted from app UI
   ============================================ */

/* Buttons */
[data-slot="button"] {
  border-radius: 0;
  font-weight: 500;
  letter-spacing: -0.01em;
}

/* Inputs */
[data-slot="input"],
[data-slot="textarea"],
[data-slot="select-trigger"] {
  border-radius: 2px;
  font-size: 14px;
}

/* Cards */
[data-slot="card"] {
  border-radius: 0;
  box-shadow: none;
}

/* Badges */
[data-slot="badge"] {
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

/* Table */
[data-slot="table-cell"] {
  font-size: 14px;
}

/* Dialog */
[data-slot="dialog-content"] {
  border-radius: 8px;
}

/* Tabs */
[data-slot="tabs-trigger"] {
  border-radius: 0;
}
```

These `[data-slot]` selectors target shadcn v2+ components directly. Adjust selectors based on actual shadcn output.

#### Step 9: Create the styleguide project

```bash
cd ~/design-system-hub/styleguides
npx create-next-app@latest <domain> --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack --yes
cd <domain>
npx shadcn@latest init -y --defaults
npx shadcn@latest add card badge alert separator tabs switch label button input select textarea dialog sonner navigation-menu table accordion dropdown-menu command chart -y
```

> **shadcn v2+ uses base-ui, NOT radix. No `asChild` prop.** Use direct className on triggers or `render` prop.

#### Step 10: Generate styleguide pages

1. **Token showcase** at `/app/styleguide/page.tsx`:
   - Design Summary card (font, size, radius, style, density, feel)
   - Color palette (all semantic colors + chart colors)
   - Typography scale (display through caption, matching extracted sizes/weights)
   - Border radius examples (using ACTUAL extracted radius values, not defaults)
   - Button variants (all states)
   - Badge variants
   - Alert variants
   - Cards (matching app's card patterns — stat cards, list cards, etc.)
   - Dark mode toggle

2. **Sidebar layout** matching app's sidebar aesthetic (density, width, font sizes)

3. **10 component pages** in `/app/styleguide/components/[name]/page.tsx`:

   | Component | Variants |
   |-----------|----------|
   | **Form** | Input+Label, Select, Textarea, validation states, disabled |
   | **Dialog** | Creation modal, confirmation, scrollable |
   | **Toast** | Success, error, warning, info, with action |
   | **Navigation Menu** | Sidebar replica, horizontal tabs, top bar |
   | **Data Table** | Table with badges, sort, filter, row actions |
   | **Cards** | Stat cards, app cards, pricing card, invoice cards |
   | **Tabs** | Horizontal, segment control, filter tabs, view toggle |
   | **Dropdown Menu** | Action menu, nested, with shortcuts |
   | **Command Palette** | ⌘K overlay, grouped items, static preview |
   | **Charts** | Bar, area, line, radar using extracted chart tokens |

   **Every component MUST reflect the extracted component specs.** If the original app has sharp corners on buttons, the styleguide buttons must have sharp corners. If inputs are borderless, style them borderless. Study the screenshots.

   **Iconography:** Use Lucide React icons in all component pages — NEVER emojis. Match the app's icon style (stroke weight, size, color). Icons must be monochromatic using `currentColor` unless the app explicitly uses colored icons. Category/status indicators should use small CSS color squares, not emoji squares.

#### Step 11: Configure static export

In `next.config.ts`:
```ts
{ output: "export", basePath: "/s/<domain>", images: { unoptimized: true } }
```

Create symlink:
```bash
ln -sfn ~/design-system-hub/styleguides/<domain>/out ~/design-system-hub/static/<domain>
```

#### Step 12: Generate portable token package

```bash
cd ~/design-system-hub
node scripts/generate-portable.cjs <domain>
```

Then **manually verify and enhance** the portable output:
- Ensure `tokens.css` and `tokens.json` are correct
- Copy `components.json` to portable dir
- Copy screenshots to `portable/<domain>/screenshots/`
- Write a comprehensive `README.md` (see README template below)

#### Step 13: Capture LP screenshot (hub card only)

```bash
cd ~/design-system-hub
node scripts/screenshot.cjs <domain>
```

#### Step 14: Build and verify

```bash
cd ~/design-system-hub/styleguides/<domain>
npx next build
```

**After build, open in browser and visually compare** against the original app screenshots. If components don't match, adjust the overrides in globals.css and rebuild.

#### Step 15: Reply with summary

- Tokens extracted (colors, fonts, radius)
- Component specs extracted (list key findings)
- Character summary (density, corners, elevation, feel)
- Components generated (all 10)
- Portable package location
- Live URL

---

## README.md Template (for portable package)

The README must be useful for both humans and AI coding agents:

```markdown
# <Domain> Design System

> Extracted from <app URL> on <date>

## Character

- **Density:** compact / normal / spacious
- **Corners:** sharp / slightly-rounded / rounded
- **Elevation:** flat / subtle shadows / layered
- **Borders:** none / thin subtle / visible
- **Palette:** monochromatic / duotone / colorful
- **Feel:** <one sentence describing the visual personality>

## Iconography

- **Style:** <monochromatic stroke-only | filled | mixed>
- **Library:** <Lucide | Heroicons | Phosphor | custom>
- **Stroke weight:** <1 | 1.5 | 2>px
- **Default size:** <16 | 20 | 24>px
- **Color:** <currentColor | fixed palette>
- **Never:** <what's NOT used — e.g. no emojis, no filled icons, no multi-color>
- **Exceptions:** <any colored elements like category squares>

## Typography

- **Font:** <font name>
- **Base size:** <size>/<line-height>
- **Display:** <size>, weight <weight>, tracking <tracking>
- **Headings:** <sizes and weights>
- **Body:** <size>, weight <weight>
- **Small/Label:** <size>, weight <weight>, <uppercase?>

## Colors

### Light Mode
- Background: <value>
- Foreground: <value>
- Primary: <value>
- ... (all semantic colors)

### Dark Mode
- Background: <value>
- ... (all semantic colors)

## Component Specs

### Buttons
- Border radius: <value>
- Padding: <value>
- Font weight: <value>
- Height: <value>

### Inputs
- Border radius: <value>
- Border: <width> <style>
- Padding: <value>
- Height: <value>

### Cards
- Border radius: <value>
- Border: <width>
- Shadow: <value>
- Padding: <value>

### Tables
- Row height: <value>
- Cell padding: <value>
- Header weight: <value>

(... all components from components.json)

## Files

| File | Description |
|------|-------------|
| `tokens.css` | CSS custom properties — import in any project |
| `tokens.json` | Same tokens in JSON format |
| `components.json` | Component-level specs (radius, padding, borders, typography) |
| `screenshots/` | App screenshots for visual reference |

## Usage

### Any CSS project
```css
@import './tokens.css';
```

### Tailwind
```js
// tailwind.config.js
presets: [require('./tailwind.preset.js')]
```

### AI Coding Agents
Feed `tokens.css`, `components.json`, and `screenshots/` to your AI agent.
The `components.json` contains concrete numeric specs — no ambiguous adjectives.
Screenshots provide visual ground truth for validation.

## Screenshots

(list screenshots with descriptions)
```

---

## Other Commands

### 2. List: "lista styleguides"
```bash
ls ~/design-system-hub/styleguides/
```

### 3. Show: "mostra o styleguide do <domain>"
Static exports served via nginx at `https://designkit.overmind.ventures/s/<domain>/styleguide`

### 4. Export: "exporta tokens do <domain>"
```bash
cd ~/design-system-hub && node scripts/generate-portable.cjs <domain>
```

### 5. Add Component: "add [component] to <domain>"

Install or build component, create showcase page, update navigation.
Apply component overrides from `components.json` to match original aesthetic.

---

## ⚠️ Known Issues

### shadcn v2+ / base-ui
- No `asChild` prop. Use `render` prop or controlled state.
- Components use `[data-slot]` attributes for targeting.

### Dark Mode in Tailwind v4
- Define colors in `:root`/`.dark` as HSL values
- Reference in `@theme inline` via `hsl(var(...))`
- NEVER use fixed colors in `@theme inline` with `@layer base` dark overrides

### Static Export
Each styleguide needs: `output: "export"`, `basePath: "/s/<domain>"`, `images: { unoptimized: true }`
Plus symlink: `static/<domain> → styleguides/<domain>/out`

### Screenshots in Hub
- nginx serves `/screenshots/` directly from filesystem (bypasses Next.js dot-in-filename issue)

### lch() / oklch() Colors
- Convert to hex/hsl for portable tokens
- Keep originals in comments for reference
