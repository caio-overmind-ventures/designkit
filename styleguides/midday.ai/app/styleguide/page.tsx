"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Timer, ArrowUpDown, Landmark, TrendingUp } from "lucide-react";

const colorTokens = [
  { name: "Background", var: "background", fg: "foreground" },
  { name: "Foreground", var: "foreground", fg: "background" },
  { name: "Card", var: "card", fg: "card-foreground" },
  { name: "Primary", var: "primary", fg: "primary-foreground" },
  { name: "Secondary", var: "secondary", fg: "secondary-foreground" },
  { name: "Muted", var: "muted", fg: "muted-foreground" },
  { name: "Accent", var: "accent", fg: "accent-foreground" },
  { name: "Destructive", var: "destructive", fg: "destructive-foreground" },
  { name: "Border", var: "border", fg: "foreground" },
];

export default function TokenShowcase() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-[family-name:var(--font-hedvig-serif)] text-[30px] leading-[45px] font-normal tracking-normal">midday.ai</h1>
        <p className="text-sm text-muted-foreground mt-1">Design system extracted from the Midday financial platform</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Design Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div><p className="text-xs text-muted-foreground">Body Font</p><p className="text-sm mt-0.5">Hedvig Letters Sans</p></div>
            <div><p className="text-xs text-muted-foreground">Display Font</p><p className="text-sm mt-0.5 font-[family-name:var(--font-hedvig-serif)]">Hedvig Letters Serif</p></div>
            <div><p className="text-xs text-muted-foreground">Base Size</p><p className="text-sm mt-0.5">14px / 20px</p></div>
            <div><p className="text-xs text-muted-foreground">Corners</p><p className="text-sm mt-0.5">Sharp (0px radius)</p></div>
            <div><p className="text-xs text-muted-foreground">Elevation</p><p className="text-sm mt-0.5">Flat (no shadows)</p></div>
            <div><p className="text-xs text-muted-foreground">Density</p><p className="text-sm mt-0.5">Compact (36px inputs)</p></div>
            <div><p className="text-xs text-muted-foreground">Light Palette</p><p className="text-sm mt-0.5">Warm cream/beige</p></div>
            <div><p className="text-xs text-muted-foreground">Dark Palette</p><p className="text-sm mt-0.5">Pure neutral black</p></div>
            <div><p className="text-xs text-muted-foreground">Icons</p><p className="text-sm mt-0.5">Lucide, stroke-only, mono</p></div>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-medium mb-4">Color Palette</h2>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {colorTokens.map((t) => (
            <div key={t.var} className="space-y-1">
              <div className="h-16 border border-border" style={{ backgroundColor: `hsl(var(--${t.var}))` }} />
              <p className="text-xs font-medium">{t.name}</p>
              <p className="text-[10px] text-muted-foreground font-mono">--{t.var}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Semantic Colors</h2>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: "Success", var: "success", fg: "success-foreground" },
            { name: "Warning", var: "warning", fg: "warning-foreground" },
            { name: "Info", var: "info", fg: "info-foreground" },
            { name: "Destructive", var: "destructive", fg: "destructive-foreground" },
          ].map((t) => (
            <div key={t.var} className="h-12 flex items-center justify-center text-xs font-medium" style={{ backgroundColor: `hsl(var(--${t.var}))`, color: `hsl(var(--${t.fg}))` }}>
              {t.name}
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Typography</h2>
        <div className="space-y-3">
          <div><p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Display (Serif)</p>
            <p className="font-[family-name:var(--font-hedvig-serif)] text-[30px] leading-[45px]">Evening Seven,</p></div>
          <div><p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">H1</p>
            <p className="text-2xl">Financial overview and reports</p></div>
          <div><p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">H2</p>
            <p className="text-xl font-medium">Create Transaction</p></div>
          <div><p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">H3</p>
            <p className="text-base font-medium">Company name</p></div>
          <div><p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Body</p>
            <p className="text-sm">Connect your bank account to automatically import transactions.</p></div>
          <div><p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Small/Label</p>
            <p className="text-xs font-medium text-muted-foreground">Based on last 6 months · Net cash position</p></div>
          <div><p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Stat Number</p>
            <p className="text-2xl font-normal">R$42,500</p></div>
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Create</Button>
          <Button variant="secondary">Details</Button>
          <Button variant="outline">Install</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="link">View details</Button>
          <Button disabled>Disabled</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">All buttons: 0px radius, 36px height, weight 500</p>
      </section>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">System</Badge>
          <Badge variant="outline">Beta</Badge>
          <Badge variant="outline" className="text-muted-foreground">Coming soon</Badge>
          <Badge variant="destructive">Overdue</Badge>
          <Badge className="bg-success text-success-foreground border-0">Paid</Badge>
          <Badge className="bg-warning text-warning-foreground border-0">Pending</Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Badges are the ONLY pill-shaped (9999px) element</p>
      </section>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Alerts</h2>
        <div className="space-y-3">
          <Alert><AlertTitle>Default</AlertTitle><AlertDescription>Connect your bank account to start importing transactions.</AlertDescription></Alert>
          <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Failed to sync transactions. Please try again.</AlertDescription></Alert>
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-xl font-medium mb-4">Dashboard Cards</h2>
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-4 border border-border">
          {[
            { Icon: Timer, title: "Cash Runway", sub: "Based on last 6 months", value: "12 months", link: "View runway" },
            { Icon: ArrowUpDown, title: "Cash Flow", sub: "Net cash position · 1 year", value: "+R$42,500", link: "View cash flow analysis" },
            { Icon: Landmark, title: "Account Balances", sub: "All connected", value: "R$187,320", link: "View account balances" },
            { Icon: TrendingUp, title: "Growth Rate", sub: "Net revenue growth · 1 year", value: "+18.5%", link: "View growth analysis" },
          ].map((c, i) => (
            <div key={i} className="border-r border-b border-border p-4 last:border-r-0">
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5"><c.Icon className="h-4 w-4" /> {c.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
              <p className="text-2xl font-normal mt-3">{c.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.link}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
