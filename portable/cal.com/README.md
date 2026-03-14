# Cal.com Design System

> Extracted from app.cal.com on 2026-03-13

## Character

- **Density:** Compact — 32px buttons/inputs, tight spacing
- **Corners:** Rounded — 8-10px border-radius on interactive elements, 16px on dialogs
- **Elevation:** Subtle — complex inset/outset shadows on primary buttons, minimal elsewhere
- **Borders:** Thin subtle — 1px borders on inputs/cards, muted colors
- **Palette:** Monochromatic — grayscale UI with teal/green scheduling accents
- **Feel:** Professional, clean scheduling interface. Compact but not cramped. Dark mode inverts brand (light brand becomes dark text). Signature detail: primary buttons have 5-layer composite shadow with inset highlight.

## Iconography

- **Style:** Monochromatic, stroke-only
- **Library:** Lucide (custom subset)
- **Stroke weight:** 1.5px
- **Default size:** 16px (nav icons 20px)
- **Color:** currentColor
- **Never:** No emojis, no filled icons, no multi-color icons
- **Exceptions:** Green dot indicators for available time slots, colored visualization badges

## Typography

- **Font:** Inter (body), calFont (headings/brand)
- **Base size:** 14px/20px (body text is 14px, not 16px)
- **Display:** 36px, weight 700, tracking -0.02em
- **H1:** 24px, weight 700
- **H2:** 20px, weight 600
- **H3/Page title:** 16px, weight 600
- **Body:** 14px, weight 400, line-height 20px
- **Small:** 12px, weight 400
- **Label:** 14px, weight 500

## Colors

### Light Mode
- Background: #ffffff (page: #eeeff2)
- Text: #3c3e44
- Text emphasis: #070a0d
- Text subtle: #6b7280
- Text muted: #9ca3b0
- Brand: #292929
- Brand text: #ffffff
- Border: #d1d5db
- Border subtle: #e5e7eb
- Success: bg #e4fbed / text #285239
- Error: bg #f9e3e1 / text #811d1d
- Attention: bg #ffedd6 / text #74331b
- Info: bg #dde7fd / text #243c84

### Dark Mode
- Background: #0f0f0f (sidebar: #171717)
- Text: #d4d4d4
- Text emphasis: #fafafa
- Text subtle: #a3a3a3
- Brand: #fafafa
- Brand text: #000000
- Border: #4d4d4d
- Border subtle: #262626
- Success: bg #285231 / text #e4fbe9
- Error: bg #772522 / text #f9e3e1
- Attention: bg #74331b / text #fcefd9
- Info: bg #253883 / text #dee9fc

## Component Specs

### Buttons (Primary)
- Border radius: 10px
- Padding: 8px 10px
- Font: 14px / 500
- Height: 32px
- Border: 1px solid (same as bg)
- Shadow: 5-layer composite (inset highlight + outset depth)

### Buttons (Secondary/Outline)
- Border radius: 10px
- Padding: 8px 10px
- Font: 14px / 500
- Height: 34px
- Border: 1px solid (border color)
- Shadow: subtle (0.03 opacity)

### Inputs
- Border radius: 10px
- Border: 1px solid (#d1d5db light / #4d4d4d dark)
- Padding: 8px 12px
- Font: 14px / 500
- Height: 32px
- Shadow: subtle

### Select/Combobox
- Border radius: 10px
- Padding: 6px 12px
- Font: 14px / 400
- Height: 32px

### Dialog/Modal
- Border radius: 16px
- Padding: 32px 32px 0px
- Shadow: large drop shadow
- Background: page bg

### Cards
- Border radius: 12px
- Padding: 16px
- Border: 1px solid subtle
- Shadow: none

### Switch/Toggle
- Border radius: 9999px (pill)
- Height: 24px
- Active bg: #e1e1e1
- Inset shadow on track

### Sidebar
- Background: subtle bg (#171717 dark, #fff light)
- Right border: 1px
- Item padding: 6px 8px
- Item radius: 8px
- Item font: 14px / 500
- Active: filled bg (#404040 dark, #e5e7eb light)

### Settings Sidebar
- Item padding: 4px 8px
- Item height: 28px
- Active: filled bg (#262626 dark)

### Time Slots (Booking Page)
- Border radius: 10px
- Padding: 8px 10px
- Border: 1px solid
- Height: 36px
- Green dot indicator

### Calendar Days
- Border radius: 8px
- Size: ~59px
- Font: 14px / 300
- Border: 2px (transparent default, brand on selected)

### Labels
- Font: 14px / 500
- Color: emphasis

## Files

| File | Description |
|------|-------------|
| `tokens.css` | CSS custom properties — import in any project |
| `tokens.json` | Same tokens in structured JSON format |
| `components.json` | Component-level specs (radius, padding, borders, typography) |
| `screenshots/` | App screenshots for visual reference (light + dark) |

## Usage

### Any CSS project
```css
@import './tokens.css';
```

### Tailwind
Use the token values to configure your theme in `tailwind.config.js`.

### AI Coding Agents
Feed `tokens.css`, `components.json`, and `screenshots/` to your AI agent.
The `components.json` contains concrete numeric specs — no ambiguous adjectives.
Screenshots provide visual ground truth for validation.

## Screenshots

| File | Description |
|------|-------------|
| `event-types.png` | Main event types list (dark) |
| `event-types-light.png` | Main event types list (light) |
| `create-event-modal.png` | New event type creation dialog |
| `bookings.png` | Bookings page with tabs |
| `availability.png` | Availability schedule page |
| `settings-profile.png` | Profile settings with forms |
| `settings-general.png` | General settings with selects/toggles |
| `settings-appearance.png` | Appearance with theme switcher (dark) |
| `settings-appearance-light.png` | Appearance (light) |
| `event-type-detail.png` | Event type setup/detail page |
| `workflows-light.png` | Workflows with template cards |
| `teams.png` | Teams upsell page |
| `app-store.jpg` | App store grid |
| `booking-page-public.png` | Public booking page with calendar + time slots |
