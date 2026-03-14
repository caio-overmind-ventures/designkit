"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle2, AlertTriangle, XCircle, Calendar, Clock, Globe } from "lucide-react";

const colors = {
  "Brand / Primary": [
    { name: "primary", light: "#292929", dark: "#fafafa" },
    { name: "primary-fg", light: "#ffffff", dark: "#000000" },
  ],
  "Backgrounds": [
    { name: "background", light: "#eeeff2", dark: "#0f0f0f" },
    { name: "card", light: "#ffffff", dark: "#171717" },
    { name: "muted", light: "#f6f7f9", dark: "#171717" },
    { name: "accent", light: "#e5e7eb", dark: "#404040" },
  ],
  "Text": [
    { name: "foreground", light: "#3c3e44", dark: "#d4d4d4" },
    { name: "emphasis", light: "#070a0d", dark: "#fafafa" },
    { name: "subtle", light: "#6b7280", dark: "#a3a3a3" },
    { name: "muted", light: "#9ca3b0", dark: "#a3a3a3" },
  ],
  "Borders": [
    { name: "border", light: "#e5e7eb", dark: "#262626" },
    { name: "input", light: "#d1d5db", dark: "#4d4d4d" },
    { name: "emphasis", light: "#9ca3b0", dark: "#737373" },
  ],
  "Semantic": [
    { name: "success", light: "#e4fbed", dark: "#285231" },
    { name: "error", light: "#f9e3e1", dark: "#772522" },
    { name: "warning", light: "#ffedd6", dark: "#74331b" },
    { name: "info", light: "#dde7fd", dark: "#253883" },
  ],
};

const typographyScale = [
  { name: "Display", size: "36px", weight: 700, tracking: "-0.02em", sample: "Cal.com" },
  { name: "H1", size: "24px", weight: 700, tracking: "-0.01em", sample: "Event Types" },
  { name: "H2", size: "20px", weight: 600, tracking: "normal", sample: "Reunião de 30 min" },
  { name: "H3 / Title", size: "16px", weight: 600, tracking: "normal", sample: "Add a new event type" },
  { name: "Body", size: "14px", weight: 400, tracking: "normal", sample: "Configure different events for people to book on your calendar." },
  { name: "Small", size: "12px", weight: 400, tracking: "normal", sample: "/seven-overmind/30min" },
  { name: "Label", size: "14px", weight: 500, tracking: "normal", sample: "Duration" },
];

const radiusValues = [
  { name: "sm", value: "6px", desc: "Badges" },
  { name: "md", value: "8px", desc: "Sidebar items, calendar days" },
  { name: "lg", value: "10px", desc: "Buttons, inputs, time slots" },
  { name: "xl", value: "12px", desc: "Cards" },
  { name: "2xl", value: "16px", desc: "Dialogs" },
  { name: "full", value: "9999px", desc: "Switch, pills" },
];

function ColorSwatch({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-lg border border-border shrink-0"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{color}</p>
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cal.com Design System</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Extracted from app.cal.com — Inter font, compact density, 10px radius, monochromatic palette
        </p>
      </div>

      {/* Design Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Design Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><span className="text-muted-foreground">Font:</span> <span className="font-medium">Inter</span></div>
            <div><span className="text-muted-foreground">Base size:</span> <span className="font-medium">14px / 20px</span></div>
            <div><span className="text-muted-foreground">Radius:</span> <span className="font-medium">10px (buttons/inputs)</span></div>
            <div><span className="text-muted-foreground">Density:</span> <span className="font-medium">Compact (32px inputs)</span></div>
            <div><span className="text-muted-foreground">Elevation:</span> <span className="font-medium">Subtle (inset+outset on CTA)</span></div>
            <div><span className="text-muted-foreground">Borders:</span> <span className="font-medium">Thin (1px)</span></div>
            <div><span className="text-muted-foreground">Icons:</span> <span className="font-medium">Lucide, 1.5px, 16px</span></div>
            <div><span className="text-muted-foreground">Palette:</span> <span className="font-medium">Monochromatic</span></div>
            <div><span className="text-muted-foreground">Feel:</span> <span className="font-medium">Professional scheduling</span></div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Color Palette */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(colors).map(([group, swatches]) => (
            <Card key={group}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{group}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {swatches.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-8 h-8 rounded-md border border-border" style={{ backgroundColor: s.light }} title="Light" />
                      <div className="w-8 h-8 rounded-md border border-border" style={{ backgroundColor: s.dark }} title="Dark" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{s.light} / {s.dark}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Typography Scale */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Typography Scale</h2>
        <Card>
          <CardContent className="divide-y divide-border">
            {typographyScale.map((t) => (
              <div key={t.name} className="flex items-baseline gap-6 py-4 first:pt-6">
                <div className="w-24 shrink-0">
                  <p className="text-xs text-muted-foreground">{t.name}</p>
                  <p className="text-xs font-mono text-muted-foreground">{t.size}/{t.weight}</p>
                </div>
                <p style={{ fontSize: t.size, fontWeight: t.weight, letterSpacing: t.tracking }}>
                  {t.sample}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Border Radius */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Border Radius</h2>
        <div className="flex flex-wrap gap-4">
          {radiusValues.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 bg-accent border border-border"
                style={{ borderRadius: r.value }}
              />
              <div className="text-center">
                <p className="text-xs font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.value}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Button Variants */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Buttons</h2>
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="flex flex-wrap gap-3 items-center">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Calendar className="w-4 h-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button><Calendar className="w-4 h-4" /> New Event</Button>
              <Button variant="outline"><Clock className="w-4 h-4" /> Schedule</Button>
              <Button variant="secondary"><Globe className="w-4 h-4" /> Timezone</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Badge Variants */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Badges</h2>
        <Card>
          <CardContent className="pt-6 flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-success text-success-foreground">Success</Badge>
            <Badge className="bg-warning text-warning-foreground">Warning</Badge>
            <Badge className="bg-info text-info-foreground">Info</Badge>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Alert Variants */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Alerts</h2>
        <div className="space-y-3">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Your timezone has been updated to America/Sao_Paulo.</AlertDescription>
          </Alert>
          <Alert className="border-green-500/30 bg-success text-success-foreground">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Event type has been created successfully.</AlertDescription>
          </Alert>
          <Alert className="border-yellow-500/30 bg-warning text-warning-foreground">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This event type has no available slots this week.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to save event type. Please try again.</AlertDescription>
          </Alert>
        </div>
      </section>

      <Separator />

      {/* Sample Cards */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Reunião de 30 min</CardTitle>
              <CardDescription>/seven-overmind/30min</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                30m
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Reunião de 15 min</CardTitle>
              <CardDescription>/seven-overmind/15min</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                15m
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Reunião secreta</CardTitle>
                <Badge variant="secondary">Hidden</Badge>
              </div>
              <CardDescription>/seven-overmind/secret</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                15m
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
