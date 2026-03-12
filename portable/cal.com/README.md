# cal.com — Design Tokens

> Auto-extracted from undefined
> Generated: 2026-03-12T22:05:13.674Z

## Files

| File | Description |
|------|-------------|
| `tokens.json` | Complete token data (colors, typography, radius, shadows, components) |
| `tokens.css` | CSS custom properties — drop into any project |
| `tailwind.preset.js` | Tailwind CSS preset — import in tailwind.config.js |

## Quick Start

### Any project (CSS variables)

Copy `tokens.css` to your project and import it:

```css
@import './tokens.css';
```

Then use the variables:

```css
.button {
  background: var(--color-primary);
  border-radius: var(--radius);
  font-family: var(--font-sans);
}
```

### Tailwind CSS (v3)

```js
// tailwind.config.js
module.exports = {
  presets: [require('./tailwind.preset.js')],
  // ... your config
}
```

Then use: `bg-primary`, `text-primary-500`, `rounded-DEFAULT`, `font-sans`, etc.

### Tailwind CSS (v4)

Import the CSS variables in your main CSS file:

```css
@import './tokens.css';
```

Tailwind v4 auto-detects CSS variables prefixed with `--color-*`.

### React / Next.js

Import the CSS file in your root layout or App component:

```tsx
import './tokens.css';
```

## Token Summary

- **Primary:** N/A
- **Background:** #ffffff
- **Foreground:** #000000
- **Accent:** N/A
- **Font (sans):** system-ui
- **Font (mono):** N/A
- **Font (display):** N/A
- **Border radius:** N/A
