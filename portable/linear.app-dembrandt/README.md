# linear.app-dembrandt — Design Tokens

> Auto-generated: 2026-03-16T12:04:08.634Z
> Format: legacy

## Summary

- **Primary:** N/A
- **Background:** #ffffff
- **Foreground:** #000000
- **Accent:** N/A
- **Link:** N/A
- **Error:** N/A
- **Warning:** N/A
- **Success:** N/A
- **Gray scale:** N/A
- **Dark mode:** No
- **Font (sans):** system-ui
- **Font (mono):** N/A
- **Base size:** 16px
- **Border radius:** N/A



## Files

| File | Description |
|------|-------------|
| `tokens.json` | Complete token data (colors, typography, radius, layout, components) |
| `tokens.css` | CSS custom properties (light + dark) |
| `tailwind.preset.js` | Tailwind CSS preset |
| `components.json` | Component-level specs (if available) |

## Usage

### CSS
```css
@import './tokens.css';
```

### Tailwind v3
```js
// tailwind.config.js
module.exports = { presets: [require('./tailwind.preset.js')] }
```

### Tailwind v4
```css
@import './tokens.css';
/* v4 auto-detects --color-* variables */
```

### AI Agents
Feed `tokens.css`, `components.json`, and screenshots to your agent.
`components.json` has concrete numeric specs — no ambiguous adjectives.
