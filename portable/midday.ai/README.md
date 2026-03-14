# midday.ai Design System

> Extracted from https://app.midday.ai on 2026-03-13

## Character

- **Density:** Compact — 36px inputs/buttons, 49px table rows, tight spacing
- **Corners:** Sharp — 0px border-radius on ALL functional elements (buttons, inputs, cards, tabs, modals)
- **Elevation:** Flat — zero box-shadows anywhere
- **Borders:** Thin — 1px borders, warm grey (rgb(219, 218, 215)) in light, neutral dark in dark mode
- **Palette:** Monochromatic warm — cream/beige backgrounds in light mode, pure neutral black in dark mode
- **Feel:** Brutalist-minimal financial interface. Zero decoration, zero radius. The design trusts whitespace and typography hierarchy over visual effects. Display headings use a serif font (Hedvig Letters Serif) while everything else uses sans-serif (Hedvig Letters Sans). Stat numbers are large and regular-weight — the size does the heavy lifting, not boldness.

### What's round (the only exceptions)

Only these elements use pill shape (9999px radius):
- Badges
- Switches
- Avatars
- Small ghost icon buttons (row actions, sidebar toggles)

Everything else is 0px radius. This contrast between sharp functional elements and pill-shaped decorative elements is a defining characteristic of midday's visual identity.

## Iconography

- **Style:** Monochromatic, stroke-only (Lucide-style)
- **Stroke weight:** 1.5px
- **Size:** 20px default, 16px in compact contexts
- **Color:** `currentColor` — inherits from text color (foreground or muted-foreground)
- **Library:** Lucide React recommended
- **⚠️ NEVER use:** Colored emojis, filled icons, or multi-color icons
- **Only colored elements:** Small solid squares used as category color indicators in tables (e.g., 🟩🟦🟧 but rendered as tiny CSS squares, not emojis)

## Typography

| Role | Font | Size | Weight | Line Height | Notes |
|------|------|------|--------|-------------|-------|
| Display | Hedvig Letters Serif | 30px | 400 | 45px | Page greetings, hero headings — SERIF, not sans |
| H1 | Hedvig Letters Sans | 24px | 400 | 32px | |
| H2 | Hedvig Letters Sans | 20px | 500 | 28px | Section headings, modal titles |
| H3 | Hedvig Letters Sans | 16px | 500 | 24px | Card titles, form section titles |
| Body | Hedvig Letters Sans | 14px | 400 | 20px | Default text size |
| Small/Label | Hedvig Letters Sans | 12px | 500 | 16px | Category labels, metadata |
| Helper | Hedvig Letters Sans | 14px | 400 | 20px | Descriptions, muted text (color: rgb(97, 97, 97)) |
| Stat Number | Hedvig Letters Sans | 24px | 400 | 32px | Large numbers — regular weight, NOT bold |

## Colors

### Light Mode
| Token | Value |
|-------|-------|
| Background | hsl(0 0% 100%) — pure white |
| Foreground | hsl(0 0% 7%) — near-black |
| Card | hsl(45 18% 96%) — warm cream |
| Primary | hsl(240 5.9% 10%) — near-black |
| Secondary | hsl(40 11% 89%) — warm beige |
| Muted | hsl(40 11% 89%) — warm beige |
| Muted Foreground | hsl(0 0% 38%) — medium grey |
| Accent | hsl(40 10% 94%) — light cream |
| Border | hsl(45 5% 85%) — warm light grey |
| Destructive | hsl(0 84.2% 60.2%) — red |

### Dark Mode
| Token | Value |
|-------|-------|
| Background | hsl(0 0% 5%) — near-black |
| Foreground | hsl(0 0% 98%) — near-white |
| Card | hsl(0 0% 7%) — dark grey |
| Primary | hsl(0 0% 98%) — near-white (inverted) |
| Secondary | hsl(0 0% 7%) — dark grey |
| Muted | hsl(0 0% 11%) — dark grey |
| Border | hsl(0 0% 11%) — dark grey |
| Destructive | hsl(359 100% 61%) — bright red |

**Key pattern:** Light mode uses warm cream/beige tones (HSL 40-45°). Dark mode uses pure neutral blacks (HSL 0° 0%). The warmth disappears completely in dark mode.

## Component Specs

### Buttons
| Property | Primary | Secondary/Outline | Destructive |
|----------|---------|-------------------|-------------|
| Border Radius | 0px | 0px | 0px |
| Height | 36px | 36px | 36px |
| Padding | 8px 16px | 8px 16px | 8px 16px |
| Font Size | 14px | 14px | 14px |
| Font Weight | 500 | 500 | 500 |
| Shadow | none | none | none |

### Inputs
- Border Radius: **0px**
- Height: **36px**
- Padding: **4px 12px**
- Font Size: 14px
- Border: 1px solid rgb(219, 218, 215)
- Shadow: none

### Cards
- Border Radius: **0px**
- Border: 1px solid
- Shadow: **none**
- Padding: 16px-24px (varies by context)

### Tables
- Header Height: **48px**
- Row Height: **49px**
- Cell Padding: **8px 16px**
- Header Font Weight: 500, color grey
- Border: bottom 1px per row

### Badges (the exception — pill-shaped)
- Border Radius: **9999px**
- Height: 24-32px
- Padding: 0px 12px
- Font Size: 12px
- Font Weight: 400

### Tabs
- Border Radius: **0px**
- Height: 34px
- Padding: 6px 12px
- Font Weight: 500

### Modal/Sheet
- Border Radius: **0px**
- Shadow: none
- Pattern: slide-in sheet from right with border-left (not centered dialog)

## Files

| File | Description |
|------|-------------|
| `tokens.css` | CSS custom properties — import in any project |
| `tokens.json` | Same tokens in JSON format |
| `components.json` | Component-level specs (radius, padding, borders, typography) with concrete numeric values |
| `screenshots/` | App screenshots for visual reference (light + dark mode, multiple screens) |

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
Feed `tokens.css`, `components.json`, and `screenshots/` to your AI agent. The `components.json` contains concrete numeric specs — no ambiguous adjectives. Screenshots provide visual ground truth for validation.

**Key instructions for AI agents:**
1. All functional elements (buttons, inputs, cards, tabs, modals, tables) must have **0px border-radius**. Only badges, switches, and avatars are round.
2. **No emojis or colored icons.** Use Lucide React icons only — monochromatic, stroke-only, inheriting `currentColor`. The only colored elements are tiny solid squares for category indicators.

## Screenshots

| File | Description |
|------|-------------|
| `screenshots/dashboard-light.png` | Main dashboard — stat cards, report tabs |
| `screenshots/dashboard-dark.png` | Dashboard in dark mode |
| `screenshots/settings-general.jpg` | Settings — forms, inputs, select, delete button |
| `screenshots/categories-table.png` | Categories table with badges, search, create button |
| `screenshots/create-transaction-modal.png` | Create transaction sheet — segment control, form fields |
| `screenshots/apps-marketplace.png` | Apps grid — card layout with Details/Install buttons |
