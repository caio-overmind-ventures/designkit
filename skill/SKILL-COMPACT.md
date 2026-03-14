# DesignKit — Compact Reference

Quick-ref for extraction flow. Full spec in SKILL.md.

## Flow

1. **Access app** via node browser (bat service) or chrome relay
2. **Navigate ~10 pages** (dashboard, settings, members, deployments, domains, storage, integrations, logs, command palette, create modals)
3. **Extract tokens** — run `extract-all.js` on each page (uses snapshot, NOT screenshot)
4. **Toggle dark mode** via user menu/settings, re-extract tokens
5. **Screenshot only**: dashboard light, dashboard dark, settings dark (3 max for visual reference)
6. **Synthesize** components.json + tokens.css → `portable/<domain>/`
7. **Create styleguide** project from templates
8. **Build + verify** (1 screenshot of final styleguide)

## Key Rules

- App UI only — NEVER extract from landing page
- Borders are shadow-rings (`box-shadow: 0 0 0 1px ...`), not CSS `border`
- shadcn v2 = base-ui, NO `asChild` — use `render` prop
- Static export: `output: "export"`, `basePath: "/s/<domain>"`
- Symlink: `static/<domain> → styleguides/<domain>/out`

## Output Structure

```
portable/<domain>/
  tokens.css          # CSS custom properties (light + dark)
  components.json     # Component specs (radius, padding, height, etc.)
  README.md           # Usage guide
  screenshots/        # 3-5 app screenshots

styleguides/<domain>/ # Next.js + shadcn project
  app/styleguide/     # Token showcase + 10 component pages
```

## Component Pages (10)

Form, Dialog, Toast, Navigation Menu, Data Table, Cards, Tabs, Dropdown Menu, Command Palette, Charts

## components.json Schema

```json
{
  "meta": { "source": "", "extractedAt": "", "modes": ["light","dark"] },
  "character": { "density": "", "corners": "", "elevation": "", "borders": "", "palette": "", "feel": "", "iconography": {} },
  "components": { "button": {}, "button-secondary": {}, "input": {}, "select": {}, "card": {}, "badge": {}, "sidebar-item": {}, "tab": {}, "modal": {}, "toggle": {}, "table-row": {}, "typography": {} }
}
```

## Snapshot vs Screenshot

- **snapshot** (text/DOM): use for navigation, element finding, structure analysis
- **screenshot** (image): use ONLY for visual reference captures (max 5 per extraction)
