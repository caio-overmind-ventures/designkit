// DesignKit — Single comprehensive extraction script
// Run via browser evaluate on each page to get ALL component specs at once
// Reduces multiple evaluate calls to a single call per page

(() => {
  function getSpecs(el) {
    if (!el) return null;
    const s = getComputedStyle(el);
    return {
      borderRadius: s.borderRadius,
      borderWidth: s.borderWidth,
      borderColor: s.borderColor,
      padding: s.padding,
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      fontFamily: s.fontFamily,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      textTransform: s.textTransform,
      backgroundColor: s.backgroundColor,
      color: s.color,
      boxShadow: s.boxShadow.substring(0, 150),
      gap: s.gap,
      height: s.height,
      minHeight: s.minHeight,
      width: s.width
    };
  }

  // 1. Global tokens (CSS variables)
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const body = getComputedStyle(document.body);
  const cssVars = [];
  for (let i = 0; i < styles.length; i++) {
    const prop = styles[i];
    if (prop.startsWith('--') && !prop.startsWith('--sx-') && !prop.startsWith('--tw-')) {
      const val = styles.getPropertyValue(prop).trim();
      if (val && val !== 'initial') cssVars.push({ name: prop, value: val });
    }
  }

  // 2. Component audit — all selectors in one pass
  const selectors = {
    'button-first': 'button:not([disabled])',
    'button-primary': 'button[data-variant="default"], button[class*="primary"], button[style*="background"]',
    'button-secondary': 'button[data-variant="secondary"], button[class*="secondary"], button[class*="outline"]',
    'input': 'input[type="text"], input[type="email"], input[type="number"], input:not([type]):not([role])',
    'select': 'select, [role="combobox"], [data-slot="select-trigger"]',
    'textarea': 'textarea',
    'card': '[data-slot="card"], [class*="card"], article',
    'table-row': 'tr, [role="row"]',
    'table-header': 'th, [role="columnheader"]',
    'badge': '[data-slot="badge"], [class*="badge"]',
    'sidebar': 'nav, [role="navigation"], aside',
    'sidebar-item': 'nav a, aside a, [role="navigation"] a',
    'sidebar-item-active': 'nav a[aria-current], nav a[data-active], aside a[aria-current]',
    'modal': '[role="dialog"], [data-slot="dialog"]',
    'tab': '[role="tab"]',
    'tab-active': '[role="tab"][aria-selected="true"], [role="tab"][data-state="active"]',
    'toggle': '[role="switch"]',
    'heading-h1': 'h1',
    'heading-h2': 'h2',
    'heading-h3': 'h3',
    'label': 'label',
    'small-text': '.text-xs, .text-sm, [class*="muted"], [class*="description"]',
    'link': 'a[href]:not(nav a)',
    'separator': 'hr, [role="separator"]',
    'checkbox': 'input[type="checkbox"], [role="checkbox"]',
    'progress': 'progress, [role="progressbar"]',
    'search-input': 'input[type="search"], input[placeholder*="Search"], input[placeholder*="Find"], input[placeholder*="Filter"]'
  };

  const components = {};
  for (const [name, selector] of Object.entries(selectors)) {
    try {
      const el = document.querySelector(selector);
      if (el) components[name] = getSpecs(el);
    } catch(e) {}
  }

  // 3. All visible buttons with their text (for variant detection)
  const buttonAudit = {};
  document.querySelectorAll('button:not([disabled])').forEach((btn) => {
    const text = btn.textContent.trim().substring(0, 30).replace(/\s+/g, '_');
    if (text && !buttonAudit[text]) {
      const s = getComputedStyle(btn);
      buttonAudit[text] = {
        bg: s.backgroundColor,
        color: s.color,
        borderRadius: s.borderRadius,
        boxShadow: s.boxShadow.substring(0, 100),
        height: s.height,
        padding: s.padding,
        fontWeight: s.fontWeight,
        fontSize: s.fontSize
      };
    }
  });

  // 4. Theme detection
  const isDark = body.backgroundColor === 'rgb(0, 0, 0)' ||
    root.classList.contains('dark') ||
    root.getAttribute('data-theme') === 'dark' ||
    getComputedStyle(root).colorScheme === 'dark';

  return JSON.stringify({
    _page: location.pathname,
    _mode: isDark ? 'dark' : 'light',
    _timestamp: new Date().toISOString(),
    global: {
      fonts: { body: body.fontFamily, size: body.fontSize, lineHeight: body.lineHeight },
      bg: body.backgroundColor,
      color: body.color,
      colorScheme: getComputedStyle(root).colorScheme
    },
    cssVars: cssVars.length,  // just count — full list only on first page
    cssVarsSample: cssVars.slice(0, 30),
    components,
    buttons: buttonAudit
  }, null, 2);
})();
