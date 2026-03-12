/**
 * Reads the extraction JSON for a domain and returns its primary color + font.
 * This gives each row in the hub a visual identity preview.
 */
import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const EXTRACTIONS_DIR = join(process.cwd(), "extractions");

export interface DesignMeta {
  primaryColor: string;
  accentColor: string | null;
  font: string;
  style: string;
}

export async function getDesignMeta(domain: string): Promise<DesignMeta | null> {
  const dir = join(EXTRACTIONS_DIR, domain);
  if (!existsSync(dir)) return null;

  try {
    const files = await readdir(dir);
    const json = files.filter((f) => f.endsWith(".json")).sort().reverse()[0];
    if (!json) return null;

    const raw = JSON.parse(await readFile(join(dir, json), "utf-8"));

    // Primary color from buttons or most-used dark color
    const buttons = raw.components?.buttons || [];
    const primaryBtn = buttons.find(
      (b: any) => b.states?.default?.backgroundColor && 
        !b.states.default.backgroundColor.includes("rgba(0, 0, 0, 0)") &&
        !b.states.default.backgroundColor.includes("rgba(255")
    );
    const palette = raw.colors?.palette || [];
    const darkColor = palette.find((c: any) => {
      const hex = (c.normalized || "").toLowerCase();
      return c.confidence === "high" && /^#[0-5]/.test(hex);
    });

    const primaryColor = primaryBtn?.states?.default?.backgroundColor || darkColor?.normalized || "#000000";

    // Accent from CSS variables
    const cssVars = raw.colors?.cssVariables || {};
    const accentVar = Object.entries(cssVars).find(
      ([k, v]: [string, any]) => k.includes("accent") || k.includes("theme") || k.includes("brand")
    );
    const accentColor = accentVar ? (accentVar[1] as any).value : null;

    // Primary font
    const styles = raw.typography?.styles || [];
    const bodyFont = styles.find((s: any) => /body|link|paragraph/i.test(s.context))?.family;
    const headingFont = styles.find((s: any) => /heading/i.test(s.context))?.family;
    const font = bodyFont || headingFont || styles[0]?.family || "system-ui";

    // Style description
    const radius = raw.borderRadius?.values?.[0]?.numericValue || 0;
    const hasShadows = (raw.shadows || []).some((s: any) => !s.shadow?.includes("0px 0px 0px"));
    const style = [
      radius > 100 ? "pill" : radius > 4 ? "rounded" : "sharp",
      hasShadows ? "shadows" : "flat",
    ].join(" · ");

    return { primaryColor, accentColor, font, style };
  } catch {
    return null;
  }
}
