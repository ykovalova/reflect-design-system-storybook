export type ColorToken = {
  name: string;
  cssVar: string;
  value: string;
  family: "gray" | "brand" | "accent";
  source: string;
};

export type SpacingToken = {
  name: string;
  cssVar: string;
  px: number;
  rem: string;
};

export type TypographyToken = {
  name: string;
  cssVar: string;
  category: "heading" | "body" | "caption" | "button";
  family: string;
  weight: string;
  sizePx: number;
  lineHeightPx: number;
  letterSpacing: string;
  textTransform?: "uppercase";
  sample: string;
};

export const foundationNotes = {
  status: "stage2_button_transferred",
  nextAction: "Install Node.js and run Storybook locally to review the transferred foundations and Button component.",
  colorNote:
    "Colors were transferred from verified swatch cards and confirmed file-level variables. The Colors page structure shows more status scales than are currently mapped into code tokens."
} as const;

export const colorTokens: ColorToken[] = [
  { name: "Gray 00", cssVar: "--color-gray-00", value: "#FFFFFF", family: "gray", source: "gray-00" },
  { name: "Gray 05", cssVar: "--color-gray-05", value: "#FAFAFC", family: "gray", source: "gray-05" },
  { name: "Gray 90", cssVar: "--color-gray-90", value: "#3E3E46", family: "gray", source: "gray-90" },
  { name: "Gray 100", cssVar: "--color-gray-100", value: "#212128", family: "gray", source: "gray-100" },
  { name: "Brand 05", cssVar: "--color-brand-05", value: "#F9F9FE", family: "brand", source: "brand-05" },
  { name: "Brand 10", cssVar: "--color-brand-10", value: "#EBEBFB", family: "brand", source: "brand-10" },
  { name: "Brand 70", cssVar: "--color-brand-70", value: "#6361E2", family: "brand", source: "brand-70" },
  { name: "Brand 75", cssVar: "--color-brand-75", value: "#3C3ADB", family: "brand", source: "brand-75" },
  { name: "Brand 95", cssVar: "--color-brand-95", value: "#181758", family: "brand", source: "brand-95" },
  { name: "Red 2.5", cssVar: "--color-red-2-5", value: "#FEFCFC", family: "accent", source: "red-2,5" },
  { name: "Red 50", cssVar: "--color-red-50", value: "#D27872", family: "accent", source: "red-50" },
  { name: "Red 90", cssVar: "--color-red-90", value: "#8C160F", family: "accent", source: "red-90" },
  { name: "Blue 2.5", cssVar: "--color-blue-2-5", value: "#F6F8FD", family: "accent", source: "blue-2,5" },
  { name: "Accent Strong", cssVar: "--color-accent-strong", value: "#FF730B", family: "accent", source: "Product Accents/Brand/Brand 1" },
  { name: "Accent Soft", cssVar: "--color-accent-soft", value: "#FF8F0F", family: "accent", source: "Product Accents/Brand/Brand 2" }
];

export const semanticColorTokens = [
  { name: "Surface Primary", cssVar: "--color-surface-primary", value: "var(--color-gray-00)", mapsTo: "gray-00" },
  { name: "Surface Secondary", cssVar: "--color-surface-secondary", value: "var(--color-gray-05)", mapsTo: "gray-05" },
  { name: "Text Primary", cssVar: "--color-text-primary", value: "var(--color-gray-100)", mapsTo: "gray-100" },
  { name: "Text Secondary", cssVar: "--color-text-secondary", value: "var(--color-gray-90)", mapsTo: "gray-90" },
  { name: "Action Primary", cssVar: "--color-action-primary", value: "var(--color-brand-75)", mapsTo: "brand-75" },
  { name: "Action Primary Hover", cssVar: "--color-action-primary-hover", value: "var(--color-brand-95)", mapsTo: "brand-95" },
  { name: "Action Danger", cssVar: "--color-action-danger", value: "var(--color-red-90)", mapsTo: "red-90" },
  { name: "Action Danger Surface", cssVar: "--color-action-danger-surface", value: "var(--color-red-2-5)", mapsTo: "red-2,5" },
  { name: "Action Danger Border", cssVar: "--color-action-danger-border", value: "var(--color-red-50)", mapsTo: "red-50" },
  { name: "Focus Ring", cssVar: "--color-focus-ring", value: "var(--color-blue-2-5)", mapsTo: "blue-2,5" }
] as const;

export const spacingTokens: SpacingToken[] = [
  { name: "Spacing-2", cssVar: "--space-2", px: 2, rem: "0.125rem" },
  { name: "Spacing-4", cssVar: "--space-4", px: 4, rem: "0.25rem" },
  { name: "Spacing-8", cssVar: "--space-8", px: 8, rem: "0.5rem" },
  { name: "Spacing-12", cssVar: "--space-12", px: 12, rem: "0.75rem" },
  { name: "Spacing-16", cssVar: "--space-16", px: 16, rem: "1rem" },
  { name: "Spacing-20", cssVar: "--space-20", px: 20, rem: "1.25rem" },
  { name: "Spacing-24", cssVar: "--space-24", px: 24, rem: "1.5rem" },
  { name: "Spacing-32", cssVar: "--space-32", px: 32, rem: "2rem" },
  { name: "Spacing-40", cssVar: "--space-40", px: 40, rem: "2.5rem" },
  { name: "Spacing-48", cssVar: "--space-48", px: 48, rem: "3rem" },
  { name: "Spacing-56", cssVar: "--space-56", px: 56, rem: "3.5rem" },
  { name: "Spacing-64", cssVar: "--space-64", px: 64, rem: "4rem" },
  { name: "Spacing-72", cssVar: "--space-72", px: 72, rem: "4.5rem" },
  { name: "Spacing-80", cssVar: "--space-80", px: 80, rem: "5rem" },
  { name: "Spacing-96", cssVar: "--space-96", px: 96, rem: "6rem" },
  { name: "Spacing-120", cssVar: "--space-120", px: 120, rem: "7.5rem" },
  { name: "Spacing-144", cssVar: "--space-144", px: 144, rem: "9rem" }
];

export const typographyTokens: TypographyToken[] = [
  {
    name: "H1 Regular",
    cssVar: "--font-heading-h1-regular",
    category: "heading",
    family: "Inter",
    weight: "400",
    sizePx: 22,
    lineHeightPx: 32,
    letterSpacing: "0px",
    sample: "Numbers in suites"
  },
  {
    name: "H1 Medium",
    cssVar: "--font-heading-h1-medium",
    category: "heading",
    family: "Inter",
    weight: "500",
    sizePx: 22,
    lineHeightPx: 32,
    letterSpacing: "0px",
    sample: "Numbers in suites"
  },
  {
    name: "H1 Semibold",
    cssVar: "--font-heading-h1-semibold",
    category: "heading",
    family: "Inter",
    weight: "600",
    sizePx: 22,
    lineHeightPx: 32,
    letterSpacing: "0px",
    sample: "Numbers in suites"
  },
  {
    name: "H2 Regular",
    cssVar: "--font-heading-h2-regular",
    category: "heading",
    family: "Inter",
    weight: "400",
    sizePx: 20,
    lineHeightPx: 30,
    letterSpacing: "0px",
    sample: "Subsection/action bar"
  },
  {
    name: "H2 Medium",
    cssVar: "--font-heading-h2-medium",
    category: "heading",
    family: "Inter",
    weight: "500",
    sizePx: 20,
    lineHeightPx: 30,
    letterSpacing: "0px",
    sample: "Subsection/action bar"
  },
  {
    name: "H2 Semibold",
    cssVar: "--font-heading-h2-semibold",
    category: "heading",
    family: "Inter",
    weight: "600",
    sizePx: 20,
    lineHeightPx: 30,
    letterSpacing: "0px",
    sample: "Subsection/action bar"
  },
  {
    name: "H3 Regular",
    cssVar: "--font-heading-h3-regular",
    category: "heading",
    family: "Inter",
    weight: "400",
    sizePx: 18,
    lineHeightPx: 26,
    letterSpacing: "0px",
    sample: "Name of the suites"
  },
  {
    name: "H3 Medium",
    cssVar: "--font-heading-h3-medium",
    category: "heading",
    family: "Inter",
    weight: "500",
    sizePx: 18,
    lineHeightPx: 26,
    letterSpacing: "0px",
    sample: "Name of the suites"
  },
  {
    name: "H3 Semibold",
    cssVar: "--font-heading-h3-semibold",
    category: "heading",
    family: "Inter",
    weight: "600",
    sizePx: 18,
    lineHeightPx: 26,
    letterSpacing: "0px",
    sample: "Name of the suites"
  },
  {
    name: "H4 Regular",
    cssVar: "--font-heading-h4-regular",
    category: "heading",
    family: "Inter",
    weight: "400",
    sizePx: 16,
    lineHeightPx: 24,
    letterSpacing: "0px",
    sample: "Section heading"
  },
  {
    name: "H4 Medium",
    cssVar: "--font-heading-h4-medium",
    category: "heading",
    family: "Inter",
    weight: "500",
    sizePx: 16,
    lineHeightPx: 24,
    letterSpacing: "0px",
    sample: "Section heading"
  },
  {
    name: "H4 Semibold",
    cssVar: "--font-heading-h4-semibold",
    category: "heading",
    family: "Inter",
    weight: "600",
    sizePx: 16,
    lineHeightPx: 24,
    letterSpacing: "0px",
    sample: "Section heading"
  },
  {
    name: "H5 Regular",
    cssVar: "--font-heading-h5-regular",
    category: "heading",
    family: "Inter",
    weight: "400",
    sizePx: 11,
    lineHeightPx: 16,
    letterSpacing: "0px",
    textTransform: "uppercase",
    sample: "All caps heading"
  },
  {
    name: "H5 Medium",
    cssVar: "--font-heading-h5-medium",
    category: "heading",
    family: "Inter",
    weight: "500",
    sizePx: 11,
    lineHeightPx: 16,
    letterSpacing: "0px",
    textTransform: "uppercase",
    sample: "All caps heading"
  },
  {
    name: "H5 Semibold",
    cssVar: "--font-heading-h5-semibold",
    category: "heading",
    family: "Inter",
    weight: "600",
    sizePx: 11,
    lineHeightPx: 16,
    letterSpacing: "0px",
    textTransform: "uppercase",
    sample: "All caps heading"
  },
  {
    name: "Body 1 Regular",
    cssVar: "--font-body-1-regular",
    category: "body",
    family: "Inter",
    weight: "400",
    sizePx: 14,
    lineHeightPx: 20,
    letterSpacing: "0px",
    sample: "Body copy for app content and supporting UI text."
  },
  {
    name: "Body 1 Medium",
    cssVar: "--font-body-1-medium",
    category: "body",
    family: "Inter",
    weight: "500",
    sizePx: 14,
    lineHeightPx: 20,
    letterSpacing: "0px",
    sample: "Body copy for app content and supporting UI text."
  },
  {
    name: "Body 1 Semibold",
    cssVar: "--font-body-1-semibold",
    category: "body",
    family: "Inter",
    weight: "600",
    sizePx: 14,
    lineHeightPx: 20,
    letterSpacing: "0px",
    sample: "Body copy for app content and supporting UI text."
  },
  {
    name: "Body 2 Regular",
    cssVar: "--font-body-2-regular",
    category: "body",
    family: "Inter",
    weight: "400",
    sizePx: 12,
    lineHeightPx: 18,
    letterSpacing: "0px",
    sample: "Compact support copy for metadata and dense layouts."
  },
  {
    name: "Body 2 Underline",
    cssVar: "--font-body-2-underline",
    category: "body",
    family: "Inter",
    weight: "400",
    sizePx: 12,
    lineHeightPx: 18,
    letterSpacing: "0px",
    sample: "Compact support copy for linked text."
  },
  {
    name: "Body 2 Medium",
    cssVar: "--font-body-2-medium",
    category: "body",
    family: "Inter",
    weight: "500",
    sizePx: 12,
    lineHeightPx: 18,
    letterSpacing: "0px",
    sample: "Compact support copy for metadata and dense layouts."
  },
  {
    name: "Body 2 Semibold",
    cssVar: "--font-body-2-semibold",
    category: "body",
    family: "Inter",
    weight: "600",
    sizePx: 12,
    lineHeightPx: 18,
    letterSpacing: "0px",
    sample: "Compact support copy for metadata and dense layouts."
  },
  {
    name: "Caption Field",
    cssVar: "--font-caption-field",
    category: "caption",
    family: "Inter",
    weight: "400",
    sizePx: 10,
    lineHeightPx: 16,
    letterSpacing: "0px",
    sample: "Caption field"
  },
  {
    name: "Tooltip",
    cssVar: "--font-tooltip",
    category: "caption",
    family: "Inter",
    weight: "400",
    sizePx: 10,
    lineHeightPx: 12,
    letterSpacing: "0px",
    sample: "Tooltip helper copy"
  },
  {
    name: "Button Large",
    cssVar: "--font-button-large",
    category: "button",
    family: "Inter",
    weight: "500",
    sizePx: 16,
    lineHeightPx: 24,
    letterSpacing: "0px",
    sample: "Primary action"
  },
  {
    name: "Button Medium",
    cssVar: "--font-button-medium",
    category: "button",
    family: "Inter",
    weight: "500",
    sizePx: 14,
    lineHeightPx: 16,
    letterSpacing: "0px",
    sample: "Secondary action"
  },
  {
    name: "Button Small",
    cssVar: "--font-button-small",
    category: "button",
    family: "Inter",
    weight: "500",
    sizePx: 12,
    lineHeightPx: 16,
    letterSpacing: "0px",
    sample: "Tertiary action"
  }
];
