"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";

const semanticColors = [
  { name: "Background", var: "bg-background", text: "text-foreground" },
  { name: "Foreground", var: "bg-foreground", text: "text-background" },
  { name: "Card", var: "bg-card", text: "text-card-foreground" },
  { name: "Primary", var: "bg-primary", text: "text-primary-foreground" },
  { name: "Secondary", var: "bg-secondary", text: "text-secondary-foreground" },
  { name: "Muted", var: "bg-muted", text: "text-muted-foreground" },
  { name: "Accent", var: "bg-accent", text: "text-accent-foreground" },
  { name: "Destructive", var: "bg-destructive", text: "text-white" },
];

const chartColors = [
  { name: "Chart 1", var: "bg-chart-1" },
  { name: "Chart 2", var: "bg-chart-2" },
  { name: "Chart 3", var: "bg-chart-3" },
  { name: "Chart 4", var: "bg-chart-4" },
  { name: "Chart 5", var: "bg-chart-5" },
];

const statusColors = [
  { name: "Success", var: "bg-success" },
  { name: "Warning", var: "bg-warning" },
  { name: "Destructive", var: "bg-destructive" },
  { name: "Link", var: "bg-link" },
];

export default function StyleguidePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">▲ Vercel Design System</h1>
        <p className="text-muted-foreground mt-1">Extracted from app.vercel.com — 2026-03-14</p>
      </div>

      {/* Design Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Design Summary</CardTitle>
          <CardDescription>Key characteristics of the Vercel design system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><span className="text-muted-foreground">Font:</span> <span className="font-medium">Geist</span></div>
            <div><span className="text-muted-foreground">Mono:</span> <span className="font-medium font-mono">Geist Mono</span></div>
            <div><span className="text-muted-foreground">Base size:</span> <span className="font-medium">14px / 20px</span></div>
            <div><span className="text-muted-foreground">Radius:</span> <span className="font-medium">6px</span></div>
            <div><span className="text-muted-foreground">Density:</span> <span className="font-medium">Compact</span></div>
            <div><span className="text-muted-foreground">Elevation:</span> <span className="font-medium">Flat</span></div>
            <div><span className="text-muted-foreground">Corners:</span> <span className="font-medium">Slightly rounded</span></div>
            <div><span className="text-muted-foreground">Borders:</span> <span className="font-medium">Shadow-ring (not CSS border)</span></div>
            <div><span className="text-muted-foreground">Palette:</span> <span className="font-medium">Monochromatic (B&W)</span></div>
          </div>
          <Separator className="my-4" />
          <p className="text-sm text-muted-foreground italic">
            Brutally minimal black-and-white interface with extreme information density, where color is reserved exclusively for status and interactive states.
          </p>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Color Palette</h2>
        
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Semantic Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {semanticColors.map((c) => (
            <div key={c.name} className={`${c.var} ${c.text} rounded-lg p-4 text-sm font-medium border border-border`}>
              {c.name}
            </div>
          ))}
        </div>

        <h3 className="text-sm font-medium text-muted-foreground mb-2">Status Colors</h3>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {statusColors.map((c) => (
            <div key={c.name} className={`${c.var} text-white rounded-lg p-4 text-sm font-medium`}>
              {c.name}
            </div>
          ))}
        </div>

        <h3 className="text-sm font-medium text-muted-foreground mb-2">Chart Colors</h3>
        <div className="flex gap-2">
          {chartColors.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-1">
              <div className={`${c.var} w-10 h-10 rounded-md`} />
              <span className="text-xs text-muted-foreground">{c.name.split(" ")[1]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Gray Scale */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Gray Scale</h2>
        <div className="flex gap-0 rounded-lg overflow-hidden border border-border">
          {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((n) => (
            <div key={n} className="flex-1 h-16 flex items-end justify-center pb-1"
              style={{ backgroundColor: `var(--ds-gray-${n}, hsl(0 0% ${100 - n / 11}%))` }}>
              <span className={`text-[10px] ${n > 500 ? "text-white" : "text-black"}`}>{n}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Typography</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16 shrink-0">Display</span>
              <span className="text-4xl font-bold tracking-tight">Deploy to the cloud</span>
            </div>
            <Separator />
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16 shrink-0">H1</span>
              <span className="text-2xl font-semibold tracking-tight">Team Settings</span>
            </div>
            <Separator />
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16 shrink-0">H2</span>
              <span className="text-xl font-semibold">Members</span>
            </div>
            <Separator />
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16 shrink-0">H3</span>
              <span className="text-base font-semibold">Team Name</span>
            </div>
            <Separator />
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16 shrink-0">Body</span>
              <span className="text-sm">This is your team&apos;s visible name within Vercel.</span>
            </div>
            <Separator />
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16 shrink-0">Small</span>
              <span className="text-[13px] text-muted-foreground">Please use 32 characters at maximum.</span>
            </div>
            <Separator />
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16 shrink-0">Mono</span>
              <span className="text-sm font-mono">team_BtjBhg8bJsUE1jnZ5W871</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Border Radius</h2>
        <div className="flex gap-4 items-end">
          {[
            { name: "None", radius: "0px" },
            { name: "SM (3.6px)", radius: "var(--radius-sm)" },
            { name: "MD (4.8px)", radius: "var(--radius-md)" },
            { name: "LG (6px)", radius: "var(--radius-lg)" },
            { name: "XL (8.4px)", radius: "var(--radius-xl)" },
            { name: "Full", radius: "9999px" },
          ].map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-foreground" style={{ borderRadius: r.radius }} />
              <span className="text-xs text-muted-foreground">{r.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Button>Deploy</Button>
          <Button variant="secondary">Add Existing Domain</Button>
          <Button variant="outline">Transfer In Domain</Button>
          <Button variant="ghost">Feedback</Button>
          <Button variant="destructive">Delete Team</Button>
          <Button size="sm">Save</Button>
          <Button size="lg">Buy Domain</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge>Owner</Badge>
          <Badge variant="secondary">Hobby</Badge>
          <Badge variant="outline">2FA</Badge>
          <Badge variant="destructive">Error</Badge>
        </div>
      </section>

      {/* Alerts */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Alerts</h2>
        <div className="space-y-3">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>This feature is available on the Pro plan.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <CircleAlert className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>You cannot delete your last Hobby team.</AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  );
}
