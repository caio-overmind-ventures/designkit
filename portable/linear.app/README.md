# Linear Design System

> Extracted from https://linear.app (authenticated app) on 2026-03-14

## Character

- **Density:** Compact — 32px controls, 28px sidebar items, 36px table rows
- **Corners:** Rounded — pill buttons (9999px), 8px inputs/cards
- **Elevation:** Flat — no shadows on primary elements, subtle shadow on secondary buttons only
- **Borders:** Thin subtle — 1px borders on inputs, cards, table dividers
- **Palette:** Monochromatic — near-black/white neutrals with single purple accent (#5e6ad2)
- **Feel:** Dense, professional project management tool with a dark-first aesthetic. Minimal shadows, pill-shaped buttons, tight control heights, and a muted neutral palette punctuated by a single purple accent.

## Iconography

- **Style:** Monochromatic, stroke-only
- **Library:** Custom SVG icons (Linear-specific), closest match is Lucide
- **Stroke weight:** 1.5px
- **Default size:** 16px (14px in compact contexts)
- **Color:** currentColor
- **Never:** No emojis in UI chrome, no filled icons, no multi-color icons
- **Exceptions:** Small colored dots (9px) for label categories and priority levels

## Typography

- **Font:** Inter Variable (with SF Pro Display fallback)
- **Mono:** Berkeley Mono
- **Base size:** 13px (0.8125rem) — this is the primary UI text size, NOT 16px
- **Display:** 36px, weight 300, tracking -0.02em
- **Headings:** H1=24px/500, H2=20px/500, H3=13px/500 (section headers are compact)
- **Body:** 13px, weight 400-450
- **Small/Micro:** 12px/11px, weight 400

## Colors

### Light Mode
| Token | Value | Usage |
|-------|-------|-------|
| Background | #fafafb | Page bg |
| Background Secondary | #ededef | Sidebar bg, hover states |
| Background Tertiary | #ffffff | Cards, elevated surfaces |
| Foreground | #1a1a1d | Primary text |
| Foreground Secondary | #2e2e32 | Headings |
| Foreground Tertiary | #5c5c63 | Muted text, descriptions |
| Border Primary | #eeeeee | Subtle dividers |
| Border Secondary | #dcdcdc | Input borders |
| Accent | #5e6ad2 | Primary buttons, links, active states |

### Dark Mode
| Token | Value | Usage |
|-------|-------|-------|
| Background | #0d0d0f | Page bg |
| Background Secondary | #161619 | Cards, combobox bg |
| Background Tertiary | #1d1d21 | Elevated surfaces |
| Sidebar | #050505 | Near-black sidebar |
| Foreground | #ffffff | Primary text |
| Foreground Secondary | #e5e5e6 | Body text |
| Foreground Tertiary | #9494a0 | Muted text |
| Border Primary | #141416 | Subtle dividers |
| Border Secondary | #26262b | Input borders, card borders |
| Accent | #5e6ad2 | Same purple accent |

## Component Specs

### Buttons (Primary)
- Shape: Pill (border-radius: 9999px)
- Height: 32px
- Padding: 0 12px
- Font: 13px / weight 500
- Background: #5e6ad2 (accent)
- No shadow

### Buttons (Secondary)
- Shape: Pill (border-radius: 9999px)
- Height: 32px
- Padding: 0 12px
- Font: 13px / weight 500
- Border: 1px solid border-secondary
- Subtle shadow: 0px 4px 4px -1px rgba(0,0,0,0.04)

### Inputs
- Border radius: 8px
- Height: 32px
- Font: 13px / weight 500
- Border: 1px solid
- Padding: 6px 12px (search has 32px left for icon)

### Select / Combobox
- Border radius: 8px
- Height: 32px
- Font: 13px / weight 400
- Border: 1px solid

### Sidebar
- Width: 244px
- Item height: 28px
- Item padding: 4px 8px
- Item font: 13px / weight 400
- Item radius: 8px
- Active: subtle bg highlight

### Tabs
- Pill-style with filled background on active
- Padding: 4px 12px
- Font: 13px / weight 500
- Border radius: 6px

### Modal / Dialog
- Border radius: 12px
- Padding: 16px
- Max width: 640px
- Shadow: 0 25px 50px -12px rgba(0,0,0,0.25)

### Command Palette (⌘K)
- Border radius: 12px
- Search input at top
- Grouped results with icons
- Keyboard navigation highlight

### Switch / Toggle
- Width: 36px, Height: 20px
- Pill shape
- Active: accent purple

### Tables
- Row height: ~36px
- Cell padding: 0 12px
- Font: 13px
- Divider: 1px bottom border
- Header: weight 500

## Files

| File | Description |
|------|-------------|
| `tokens.css` | CSS custom properties for light + dark mode |
| `tokens.json` | Same tokens in JSON format |
| `components.json` | Component-level specs (radius, padding, borders, typography) |
| `screenshots/` | App screenshots for visual reference (light + dark) |

## Usage

### Any CSS project
```css
@import './tokens.css';
```

### AI Coding Agents
Feed `tokens.css`, `components.json`, and screenshots to your AI agent.
Key things to get right:
1. **13px base font size** — NOT 14px or 16px
2. **32px control height** — everything is compact
3. **Pill buttons** — 9999px radius
4. **8px radius** for inputs/cards
5. **Single purple accent** — #5e6ad2
6. **Dark mode is primary** — design dark-first

## Screenshots

- `issues-dark.png` — Issue list with sidebar (dark)
- `issues-light.png` — Issue list with sidebar (light)
- `issue-detail-dark.png` — Issue detail with properties sidebar
- `issue-detail-light.png` — Issue detail (light)
- `create-issue-modal-dark.png` — New issue creation modal
- `create-issue-modal-light.png` — New issue creation modal (light)
- `settings-preferences-dark.png` — Settings with selects, toggles, sections
- `settings-preferences-light.png` — Settings (light)
- `settings-labels-dark.png` — Labels table with colored dots and buttons
- `settings-labels-light.png` — Labels table (light)
- `settings-members-dark.png` — Members table with badges and status
- `settings-members-light.png` — Members table (light)
- `settings-notifications-dark.png` — Notification channels with switches
- `settings-workspace-dark.png` — Workspace settings with forms
- `billing-plans-dark.png` — Pricing comparison table
- `billing-plans-light.png` — Pricing comparison table (light)
- `command-palette-dark.png` — ⌘K command palette
- `command-palette-light.png` — ⌘K command palette (light)
- `inbox-dark.png` — Inbox view
