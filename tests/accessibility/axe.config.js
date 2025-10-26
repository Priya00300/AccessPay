export const axeConfig = {
  rules: {
    // Enforce WCAG 2.1 AA standards
    'color-contrast': { enabled: true },
    'html-has-lang': { enabled: true },
    'valid-lang': { enabled: true },
    'landmark-one-main': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true },
    'label': { enabled: true },
    'button-name': { enabled: true },
    'link-name': { enabled: true },
    'aria-required-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'tabindex': { enabled: true },
    'focus-order-semantics': { enabled: true }
  }
}

export const axeTags = [
  'wcag2a',
  'wcag2aa',
  'wcag21a',
  'wcag21aa',
  'best-practice'
]