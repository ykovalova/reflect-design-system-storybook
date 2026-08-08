export type ColorToken = {
  name: string;
  cssVar: string;
  value: string;
  family: "gray" | "brand" | "red" | "green" | "yellow" | "blue" | "purple";
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

export type ShadowToken = {
  name: string;
  cssVar: string;
  value: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
};

export const foundationNotes = {
  status: "stage1_foundations_verified",
  nextAction: "Validate whether radius and theme modes should be added once they are exposed as dedicated Figma foundations.",
  colorNote:
    "All primitive palette tokens from the linked Figma Colors page are present in the token source.",
  elevationNote:
    "The linked Figma Elevations page defines two box shadows, now documented as elevation tokens in Storybook.",
  themeNote:
    "No Figma variable collections or theme modes were exposed in this file, so semantic aliases remain a code-side mapping layer."
} as const;

export const colorTokens: ColorToken[] = [
  { name: "Gray 00", cssVar: "--color-gray-00", value: "#FFFFFF", family: "gray", source: "gray-00" },
  { name: "Gray 05", cssVar: "--color-gray-05", value: "#FAFAFC", family: "gray", source: "gray-05" },
  { name: "Gray 10", cssVar: "--color-gray-10", value: "#F7F7F9", family: "gray", source: "gray-10" },
  { name: "Gray 15", cssVar: "--color-gray-15", value: "#EFEFF2", family: "gray", source: "gray-15" },
  { name: "Gray 20", cssVar: "--color-gray-20", value: "#E0E0E5", family: "gray", source: "gray-20" },
  { name: "Gray 30", cssVar: "--color-gray-30", value: "#D0D0D9", family: "gray", source: "gray-30" },
  { name: "Gray 40", cssVar: "--color-gray-40", value: "#C1C1CC", family: "gray", source: "gray-40" },
  { name: "Gray 50", cssVar: "--color-gray-50", value: "#B1B1BF", family: "gray", source: "gray-50" },
  { name: "Gray 60", cssVar: "--color-gray-60", value: "#9494A1", family: "gray", source: "gray-60" },
  { name: "Gray 70", cssVar: "--color-gray-70", value: "#777783", family: "gray", source: "gray-70" },
  { name: "Gray 80", cssVar: "--color-gray-80", value: "#5B5B64", family: "gray", source: "gray-80" },
  { name: "Gray 90", cssVar: "--color-gray-90", value: "#3E3E46", family: "gray", source: "gray-90" },
  { name: "Gray 100", cssVar: "--color-gray-100", value: "#212128", family: "gray", source: "gray-100" },
  { name: "Brand 05", cssVar: "--color-brand-05", value: "#F9F9FE", family: "brand", source: "brand-05" },
  { name: "Brand 10", cssVar: "--color-brand-10", value: "#EBEBFB", family: "brand", source: "brand-10" },
  { name: "Brand 20", cssVar: "--color-brand-20", value: "#DCDCF9", family: "brand", source: "brand-20" },
  { name: "Brand 30", cssVar: "--color-brand-30", value: "#CECEF6", family: "brand", source: "brand-30" },
  { name: "Brand 40", cssVar: "--color-brand-40", value: "#B9B8F2", family: "brand", source: "brand-40" },
  { name: "Brand 50", cssVar: "--color-brand-50", value: "#A3A2EE", family: "brand", source: "brand-50" },
  { name: "Brand 55", cssVar: "--color-brand-55", value: "#8E8CEA", family: "brand", source: "brand-55" },
  { name: "Brand 60", cssVar: "--color-brand-60", value: "#7877E6", family: "brand", source: "brand-60" },
  { name: "Brand 70", cssVar: "--color-brand-70", value: "#6361E2", family: "brand", source: "brand-70" },
  { name: "Brand 75", cssVar: "--color-brand-75", value: "#3C3ADB", family: "brand", source: "brand-75" },
  { name: "Brand 80", cssVar: "--color-brand-80", value: "#302EAF", family: "brand", source: "brand-80" },
  { name: "Brand 90", cssVar: "--color-brand-90", value: "#242383", family: "brand", source: "brand-90" },
  { name: "Brand 95", cssVar: "--color-brand-95", value: "#181758", family: "brand", source: "brand-95" },
  { name: "Brand 100", cssVar: "--color-brand-100", value: "#030445", family: "brand", source: "brand-100" },
  { name: "Red 2.5", cssVar: "--color-red-2-5", value: "#FEFCFC", family: "red", source: "red-2,5" },
  { name: "Red 05", cssVar: "--color-red-05", value: "#FEFCFC", family: "red", source: "red-05" },
  { name: "Red 10", cssVar: "--color-red-10", value: "#FDF9F9", family: "red", source: "red-10" },
  { name: "Red 20", cssVar: "--color-red-20", value: "#F7E2E1", family: "red", source: "red-20" },
  { name: "Red 30", cssVar: "--color-red-30", value: "#EFCDCB", family: "red", source: "red-30" },
  { name: "Red 40", cssVar: "--color-red-40", value: "#E3A39E", family: "red", source: "red-40" },
  { name: "Red 50", cssVar: "--color-red-50", value: "#D27872", family: "red", source: "red-50" },
  { name: "Red 60", cssVar: "--color-red-60", value: "#C34E45", family: "red", source: "red-60" },
  { name: "Red 70", cssVar: "--color-red-70", value: "#B42419", family: "red", source: "red-70" },
  { name: "Red 80", cssVar: "--color-red-80", value: "#901D14", family: "red", source: "red-80" },
  { name: "Red 90", cssVar: "--color-red-90", value: "#6C160F", family: "red", source: "red-90" },
  { name: "Red 100", cssVar: "--color-red-100", value: "#360B08", family: "red", source: "red-100" },
  { name: "Green 2.5", cssVar: "--color-green-2-5", value: "#F7FCF9", family: "green", source: "green-2,5" },
  { name: "Green 05", cssVar: "--color-green-05", value: "#F9FDFA", family: "green", source: "green-05" },
  { name: "Green 10", cssVar: "--color-green-10", value: "#F2FBF5", family: "green", source: "green-10" },
  { name: "Green 20", cssVar: "--color-green-20", value: "#EAF9F0", family: "green", source: "green-20" },
  { name: "Green 30", cssVar: "--color-green-30", value: "#D6F3E1", family: "green", source: "green-30" },
  { name: "Green 40", cssVar: "--color-green-40", value: "#ADE7C4", family: "green", source: "green-40" },
  { name: "Green 50", cssVar: "--color-green-50", value: "#84DAA6", family: "green", source: "green-50" },
  { name: "Green 60", cssVar: "--color-green-60", value: "#5BCE89", family: "green", source: "green-60" },
  { name: "Green 70", cssVar: "--color-green-70", value: "#32C26B", family: "green", source: "green-70" },
  { name: "Green 80", cssVar: "--color-green-80", value: "#289B56", family: "green", source: "green-80" },
  { name: "Green 90", cssVar: "--color-green-90", value: "#1E7440", family: "green", source: "green-90" },
  { name: "Green 100", cssVar: "--color-green-100", value: "#0F3A20", family: "green", source: "green-100" },
  { name: "Yellow 2.5", cssVar: "--color-yellow-2-5", value: "#FFFDFB", family: "yellow", source: "yellow-2,5" },
  { name: "Yellow 05", cssVar: "--color-yellow-05", value: "#FFFDF8", family: "yellow", source: "yellow-05" },
  { name: "Yellow 10", cssVar: "--color-yellow-10", value: "#FFFCF4", family: "yellow", source: "yellow-10" },
  { name: "Yellow 20", cssVar: "--color-yellow-20", value: "#FFF9ED", family: "yellow", source: "yellow-20" },
  { name: "Yellow 30", cssVar: "--color-yellow-30", value: "#FFF4DB", family: "yellow", source: "yellow-30" },
  { name: "Yellow 40", cssVar: "--color-yellow-40", value: "#FFE9B7", family: "yellow", source: "yellow-40" },
  { name: "Yellow 50", cssVar: "--color-yellow-50", value: "#FFDE94", family: "yellow", source: "yellow-50" },
  { name: "Yellow 60", cssVar: "--color-yellow-60", value: "#FFD370", family: "yellow", source: "yellow-60" },
  { name: "Yellow 70", cssVar: "--color-yellow-70", value: "#FFC84C", family: "yellow", source: "yellow-70" },
  { name: "Yellow 80", cssVar: "--color-yellow-80", value: "#D3A53D", family: "yellow", source: "yellow-80" },
  { name: "Yellow 90", cssVar: "--color-yellow-90", value: "#A7822E", family: "yellow", source: "yellow-90" },
  { name: "Yellow 100", cssVar: "--color-yellow-100", value: "#654D17", family: "yellow", source: "yellow-100" },
  { name: "Blue 2.5", cssVar: "--color-blue-2-5", value: "#F6F8FD", family: "blue", source: "blue-2,5" },
  { name: "Blue 05", cssVar: "--color-blue-05", value: "#F6F8FD", family: "blue", source: "blue-05" },
  { name: "Blue 10", cssVar: "--color-blue-10", value: "#F2F5FD", family: "blue", source: "blue-10" },
  { name: "Blue 20", cssVar: "--color-blue-20", value: "#E8EDFB", family: "blue", source: "blue-20" },
  { name: "Blue 30", cssVar: "--color-blue-30", value: "#D2DBF7", family: "blue", source: "blue-30" },
  { name: "Blue 40", cssVar: "--color-blue-40", value: "#A5B8EF", family: "blue", source: "blue-40" },
  { name: "Blue 50", cssVar: "--color-blue-50", value: "#7894E7", family: "blue", source: "blue-50" },
  { name: "Blue 60", cssVar: "--color-blue-60", value: "#4B71DF", family: "blue", source: "blue-60" },
  { name: "Blue 70", cssVar: "--color-blue-70", value: "#1E4DD7", family: "blue", source: "blue-70" },
  { name: "Blue 80", cssVar: "--color-blue-80", value: "#183EAC", family: "blue", source: "blue-80" },
  { name: "Blue 90", cssVar: "--color-blue-90", value: "#122E81", family: "blue", source: "blue-90" },
  { name: "Blue 100", cssVar: "--color-blue-100", value: "#091741", family: "blue", source: "blue-100" },
  { name: "Purple 2.5", cssVar: "--color-purple-2-5", value: "#FCFBFE", family: "purple", source: "purple-2,5" },
  { name: "Purple 05", cssVar: "--color-purple-05", value: "#F9F7FD", family: "purple", source: "purple-05" },
  { name: "Purple 10", cssVar: "--color-purple-10", value: "#F3F0FB", family: "purple", source: "purple-10" },
  { name: "Purple 20", cssVar: "--color-purple-20", value: "#F0ECF9", family: "purple", source: "purple-20" },
  { name: "Purple 30", cssVar: "--color-purple-30", value: "#E1D9F4", family: "purple", source: "purple-30" },
  { name: "Purple 40", cssVar: "--color-purple-40", value: "#C2B3E9", family: "purple", source: "purple-40" },
  { name: "Purple 50", cssVar: "--color-purple-50", value: "#A48DDD", family: "purple", source: "purple-50" },
  { name: "Purple 60", cssVar: "--color-purple-60", value: "#8567D2", family: "purple", source: "purple-60" },
  { name: "Purple 70", cssVar: "--color-purple-70", value: "#6741C7", family: "purple", source: "purple-70" },
  { name: "Purple 80", cssVar: "--color-purple-80", value: "#52349F", family: "purple", source: "purple-80" },
  { name: "Purple 90", cssVar: "--color-purple-90", value: "#3E2777", family: "purple", source: "purple-90" },
  { name: "Purple 100", cssVar: "--color-purple-100", value: "#1F143C", family: "purple", source: "purple-100" }
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

export const shadowTokens: ShadowToken[] = [
  {
    name: "Box Shadow 1",
    cssVar: "--shadow-elevation-1",
    value: "0 2px 20px rgba(150, 148, 161, 0.2)",
    x: 0,
    y: 2,
    blur: 20,
    spread: 0,
    color: "rgba(150, 148, 161, 0.2)"
  },
  {
    name: "Box Shadow 2",
    cssVar: "--shadow-elevation-2",
    value: "1px 5px 10px 2px rgba(91, 91, 100, 0.3)",
    x: 1,
    y: 5,
    blur: 10,
    spread: 2,
    color: "rgba(91, 91, 100, 0.3)"
  }
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

export type SemanticColorToken = {
  name: string;
  cssVar: string;
  propertyGroup: "text" | "icon" | "surface" | "border" | "action" | "status" | "focus";
  propertySubgroup: string;
  intentGroup: "neutral" | "brand" | "danger" | "success" | "warning" | "info" | "focus" | "on-solid";
  globalAlias: string;
  hex: string;
  notes?: string;
};

export const fullSemanticColorTokens: SemanticColorToken[] = [
  // ─── Text (14) ───────────────────────────────────────────────────────────
  { name: "Text/Strong",          cssVar: "--color-text-strong",           propertyGroup: "text",    propertySubgroup: "neutral",  intentGroup: "neutral",  globalAlias: "Gray/100",           hex: "#212128" },
  { name: "Text/Primary",         cssVar: "--color-text-primary",          propertyGroup: "text",    propertySubgroup: "neutral",  intentGroup: "neutral",  globalAlias: "Gray/90",            hex: "#3E3E46" },
  { name: "Text/Secondary",       cssVar: "--color-text-secondary",        propertyGroup: "text",    propertySubgroup: "neutral",  intentGroup: "neutral",  globalAlias: "Gray/70",            hex: "#777783" },
  { name: "Text/Disabled",        cssVar: "--color-text-disabled",         propertyGroup: "text",    propertySubgroup: "neutral",  intentGroup: "neutral",  globalAlias: "Gray/50",            hex: "#B1B1BF" },
  { name: "Text/Inverse",         cssVar: "--color-text-inverse",          propertyGroup: "text",    propertySubgroup: "neutral",  intentGroup: "on-solid", globalAlias: "Gray/00",            hex: "#FFFFFF" },
  { name: "Text/Link",            cssVar: "--color-text-link",             propertyGroup: "text",    propertySubgroup: "brand",    intentGroup: "brand",    globalAlias: "Brand/75",           hex: "#3C3ADB" },
  { name: "Text/LinkHover",       cssVar: "--color-text-link-hover",       propertyGroup: "text",    propertySubgroup: "brand",    intentGroup: "brand",    globalAlias: "Brand/90",           hex: "#242383" },
  { name: "Text/Action",          cssVar: "--color-text-action",           propertyGroup: "text",    propertySubgroup: "brand",    intentGroup: "brand",    globalAlias: "Brand/75",           hex: "#3C3ADB" },
  { name: "Text/Danger",          cssVar: "--color-text-danger",           propertyGroup: "text",    propertySubgroup: "danger",   intentGroup: "danger",   globalAlias: "Red/70",             hex: "#B42419" },
  { name: "Text/Success",         cssVar: "--color-text-success",          propertyGroup: "text",    propertySubgroup: "success",  intentGroup: "success",  globalAlias: "Green/100",          hex: "#0F3A20" },
  { name: "Text/Warning",         cssVar: "--color-text-warning",          propertyGroup: "text",    propertySubgroup: "warning",  intentGroup: "warning",  globalAlias: "Yellow/100",         hex: "#654D17" },
  { name: "Text/Info",            cssVar: "--color-text-info",             propertyGroup: "text",    propertySubgroup: "info",     intentGroup: "info",     globalAlias: "Blue/80",            hex: "#183EAC" },
  { name: "Text/OnSolid",         cssVar: "--color-text-on-solid",         propertyGroup: "text",    propertySubgroup: "on-solid", intentGroup: "on-solid", globalAlias: "Gray/00",            hex: "#FFFFFF" },
  { name: "Text/OnWarningSolid",  cssVar: "--color-text-on-warning-solid", propertyGroup: "text",    propertySubgroup: "on-solid", intentGroup: "on-solid", globalAlias: "Gray/90",            hex: "#3E3E46" },

  // ─── Icon (9) — all alias Text counterparts ⚠️ ──────────────────────────
  { name: "Icon/Primary",   cssVar: "--color-icon-primary",   propertyGroup: "icon", propertySubgroup: "neutral", intentGroup: "neutral",  globalAlias: "Text/Primary → Gray/90",   hex: "#3E3E46", notes: "Aliases Text/Primary — no independent value" },
  { name: "Icon/Secondary", cssVar: "--color-icon-secondary", propertyGroup: "icon", propertySubgroup: "neutral", intentGroup: "neutral",  globalAlias: "Text/Secondary → Gray/70", hex: "#777783", notes: "Aliases Text/Secondary" },
  { name: "Icon/Disabled",  cssVar: "--color-icon-disabled",  propertyGroup: "icon", propertySubgroup: "neutral", intentGroup: "neutral",  globalAlias: "Text/Disabled → Gray/50",  hex: "#B1B1BF", notes: "Aliases Text/Disabled" },
  { name: "Icon/Inverse",   cssVar: "--color-icon-inverse",   propertyGroup: "icon", propertySubgroup: "neutral", intentGroup: "on-solid", globalAlias: "Text/Inverse → Gray/00",   hex: "#FFFFFF", notes: "Aliases Text/Inverse" },
  { name: "Icon/Action",    cssVar: "--color-icon-action",    propertyGroup: "icon", propertySubgroup: "brand",   intentGroup: "brand",    globalAlias: "Text/Action → Brand/75",   hex: "#3C3ADB", notes: "Aliases Text/Action" },
  { name: "Icon/Danger",    cssVar: "--color-icon-danger",    propertyGroup: "icon", propertySubgroup: "danger",  intentGroup: "danger",   globalAlias: "Text/Danger → Red/70",     hex: "#B42419", notes: "Aliases Text/Danger" },
  { name: "Icon/Success",   cssVar: "--color-icon-success",   propertyGroup: "icon", propertySubgroup: "success", intentGroup: "success",  globalAlias: "Text/Success → Green/100", hex: "#0F3A20", notes: "Aliases Text/Success" },
  { name: "Icon/Warning",   cssVar: "--color-icon-warning",   propertyGroup: "icon", propertySubgroup: "warning", intentGroup: "warning",  globalAlias: "Text/Warning → Yellow/100",hex: "#654D17", notes: "Aliases Text/Warning" },
  { name: "Icon/Info",      cssVar: "--color-icon-info",      propertyGroup: "icon", propertySubgroup: "info",    intentGroup: "info",     globalAlias: "Text/Info → Blue/80",      hex: "#183EAC", notes: "Aliases Text/Info" },

  // ─── Surface (6) ─────────────────────────────────────────────────────────
  { name: "Surface/Base",     cssVar: "--color-surface-base",     propertyGroup: "surface", propertySubgroup: "neutral", intentGroup: "neutral", globalAlias: "Gray/00",   hex: "#FFFFFF" },
  { name: "Surface/Subtle",   cssVar: "--color-surface-subtle",   propertyGroup: "surface", propertySubgroup: "neutral", intentGroup: "neutral", globalAlias: "Gray/05",   hex: "#FAFAFC" },
  { name: "Surface/Muted",    cssVar: "--color-surface-muted",    propertyGroup: "surface", propertySubgroup: "neutral", intentGroup: "neutral", globalAlias: "Gray/10",   hex: "#F7F7F9" },
  { name: "Surface/Disabled", cssVar: "--color-surface-disabled", propertyGroup: "surface", propertySubgroup: "neutral", intentGroup: "neutral", globalAlias: "Gray/15",   hex: "#EFEFF2" },
  { name: "Surface/Raised",   cssVar: "--color-surface-raised",   propertyGroup: "surface", propertySubgroup: "neutral", intentGroup: "neutral", globalAlias: "Gray/00",   hex: "#FFFFFF", notes: "⚠️ Same value as Surface/Base — elevation via shadow only?" },
  { name: "Surface/Selected", cssVar: "--color-surface-selected", propertyGroup: "surface", propertySubgroup: "brand",   intentGroup: "brand",   globalAlias: "Brand/10",  hex: "#EBEBFB" },

  // ─── Border (10) ─────────────────────────────────────────────────────────
  { name: "Border/Subtle",   cssVar: "--color-border-subtle",   propertyGroup: "border", propertySubgroup: "neutral", intentGroup: "neutral", globalAlias: "Gray/20",   hex: "#E0E0E5" },
  { name: "Border/Default",  cssVar: "--color-border-default",  propertyGroup: "border", propertySubgroup: "neutral", intentGroup: "neutral", globalAlias: "Gray/50",   hex: "#B1B1BF" },
  { name: "Border/Strong",   cssVar: "--color-border-strong",   propertyGroup: "border", propertySubgroup: "neutral", intentGroup: "neutral", globalAlias: "Gray/70",   hex: "#777783" },
  { name: "Border/Disabled", cssVar: "--color-border-disabled", propertyGroup: "border", propertySubgroup: "neutral", intentGroup: "neutral", globalAlias: "Gray/50",   hex: "#B1B1BF", notes: "⚠️ Spelled 'Disbabled' in live Figma library" },
  { name: "Border/Selected", cssVar: "--color-border-selected", propertyGroup: "border", propertySubgroup: "brand",   intentGroup: "brand",   globalAlias: "Brand/75",  hex: "#3C3ADB" },
  { name: "Border/Danger",   cssVar: "--color-border-danger",   propertyGroup: "border", propertySubgroup: "danger",  intentGroup: "danger",  globalAlias: "Red/70",    hex: "#B42419" },
  { name: "Border/Focus",    cssVar: "--color-border-focus",    propertyGroup: "border", propertySubgroup: "focus",   intentGroup: "focus",   globalAlias: "#0066FF",   hex: "#0066FF" },
  { name: "Border/Info",     cssVar: "--color-border-info",     propertyGroup: "border", propertySubgroup: "info",    intentGroup: "info",    globalAlias: "Blue/70",   hex: "#1E4DD7" },
  { name: "Border/Warning",  cssVar: "--color-border-warning",  propertyGroup: "border", propertySubgroup: "warning", intentGroup: "warning", globalAlias: "Yellow/70", hex: "#FFC84C" },
  { name: "Border/Success",  cssVar: "--color-border-success",  propertyGroup: "border", propertySubgroup: "success", intentGroup: "success", globalAlias: "Green/70",  hex: "#32C26B" },

  // ─── Action — Primary (5) ────────────────────────────────────────────────
  { name: "Action/Primary/Default",  cssVar: "--color-action-primary-default",  propertyGroup: "action", propertySubgroup: "primary", intentGroup: "brand",    globalAlias: "Brand/75",                hex: "#3C3ADB" },
  { name: "Action/Primary/Hover",    cssVar: "--color-action-primary-hover",    propertyGroup: "action", propertySubgroup: "primary", intentGroup: "brand",    globalAlias: "Brand/80",                hex: "#302EAF" },
  { name: "Action/Primary/Pressed",  cssVar: "--color-action-primary-pressed",  propertyGroup: "action", propertySubgroup: "primary", intentGroup: "brand",    globalAlias: "Brand/90",                hex: "#242383" },
  { name: "Action/Primary/Disabled", cssVar: "--color-action-primary-disabled", propertyGroup: "action", propertySubgroup: "primary", intentGroup: "neutral",  globalAlias: "Brand/50",                hex: "#A3A2EE", notes: "⚠️ Spelled 'Disbabled' in live Figma library" },
  { name: "Action/Primary/Icon",     cssVar: "--color-action-primary-icon",     propertyGroup: "action", propertySubgroup: "primary", intentGroup: "on-solid", globalAlias: "Icon/Inverse → Gray/00",  hex: "#FFFFFF" },

  // ─── Action — Secondary (4) ──────────────────────────────────────────────
  { name: "Action/Secondary/Default", cssVar: "--color-action-secondary-default", propertyGroup: "action", propertySubgroup: "secondary", intentGroup: "neutral", globalAlias: "Surface/Base → Gray/00",   hex: "#FFFFFF" },
  { name: "Action/Secondary/Hover",   cssVar: "--color-action-secondary-hover",   propertyGroup: "action", propertySubgroup: "secondary", intentGroup: "neutral", globalAlias: "Surface/Subtle → Gray/05", hex: "#FAFAFC" },
  { name: "Action/Secondary/Pressed", cssVar: "--color-action-secondary-pressed", propertyGroup: "action", propertySubgroup: "secondary", intentGroup: "neutral", globalAlias: "Surface/Muted → Gray/10",  hex: "#F7F7F9" },
  { name: "Action/Secondary/Text",    cssVar: "--color-action-secondary-text",    propertyGroup: "action", propertySubgroup: "secondary", intentGroup: "neutral", globalAlias: "Gray/50",                  hex: "#B1B1BF" },

  // ─── Action — Danger (4) ─────────────────────────────────────────────────
  { name: "Action/Danger/Default",  cssVar: "--color-action-danger-default",  propertyGroup: "action", propertySubgroup: "danger", intentGroup: "danger",  globalAlias: "Red/70",                    hex: "#B42419" },
  { name: "Action/Danger/Hover",    cssVar: "--color-action-danger-hover",    propertyGroup: "action", propertySubgroup: "danger", intentGroup: "danger",  globalAlias: "Red/80",                    hex: "#901D14" },
  { name: "Action/Danger/Pressed",  cssVar: "--color-action-danger-pressed",  propertyGroup: "action", propertySubgroup: "danger", intentGroup: "danger",  globalAlias: "Red/90",                    hex: "#6C160F" },
  { name: "Action/Danger/Disabled", cssVar: "--color-action-danger-disabled", propertyGroup: "action", propertySubgroup: "danger", intentGroup: "neutral", globalAlias: "Surface/Disabled → Gray/15",hex: "#EFEFF2" },

  // ─── Action — OnAction (2) ───────────────────────────────────────────────
  { name: "Action/OnAction/Default",  cssVar: "--color-action-on-action-default",  propertyGroup: "action", propertySubgroup: "on-action", intentGroup: "on-solid", globalAlias: "Text/OnSolid → Gray/00",    hex: "#FFFFFF" },
  { name: "Action/OnAction/Disabled", cssVar: "--color-action-on-action-disabled", propertyGroup: "action", propertySubgroup: "on-action", intentGroup: "neutral",  globalAlias: "Text/Disabled → Gray/50",   hex: "#B1B1BF" },

  // ─── Status — Neutral (6) ────────────────────────────────────────────────
  { name: "Status/Neutral/Surface",   cssVar: "--color-status-neutral-surface",   propertyGroup: "status", propertySubgroup: "neutral", intentGroup: "neutral",  globalAlias: "Gray/05", hex: "#FAFAFC" },
  { name: "Status/Neutral/Outline",   cssVar: "--color-status-neutral-outline",   propertyGroup: "status", propertySubgroup: "neutral", intentGroup: "neutral",  globalAlias: "Gray/30", hex: "#D0D0D9" },
  { name: "Status/Neutral/Text",      cssVar: "--color-status-neutral-text",      propertyGroup: "status", propertySubgroup: "neutral", intentGroup: "neutral",  globalAlias: "Gray/90", hex: "#3E3E46" },
  { name: "Status/Neutral/Indicator", cssVar: "--color-status-neutral-indicator", propertyGroup: "status", propertySubgroup: "neutral", intentGroup: "neutral",  globalAlias: "Gray/50", hex: "#B1B1BF" },
  { name: "Status/Neutral/Solid",     cssVar: "--color-status-neutral-solid",     propertyGroup: "status", propertySubgroup: "neutral", intentGroup: "neutral",  globalAlias: "Gray/80", hex: "#5B5B64" },
  { name: "Status/Neutral/OnSolid",   cssVar: "--color-status-neutral-on-solid",  propertyGroup: "status", propertySubgroup: "neutral", intentGroup: "on-solid", globalAlias: "Gray/00", hex: "#FFFFFF" },

  // ─── Status — Info (6) ───────────────────────────────────────────────────
  { name: "Status/Info/Surface",   cssVar: "--color-status-info-surface",   propertyGroup: "status", propertySubgroup: "info", intentGroup: "info",     globalAlias: "Blue/20", hex: "#E8EDFB" },
  { name: "Status/Info/Outline",   cssVar: "--color-status-info-outline",   propertyGroup: "status", propertySubgroup: "info", intentGroup: "info",     globalAlias: "Blue/40", hex: "#A5B8EF" },
  { name: "Status/Info/Text",      cssVar: "--color-status-info-text",      propertyGroup: "status", propertySubgroup: "info", intentGroup: "info",     globalAlias: "Blue/80", hex: "#183EAC" },
  { name: "Status/Info/Indicator", cssVar: "--color-status-info-indicator", propertyGroup: "status", propertySubgroup: "info", intentGroup: "info",     globalAlias: "Blue/60", hex: "#4B71DF" },
  { name: "Status/Info/Solid",     cssVar: "--color-status-info-solid",     propertyGroup: "status", propertySubgroup: "info", intentGroup: "info",     globalAlias: "Blue/70", hex: "#1E4DD7" },
  { name: "Status/Info/OnSolid",   cssVar: "--color-status-info-on-solid",  propertyGroup: "status", propertySubgroup: "info", intentGroup: "on-solid", globalAlias: "Gray/00", hex: "#FFFFFF" },

  // ─── Status — Success (6) ────────────────────────────────────────────────
  { name: "Status/Success/Surface",   cssVar: "--color-status-success-surface",   propertyGroup: "status", propertySubgroup: "success", intentGroup: "success",  globalAlias: "Green/20",  hex: "#EAF9F0" },
  { name: "Status/Success/Outline",   cssVar: "--color-status-success-outline",   propertyGroup: "status", propertySubgroup: "success", intentGroup: "success",  globalAlias: "Green/40",  hex: "#ADE7C4" },
  { name: "Status/Success/Text",      cssVar: "--color-status-success-text",      propertyGroup: "status", propertySubgroup: "success", intentGroup: "success",  globalAlias: "Green/100", hex: "#0F3A20" },
  { name: "Status/Success/Indicator", cssVar: "--color-status-success-indicator", propertyGroup: "status", propertySubgroup: "success", intentGroup: "success",  globalAlias: "Green/60",  hex: "#5BCE89" },
  { name: "Status/Success/Solid",     cssVar: "--color-status-success-solid",     propertyGroup: "status", propertySubgroup: "success", intentGroup: "success",  globalAlias: "Green/70",  hex: "#32C26B" },
  { name: "Status/Success/OnSolid",   cssVar: "--color-status-success-on-solid",  propertyGroup: "status", propertySubgroup: "success", intentGroup: "on-solid", globalAlias: "Gray/00",   hex: "#FFFFFF" },

  // ─── Status — Warning (6) ────────────────────────────────────────────────
  { name: "Status/Warning/Surface",   cssVar: "--color-status-warning-surface",   propertyGroup: "status", propertySubgroup: "warning", intentGroup: "warning",  globalAlias: "Yellow/20",  hex: "#FFF9ED" },
  { name: "Status/Warning/Outline",   cssVar: "--color-status-warning-outline",   propertyGroup: "status", propertySubgroup: "warning", intentGroup: "warning",  globalAlias: "Yellow/50",  hex: "#FFDE94" },
  { name: "Status/Warning/Text",      cssVar: "--color-status-warning-text",      propertyGroup: "status", propertySubgroup: "warning", intentGroup: "warning",  globalAlias: "Yellow/100", hex: "#654D17" },
  { name: "Status/Warning/Indicator", cssVar: "--color-status-warning-indicator", propertyGroup: "status", propertySubgroup: "warning", intentGroup: "warning",  globalAlias: "Yellow/60",  hex: "#FFD370" },
  { name: "Status/Warning/Solid",     cssVar: "--color-status-warning-solid",     propertyGroup: "status", propertySubgroup: "warning", intentGroup: "warning",  globalAlias: "Yellow/60",  hex: "#FFD370" },
  { name: "Status/Warning/OnSolid",   cssVar: "--color-status-warning-on-solid",  propertyGroup: "status", propertySubgroup: "warning", intentGroup: "on-solid", globalAlias: "Gray/90",    hex: "#3E3E46" },

  // ─── Status — Error (6) ──────────────────────────────────────────────────
  { name: "Status/Error/Surface",   cssVar: "--color-status-error-surface",   propertyGroup: "status", propertySubgroup: "error", intentGroup: "danger",   globalAlias: "Red/20",               hex: "#F7E2E1" },
  { name: "Status/Error/Outline",   cssVar: "--color-status-error-outline",   propertyGroup: "status", propertySubgroup: "error", intentGroup: "danger",   globalAlias: "Red/40",               hex: "#E3A39E" },
  { name: "Status/Error/Text",      cssVar: "--color-status-error-text",      propertyGroup: "status", propertySubgroup: "error", intentGroup: "danger",   globalAlias: "Text/Danger → Red/70", hex: "#B42419" },
  { name: "Status/Error/Indicator", cssVar: "--color-status-error-indicator", propertyGroup: "status", propertySubgroup: "error", intentGroup: "danger",   globalAlias: "Red/60",               hex: "#C34E45" },
  { name: "Status/Error/Solid",     cssVar: "--color-status-error-solid",     propertyGroup: "status", propertySubgroup: "error", intentGroup: "danger",   globalAlias: "Red/70",               hex: "#B42419" },
  { name: "Status/Error/OnSolid",   cssVar: "--color-status-error-on-solid",  propertyGroup: "status", propertySubgroup: "error", intentGroup: "on-solid", globalAlias: "Gray/00",              hex: "#FFFFFF" },

  // ─── Focus (2) ───────────────────────────────────────────────────────────
  { name: "Focus/Ring",  cssVar: "--color-focus-ring",  propertyGroup: "focus", propertySubgroup: "focus", intentGroup: "focus", globalAlias: "#0066FF", hex: "#0066FF" },
  { name: "Focus/Inner", cssVar: "--color-focus-inner", propertyGroup: "focus", propertySubgroup: "focus", intentGroup: "focus", globalAlias: "Gray/00", hex: "#FFFFFF" },
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
