"use client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, Receipt, Inbox, FileText, Timer, Users, FolderOpen, Grid3X3, Settings, Bell, Asterisk } from "lucide-react";

const sidebarItems = [
  { Icon: LayoutDashboard, label: "Overview", active: true },
  { Icon: Receipt, label: "Transactions" },
  { Icon: Inbox, label: "Inbox" },
  { Icon: FileText, label: "Invoices" },
  { Icon: Timer, label: "Tracker" },
  { Icon: Users, label: "Customers" },
  { Icon: FolderOpen, label: "Vault" },
  { Icon: Grid3X3, label: "Apps" },
  { Icon: Settings, label: "Settings" },
];

const settingsTabs = ["General", "Billing", "Bank Connections", "Members", "Notifications", "Developer"];

export default function NavigationMenuPage() {
  return (
    <div className="space-y-10">
      <div><h1 className="text-xl font-medium">Navigation Menu</h1><p className="text-sm text-muted-foreground mt-1">Sidebar (icon-only), horizontal tabs, top bar — Lucide icons, monochromatic</p></div>

      <section>
        <h2 className="text-lg font-medium mb-4">Sidebar (Icon-Only)</h2>
        <div className="w-12 border border-border bg-background py-3 flex flex-col items-center gap-1">
          <Asterisk className="h-5 w-5 mb-3" />
          {sidebarItems.map((item) => (
            <button key={item.label} title={item.label}
              className={`w-8 h-7 flex items-center justify-center transition-colors ${item.active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <item.Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          ))}
          <div className="mt-auto pt-4">
            <div className="w-6 h-6 bg-muted text-[9px] font-medium flex items-center justify-center">OV</div>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">Settings Tab Bar</h2>
        <div className="border border-border p-4 bg-background">
          <div className="flex gap-6 border-b border-border">
            {settingsTabs.map((tab, i) => (
              <button key={tab} className={`text-base pb-2 -mb-px border-b-2 transition-colors ${i === 0 ? "border-foreground text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="pt-4"><p className="text-sm text-muted-foreground">Settings content</p></div>
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">Top Bar</h2>
        <div className="border border-border bg-background">
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              Find anything...
            </span>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">Trial · 14 days left</Badge>
              <Bell className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">S</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
