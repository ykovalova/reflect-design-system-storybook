#!/usr/bin/env node
/**
 * Generates the semantic colour layer from the Figma variable export.
 *
 *   input   src/tokens/figma-export/Color.tokens.json   (Figma → Variables → Export, "Semantic" collection)
 *   output  src/styles/semantic-colors.generated.css     (CSS custom properties, imported by base.css)
 *           src/tokens/semantic-colors.generated.ts      (typed catalog for Storybook)
 *
 * CSS names are read from each variable's WEB code syntax — never derived from the Figma name
 * (`Background/` emits `bg`, so the two deliberately differ).
 * Aliases to a primitive emit `var(--color-<family>-<step>)`; tokens with no primitive
 * alias (the Overlay alpha family) emit their literal rgba value.
 *
 * Usage: npm run tokens:generate      (add --check to fail if outputs are stale)
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(root, "src/tokens/figma-export/Color.tokens.json");
const OUT_CSS = resolve(root, "src/styles/semantic-colors.generated.css");
const OUT_TS = resolve(root, "src/tokens/semantic-colors.generated.ts");
const check = process.argv.includes("--check");

const json = JSON.parse(readFileSync(SRC, "utf8"));

function* walk(node, path = []) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (value && typeof value === "object" && "$value" in value) yield [[...path, key].join("/"), value];
    else if (value && typeof value === "object") yield* walk(value, [...path, key]);
  }
}

const cssNameFromSyntax = (syntax, name) => {
  const m = /^var\((--[a-z0-9-]+)\)$/.exec(syntax ?? "");
  if (!m) throw new Error(`"${name}" has no valid WEB code syntax (got ${JSON.stringify(syntax)})`);
  return m[1];
};

// "Color/Brand/brand-75" → "--color-brand-75"; "Color/Red/red-2,5" → "--color-red-2-5"
const primitiveVar = (targetName) => {
  const m = /^Color\/[^/]+\/([a-z]+)-([0-9,]+)$/.exec(targetName ?? "");
  return m ? `--color-${m[1]}-${m[2].replace(",", "-")}` : null;
};

const rgba = ({ components: [r, g, b], alpha }) =>
  `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${+alpha.toFixed(3)})`;

const raw = [...walk(json)];
const byName = new Map(raw.map(([name, t]) => [name, t]));
const cssVarOf = (name) => cssNameFromSyntax(byName.get(name)?.$extensions?.["com.figma.codeSyntax"]?.WEB, name);

// A token's $value is either a colour object or a "{Group.Path}" reference to another semantic token.
const resolveToken = (name, seen = new Set()) => {
  if (seen.has(name)) throw new Error(`Alias cycle at "${name}"`);
  const t = byName.get(name);
  if (!t) throw new Error(`Unknown token reference "${name}"`);
  if (typeof t.$value !== "string") return t;
  return resolveToken(t.$value.slice(1, -1).replaceAll(".", "/"), new Set(seen).add(name));
};

const tokens = [];
for (const [name, t] of raw) {
  const ext = t.$extensions ?? {};
  const cssVar = cssVarOf(name);
  const ref = typeof t.$value === "string" ? t.$value.slice(1, -1).replaceAll(".", "/") : null;
  const color = resolveToken(name).$value;
  const alias = ref ?? ext["com.figma.aliasData"]?.targetVariableName ?? null;
  const prim = ref ? null : primitiveVar(alias);
  tokens.push({
    name,
    group: name.split("/")[0],
    cssVar,
    value: ref ? `var(${cssVarOf(ref)})` : prim ? `var(${prim})` : color.alpha < 1 ? rgba(color) : color.hex.toLowerCase(),
    alias,
    hex: color.hex,
    alpha: +color.alpha.toFixed(3),
    description: t.$description ?? ""
  });
}

const dupes = tokens.map((t) => t.cssVar).filter((v, i, a) => a.indexOf(v) !== i);
if (dupes.length) throw new Error(`Duplicate CSS names: ${[...new Set(dupes)].join(", ")}`);

const note = [
  "GENERATED — do not edit. Source: src/tokens/figma-export/Color.tokens.json",
  "Regenerate with: npm run tokens:generate"
];

let css = `/* ${note.join("\n   ")} */\n:root {\n`;
let group = "";
for (const t of tokens) {
  if (t.group !== group) {
    group = t.group;
    css += `\n  /* ${group} */\n`;
  }
  css += `  ${t.cssVar}: ${t.value};\n`;
}
css += "}\n";

const ts =
  `${note.map((l) => `// ${l}`).join("\n")}\n\n` +
  `export type SemanticColorGroup = ${[...new Set(tokens.map((t) => t.group))].map((g) => JSON.stringify(g)).join(" | ")};\n\n` +
  `export type SemanticColor = {\n  name: string;\n  group: SemanticColorGroup;\n  cssVar: string;\n  value: string;\n  alias: string | null;\n  hex: string;\n  alpha: number;\n  description: string;\n};\n\n` +
  `export const semanticColors: SemanticColor[] = ${JSON.stringify(tokens, null, 2)};\n`;

const outputs = [[OUT_CSS, css], [OUT_TS, ts]];
if (check) {
  const stale = outputs.filter(([f, c]) => !existsSync(f) || readFileSync(f, "utf8") !== c);
  if (stale.length) {
    console.error(`Stale generated files — run \`npm run tokens:generate\`:\n${stale.map(([f]) => `  ${f}`).join("\n")}`);
    process.exit(1);
  }
  console.log(`Semantic tokens up to date (${tokens.length}).`);
} else {
  for (const [f, c] of outputs) writeFileSync(f, c);
  console.log(`Generated ${tokens.length} semantic colour tokens.`);
}
