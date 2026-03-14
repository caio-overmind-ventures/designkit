"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const colors = [
  { name: "Background", var: "bg-background", border: true },
  { name: "Card", var: "bg-card", border: true },
  { name: "Primary", var: "bg-primary" },
  { name: "Secondary", var: "bg-secondary", border: true },
  { name: "Muted", var: "bg-muted", border: true },
  { name: "Accent", var: "bg-accent" },
  { name: "Destructive", var: "bg-destructive" },
  { name: "Border", var: "bg-border" },
];

const chartColors = [
  { name: "Chart 1", var: "bg-chart-1" },
  { name: "Chart 2", var: "bg-chart-2" },
  { name: "Chart 3", var: "bg-chart-3" },
  { name: "Chart 4", var: "bg-chart-4" },
  { name: "Chart 5", var: "bg-chart-5" },
];

const typographyScale = [
  { name: "Title 1", size: "text-4xl", weight: "font-light", tracking: "tracking-tight", sample: "Display heading" },
  { name: "Title 2", size: "text-2xl", weight: "font-medium", sample: "Page title" },
  { name: "Title 3", size: "text-xl", weight: "font-medium", sample: "Section heading" },
  { name: "Large", size: "text-lg", weight: "font-normal", sample: "Large body text" },
  { name: "Regular", size: "text-[15px]", weight: "font-normal", sample: "Regular body text — the default for content areas" },
  { name: "Small", size: "text-[13px]", weight: "font-normal", sample: "Small text — the primary UI text size in Linear" },
  { name: "Mini", size: "text-xs", weight: "font-normal", sample: "Mini text for labels and metadata" },
  { name: "Micro", size: "text-[11px]", weight: "font-normal", sample: "Micro text for timestamps" },
];

export default function StyleguideOverview() {
  return (
    <div className="max-w-4xl space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium">Linear Design System</h1>
        <p className="text-muted-foreground mt-1">
          Extracted from the authenticated Linear app. Dark-first, compact, professional.
        </p>
      </div>

      {/* Design Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Design Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-[13px]">
          <div><span className="text-muted-foreground">Font:</span> Inter Variable</div>
          <div><span className="text-muted-foreground">Base size:</span> 13px</div>
          <div><span className="text-muted-foreground">Control height:</span> 32px</div>
          <div><span className="text-muted-foreground">Button radius:</span> pill (9999px)</div>
          <div><span className="text-muted-foreground">Input radius:</span> 8px</div>
          <div><span className="text-muted-foreground">Density:</span> Compact</div>
          <div><span className="text-muted-foreground">Elevation:</span> Flat (no shadows)</div>
          <div><span className="text-muted-foreground">Accent:</span> #5e6ad2 (purple)</div>
          <div className="col-span-2"><span className="text-muted-foreground">Feel:</span> Dense, professional PM tool. Monochromatic palette with single purple accent.</div>
        </CardContent>
      </Card>

      <Separator />

      {/* Color Palette */}
      <section>
        <h2 className="text-xl font-medium mb-4">Color Palette</h2>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((c) => (
            <div key={c.name} className="space-y-1.5">
              <div className={`h-16 rounded-lg ${c.var} ${c.border ? "border border-border" : ""}`} />
              <p className="text-[13px] font-medium">{c.name}</p>
            </div>
          ))}
        </div>

        <h3 className="text-base font-medium mt-6 mb-3">Chart Colors</h3>
        <div className="flex gap-2">
          {chartColors.map((c) => (
            <div key={c.name} className="space-y-1.5 flex-1">
              <div className={`h-10 rounded-lg ${c.var}`} />
              <p className="text-[11px] text-muted-foreground">{c.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Typography */}
      <section>
        <h2 className="text-xl font-medium mb-4">Typography</h2>
        <div className="space-y-4">
          {typographyScale.map((t) => (
            <div key={t.name} className="flex items-baseline gap-4">
              <span className="text-[11px] text-muted-foreground w-16 shrink-0">{t.name}</span>
              <span className={`${t.size} ${t.weight} ${t.tracking || ""}`}>{t.sample}</span>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Buttons */}
      <section>
        <h2 className="text-xl font-medium mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <Separator />

      {/* Badges */}
      <section>
        <h2 className="text-xl font-medium mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      <Separator />

      {/* Form Controls */}
      <section>
        <h2 className="text-xl font-medium mb-4">Form Controls</h2>
        <div className="grid grid-cols-2 gap-6 max-w-xl">
          <div className="space-y-2">
            <Label>Issue title</Label>
            <Input placeholder="Enter issue title..." />
          </div>
          <div className="space-y-2">
            <Label>Search</Label>
            <Input placeholder="Filter by name..." />
          </div>
          <div className="flex items-center gap-3">
            <Switch id="toggle" />
            <Label htmlFor="toggle">Show updates in sidebar</Label>
          </div>
        </div>
      </section>

      <Separator />

      {/* Cards */}
      <section>
        <h2 className="text-xl font-medium mb-4">Cards</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-[13px]">Total Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">2,350</div>
              <p className="text-[11px] text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-[13px]">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">187</div>
              <p className="text-[11px] text-muted-foreground mt-1">Across 4 teams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-[13px]">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-medium">1,420</div>
              <p className="text-[11px] text-muted-foreground mt-1">This cycle</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Border Radius */}
      <section>
        <h2 className="text-xl font-medium mb-4">Border Radius</h2>
        <div className="flex gap-4 items-end">
          {[
            { label: "Pill (btn)", radius: "rounded-full", size: "h-8 w-24" },
            { label: "12px (modal)", radius: "rounded-xl", size: "h-16 w-24" },
            { label: "8px (input)", radius: "rounded-lg", size: "h-8 w-24" },
            { label: "6px (tab)", radius: "rounded-md", size: "h-8 w-20" },
            { label: "4px (badge)", radius: "rounded", size: "h-6 w-16" },
          ].map((r) => (
            <div key={r.label} className="space-y-1.5 text-center">
              <div className={`${r.size} ${r.radius} bg-primary/20 border border-primary/40`} />
              <p className="text-[11px] text-muted-foreground">{r.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
