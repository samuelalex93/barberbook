// Color constants from CSS variables defined in index.css
// These map directly to the CSS custom properties in :root

export const COLORS = {
  // Accent colors
  accent: 'var(--color-brand-accent)', // #F97316
  accentDark: 'var(--color-brand-accent-dark)', // #E67E0D
  accentLight: 'var(--color-brand-accent-light)', // #FFF7ED

  // Text colors
  text: 'var(--color-brand-text)', // #111827
  textSecondary: 'var(--color-brand-text-secondary)', // #6B7280
  textTertiary: 'var(--color-brand-text-tertiary)', // #9CA3AF

  // Background colors
  light: 'var(--color-brand-light)', // #F5F5F5
  mid: 'var(--color-brand-mid)', // #E5E5E5
  border: 'var(--color-brand-border)', // #D4D4D4

  // Gray scale
  gray100: 'var(--color-brand-gray-100)', // #F3F4F6
  gray200: 'var(--color-brand-gray-200)', // #E5E7EB
  gray400: 'var(--color-brand-gray-400)', // #9CA3AF
  gray600: 'var(--color-brand-gray-600)', // #4B5563

  // Status colors
  danger: 'var(--color-brand-danger)', // #EF4444
  dangerDark: 'var(--color-brand-danger-dark)', // #DC2626
} as const;

export type ColorKey = keyof typeof COLORS;
