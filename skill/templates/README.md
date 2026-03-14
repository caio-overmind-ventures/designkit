# DesignKit Templates

Templates for the 10 standard component pages. Each template has `{{PLACEHOLDER}}` markers for app-specific content.

## Usage

1. Copy template to `styleguides/<domain>/app/styleguide/components/<name>/page.tsx`
2. Replace `{{PLACEHOLDERS}}` with app-specific strings
3. Adjust styling classes if the app's character differs significantly

## Templates

| File | Component | Customization needed |
|------|-----------|---------------------|
| `form.tsx.template` | Form | Section titles, field names, placeholders |
| `layout.tsx.template` | Sidebar Layout | Brand name, logo |
| `navigation.ts.template` | Nav config | No changes needed (standard) |

## What stays the same across all apps (~80%):
- Component structure (Card > Header > Content)
- Validation states section
- Toggle/switch pattern
- Grid layouts

## What changes per app (~20%):
- Section titles and descriptions
- Placeholder text and default values
- Number of fields per section
- App-specific patterns (e.g., prefix inputs)

## Token savings
Before: ~2.5k output tokens per page × 10 pages = ~25k tokens
After: ~500 output tokens per page (just replacements) × 10 = ~5k tokens
**Savings: ~20k tokens per extraction (~80%)**
