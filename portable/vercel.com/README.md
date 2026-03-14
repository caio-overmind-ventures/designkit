# Vercel Design System

> Extracted from app.vercel.com on 2026-03-14

## Character

- **Density:** Compact (32px primary buttons, 36px sidebar items, 40px inputs)
- **Corners:** Slightly rounded (6px default, 8px dropdowns, 12px dialogs, pill badges)
- **Elevation:** Flat (no box-shadow on cards; ring-borders via box-shadow inset)
- **Borders:** Thin via shadow-ring (`0 0 0 1px rgba(0,0,0,0.08)`) — NOT CSS border
- **Palette:** Monochromatic (black/white with gray scale; color only for status/links)
- **Feel:** Brutally minimal B&W interface with extreme density. Color is reserved for status and interactive states. The UI inverts entirely in dark mode (white → black).

## Iconography

- **Style:** Monochromatic, stroke-only
- **Library:** Custom SVGs (Geist Icons)
- **Stroke weight:** 1.5px
- **Default size:** 16px (nav: 20px)
- **Color:** currentColor
- **Never:** No emojis, no filled icons, no multi-color icons
- **Exceptions:** Status dots (green/red/amber circles for deployment status)

## Typography

- **Font:** Geist (sans-serif), Geist Mono (monospace)
- **Base size:** 14px / 20px line-height
- **Display:** 36px, weight 700, tracking -0.02em
- **H1:** 24px, weight 600, tracking -0.015em
- **H2:** 20px, weight 600
- **H3:** 16px, weight 600
- **Body:** 14px, weight 400, line-height 20px
- **Small/Description:** 13px, weight 400, muted color
- **Caption:** 12px, weight 400
- **Label:** 14px, weight 400

## Colors

### Light Mode
- Background: `#ffffff` (hsl 0 0% 100%)
- Foreground: `#171717` (hsl 0 0% 9%)
- Primary: `#171717` (foreground = white)
- Muted: `#f5f5f5`
- Muted foreground: `#737373`
- Border: `#ebebeb` (hsl 0 0% 92%)
- Link/Focus: `#0070f3` (hsl 212 100% 48%)
- Error: `#ee0000`
- Warning: `#f5a623`
- Success: `#0070f3` (Vercel uses blue for success)

### Dark Mode
- Background: `#000000`
- Foreground: `#ededed` (hsl 0 0% 93%)
- Primary: `#ededed` (foreground = #0a0a0a) — full inversion
- Muted: `hsl(0 0% 10%)`
- Muted foreground: `hsl(0 0% 63%)`
- Border: `hsl(0 0% 16%)`
- Link/Focus: `hsl(210 100% 66%)`
- Error: `hsl(358 100% 69%)`
- Warning: `hsl(39 90% 50%)`

## Component Specs

### Buttons
- Border radius: 6px
- Primary: h=32px, padding 0 6px, weight 500, bg=foreground, text=background
- Secondary (outline): h=40px, padding 0 10px, weight 500, ring-border 1px
- Ghost: h=40px, padding 1px 8px, weight 400, no border
- Danger disabled: bg=gray-100, text=gray-500

### Inputs
- Border radius: 6px
- Height: 40px
- Padding: 8px 12px
- Font size: 14px
- Border: shadow-ring `0 0 0 1px rgba(0,0,0,0.08)` — NOT CSS border
- Dark: bg #0a0a0a, ring `rgba(255,255,255,0.14)`

### Select
- Same as input: h=40px, radius 6px
- Padding: 0 36px 0 12px (room for chevron)
- Shadow-ring border

### Toggle/Switch
- Pill-shaped: radius 9999px
- Height: 24px, Width: 44px

### Cards
- NO elevation — flat sections separated by 1px bottom border
- Padding: 24px
- Card sections: border-bottom only, not box-shadow
- Settings uses full-width sections, not floating cards

### Badges
- Pill-shaped: radius 9999px
- Font size: 12px, weight 400
- Padding: 2px 8px
- Used for: roles (Owner), plan (Hobby), status (2FA)

### Sidebar Items
- Height: 36px
- Padding: 0 12px
- Font size: 14px, weight 400
- Active: weight 500, bg-accent
- Radius: 6px

### Tabs
- Underline style: border-bottom 2px on active
- No background, no radius
- Font: 14px, active weight 500

### Command Palette
- Width: 384px
- Input height: 48px
- Item height: ~48px
- Radius: 12px
- Grouped items with section headers

### Dialog/Modal
- Border radius: 12px
- Max width: 480px
- Shadow: `0 0 0 1px rgba(0,0,0,0.08), 0 8px 16px -4px rgba(0,0,0,0.04), 0 24px 32px -8px rgba(0,0,0,0.06)`

## Shadows

- **Border shadow (ring):** `0 0 0 1px rgba(0,0,0,0.08)` (light) / `0 0 0 1px rgba(255,255,255,0.14)` (dark)
- **Menu shadow:** ring + `0 1px 1px rgba(0,0,0,0.02)` + `0 4px 8px -4px rgba(0,0,0,0.04)` + `0 16px 24px -8px rgba(0,0,0,0.06)`
- **Modal shadow:** ring + `0 8px 16px -4px rgba(0,0,0,0.04)` + `0 24px 32px -8px rgba(0,0,0,0.06)`

## Layout

- Page max-width: 1400px
- Sidebar width: 256px
- Header height: 64px

## Files

| File | Description |
|------|-------------|
| `tokens.css` | CSS custom properties (light + dark) |
| `tokens.json` | Same tokens in JSON format |
| `components.json` | Component-level specs (radius, padding, borders, typography) |
| `screenshots/` | App screenshots for visual reference |

## Usage

### Any CSS project
```css
@import './tokens.css';
```

### AI Coding Agents
Feed `tokens.css`, `components.json`, and `screenshots/` to your AI agent.
The `components.json` contains concrete numeric specs — no ambiguous adjectives.
Screenshots provide visual ground truth for validation.

Key rules:
1. Borders are shadow-rings, not CSS `border`
2. Primary button inverts in dark mode (light bg on dark)
3. Use Geist font family
4. Color is ONLY for status/links — everything else is grayscale
5. Cards are flat sections, not elevated containers

## Screenshots

- `dashboard-light.png` — Main dashboard, light mode
- `dashboard-add-new-light.png` — Dashboard with Add New dropdown
- `dashboard-dark.png` — Main dashboard, dark mode
- `settings-light.jpg` — Team settings page, light
- `settings-dark.jpg` — Team settings page, dark
- `members-light.png` — Members table with filters
- `domains-light.png` — Domains empty state with button variants
- `storage-light.png` — Storage providers list
- `command-palette-light.png` — Find... command palette
