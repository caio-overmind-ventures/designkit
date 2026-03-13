# DesignKit — Design System Extraction Hub

Extract real design tokens from web applications and generate complete styleguide projects with component libraries.

**Live demo:** [designkit.overmind.ventures](https://designkit.overmind.ventures)

![DesignKit Hub](docs/hub-overview.jpg)

## What is this?

DesignKit is an AI-first tool that reverse-engineers design systems from live web applications. There's no UI to click through. You tell your AI agent "extract the design from linear.app" and it does everything: authenticates, navigates, extracts tokens, generates the styleguide, builds the package.

It works as a skill for [OpenClaw](https://github.com/openclaw/openclaw) or Claude Code.

![Linear Styleguide Example](docs/linear-styleguide.jpg)

## App-First Extraction

**The key insight: extract from the authenticated app UI, not landing pages.**

Landing pages use marketing-specific styles that don't represent the real product design system. DesignKit authenticates into the actual application and extracts the real tokens used by the product.

Why this matters:
- App tokens are the actual design system (not one-off marketing styles)
- You get semantic tokens (success, error, warning, not just colors)
- Component patterns match real usage
- Dark mode support is real, not approximated
- Typography and spacing follow the product's actual scale

The landing page is captured only as a screenshot thumbnail for the hub card.

## How it works

### 1. Authenticate into the app
The agent opens the target app in a browser (via Chrome relay or programmatic auth). Signs up or logs in. Navigates to the dashboard.

### 2. Navigate for component coverage
The agent navigates up to ~10 screens, prioritizing **variety of UI patterns** over depth in any single area. The goal is to encounter as many distinct components as possible: inputs, dropdowns, toggles, badges, tooltips, modals, tables, sidebars, progress bars, command palettes, etc.

Screens prioritized:
- Main dashboard / home
- Detail views (issue detail, project detail with sidebar properties)
- Settings (account, preferences, integrations)
- Forms and creation flows (modals, multi-step wizards)
- List/table views (sortable headers, pagination, filters)
- Board/kanban views
- Inbox/notifications
- Timeline/roadmap views
- Command palette / search overlay (⌘K)

The agent stops when it's no longer encountering new component types.

### 3. Extract tokens via dembrandt
On each page, [dembrandt](scripts/dembrandt-extract.cjs) runs JavaScript directly in the DOM to extract CSS computed values: `getComputedStyle`, CSS custom properties, real rendered values.

Why not let the AI "look" at the screen? Because vision approximates. dembrandt reads the exact CSS. Zero approximation.

This captures all `--color-*`, `--font-*`, `--radius-*`, `--shadow-*` variables and computed styles.

### 4. Generate styleguide
Creates a dedicated Next.js + shadcn/ui project with:
- **Token showcase** — colors, typography, radius, shadows, design summary
- **10 component pages** — Form, Dialog, Toast, Navigation, Data Table, Cards, Tabs, Dropdown, Command Palette, Charts
- **Dark mode** — full light/dark toggle with real dark tokens
- **Sidebar navigation** — organized by section

### 5. Build & serve
Static export via `next build` (output: "export"). Served by nginx. Zero running processes per styleguide.

### 6. Portable tokens
Framework-agnostic token packages ready to drop into any project:
- `tokens.css` — CSS custom properties
- `tailwind.preset.js` — Tailwind CSS preset
- `tokens.json` — structured token data
- `README.md` — usage instructions

## Extracted examples

| App | Font | Primary | Radius | CSS Vars | Components | Dark Mode |
|-----|------|---------|--------|----------|------------|-----------|
| Linear | Inter | #0b0b0d | 8px | lch() colors | 10 | ✅ |
| Cal.com | Inter | #292929 | 0.625rem | 250+ | 10 | ✅ |
| Vercel | Geist | #0070f3 | 6px | 365 | 10 | ✅ |

## Architecture

```
design-system-hub/
  ├── app/                ← Hub Next.js app (panel + API routes)
  ├── lib/                ← process-manager, design-meta
  ├── scripts/
  │   ├── dembrandt-extract.cjs   ← CSS token extraction via DOM JavaScript
  │   ├── generate-portable.cjs   ← creates framework-agnostic token packages
  │   └── screenshot.cjs          ← captures LP screenshots via Playwright
  ├── extractions/        ← raw browser-extracted tokens per domain
  ├── styleguides/        ← dedicated Next.js + shadcn projects per domain
  ├── portable/           ← portable token packages (JSON, CSS, Tailwind preset)
  ├── static/             ← symlinks to styleguide static exports
  └── public/screenshots/ ← LP screenshots for hub cards
```

## Stack

- **dembrandt** — CSS token extraction via JavaScript in the real DOM
- **Next.js 16** + TypeScript + Tailwind CSS v4
- **shadcn/ui** (v2, base-ui)
- **Playwright** — browser navigation and screenshots
- **OpenClaw / Claude Code** — AI agent orchestration
- **nginx** — reverse proxy + static serving

## Usage

### As an OpenClaw / Claude Code skill

Install the skill and ask your agent:

```
"extraia o design de linear.app"
```

The agent handles everything: authentication, navigation, extraction, styleguide generation, and packaging.

### Manual

```bash
# Clone
git clone https://github.com/caio-overmind-ventures/designkit.git
cd designkit

# Install
npm install

# Build the hub
npx next build

# Start the hub
npx next start -p 3100
```

Styleguides are generated per-domain in `styleguides/` and served as static exports.

## Hub features

- Grid view with LP screenshot thumbnails
- Build & rebuild styleguides
- Download portable token packages (tar.gz)
- Delete styleguides
- Color identity swatch per card
- Design metadata (font, style, date)

## Deployment

- **Server:** Any VPS with Node.js 18+
- **Hub:** `npx next build && npx next start -p 3100`
- **SSL:** nginx reverse proxy + Let's Encrypt
- **Styleguides:** nginx serves static exports from `/s/<domain>/`
- **Screenshots:** nginx serves from `/screenshots/`

## Credits

Token extraction prompt based on [Deborah Folloni's design system methodology](https://dfolloni.substack.com/p/como-criar-um-design-system-com-o).

## License

MIT
