"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Timer, ArrowUpDown, Landmark, TrendingUp, MessageSquare, BookOpen, CreditCard, Bot } from "lucide-react";

export default function CardsPage() {
  return (
    <div className="space-y-10">
      <div><h1 className="text-xl font-medium">Cards</h1><p className="text-sm text-muted-foreground mt-1">Stat, app, invoice, pricing — 0px radius, thin border, no shadow</p></div>

      <section>
        <h2 className="text-lg font-medium mb-4">Dashboard Stats</h2>
        <div className="grid grid-cols-4 border border-border">
          {[
            { Icon: Timer, title: "Cash Runway", sub: "Based on last 6 months", val: "12 months", link: "View runway" },
            { Icon: ArrowUpDown, title: "Cash Flow", sub: "Net cash position · 1 year", val: "+R$42,500", link: "View cash flow analysis" },
            { Icon: Landmark, title: "Account Balances", sub: "All connected", val: "R$187,320", link: "View account balances" },
            { Icon: TrendingUp, title: "Growth Rate", sub: "Net revenue growth · 1 year", val: "+18.5%", link: "View growth analysis" },
          ].map((c, i) => (
            <div key={i} className="border-r border-border last:border-r-0 p-4">
              <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5"><c.Icon className="h-3.5 w-3.5" strokeWidth={1.5} /> {c.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
              <p className="text-2xl font-normal mt-3">{c.val}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.link}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">Invoice Status</h2>
        <div className="grid grid-cols-3 border border-border">
          {[
            { val: "R$12,400", label: "Open", count: "3 invoices", cls: "" },
            { val: "R$5,200", label: "Overdue", count: "1 invoice", cls: "text-destructive" },
            { val: "R$89,000", label: "Paid", count: "24 invoices", cls: "text-success" },
          ].map((c, i) => (
            <div key={i} className="border-r border-border last:border-r-0 p-6">
              <p className={`text-3xl font-normal ${c.cls}`}>{c.val}</p>
              <p className="text-sm text-muted-foreground mt-1">{c.label}</p>
              <p className="text-xs text-muted-foreground">{c.count}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">App Cards</h2>
        <div className="grid grid-cols-4 border border-border">
          {[
            { Icon: MessageSquare, name: "Slack", desc: "Get transaction notifications from Slack.", badge: null },
            { Icon: BookOpen, name: "QuickBooks", desc: "Export transactions to QuickBooks Online.", badge: "Beta" },
            { Icon: CreditCard, name: "Stripe", desc: "Accept credit card payments on invoices.", badge: "Coming soon" },
            { Icon: Bot, name: "Claude", desc: "Connect Claude to Midday data via MCP.", badge: null },
          ].map((app, i) => (
            <div key={i} className="border-r border-b border-border last:border-r-0 p-4 flex flex-col">
              <app.Icon className="h-8 w-8 mb-3 text-foreground" strokeWidth={1.5} />
              <p className="text-sm font-medium flex items-center gap-2">{app.name}
                {app.badge && <Badge variant="outline" className="text-[10px]">{app.badge}</Badge>}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex-1">{app.desc}</p>
              <div className="flex gap-0 mt-3 border-t border-border -mx-4 -mb-4">
                <button className="flex-1 py-2 text-sm text-center border-r border-border hover:bg-accent transition-colors">Details</button>
                <button className="flex-1 py-2 text-sm text-center hover:bg-accent transition-colors">Install</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">Pricing Card</h2>
        <div className="max-w-md border border-border p-6">
          <div className="flex border border-border overflow-hidden mb-6">
            <button className="flex-1 py-1.5 text-sm bg-primary text-primary-foreground font-medium">Monthly</button>
            <button className="flex-1 py-1.5 text-sm text-muted-foreground">Yearly (Save 20%)</button>
          </div>
          <p className="text-5xl font-normal text-center">$15</p>
          <p className="text-muted-foreground text-center mt-1">/month</p>
          <p className="text-xs text-muted-foreground text-center mt-2">$180/year · billed annually</p>
          <Button className="w-full mt-6">Upgrade</Button>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-6">
            {["Invoicing and payments","Transactions and bank sync","Inbox and receipt matching","Accounting exports","Time tracking","AI assistant","Financial overview","Vault","Apps and integrations","Multi-currency","Customer management","API and MCP"].map((f) => (
              <p key={f} className="text-xs text-muted-foreground">• {f}</p>
            ))}
          </div>
          <Separator className="my-4" />
          <p className="text-xs text-muted-foreground text-center">30-day money-back guarantee · USD / EUR · Excl. tax</p>
        </div>
      </section>
    </div>
  );
}
