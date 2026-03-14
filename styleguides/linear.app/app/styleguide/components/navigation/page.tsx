"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Inbox, CircleDot, LayoutDashboard, FolderOpen,
  Eye, Settings, Users, Tag, FileText, Zap,
  BarChart3, Bot, MessageCircle
} from "lucide-react";

const sidebarItems = [
  { icon: Inbox, label: "Inbox", badge: 3 },
  { icon: CircleDot, label: "My issues" },
  { label: "Workspace", heading: true },
  { icon: FolderOpen, label: "Projects" },
  { icon: Eye, label: "Views" },
  { label: "Your teams", heading: true },
  { icon: LayoutDashboard, label: "DesignKit", active: true },
  { icon: CircleDot, label: "Issues", indent: true },
  { icon: FolderOpen, label: "Projects", indent: true },
  { icon: Eye, label: "Views", indent: true },
];

const settingsNav = [
  { label: "Account", heading: true },
  { icon: Settings, label: "Preferences", active: true },
  { icon: Users, label: "Profile" },
  { label: "Issues", heading: true },
  { icon: Tag, label: "Labels" },
  { icon: FileText, label: "Templates" },
  { label: "Features", heading: true },
  { icon: Zap, label: "Initiatives" },
  { icon: BarChart3, label: "Pulse" },
  { icon: Bot, label: "AI" },
  { icon: MessageCircle, label: "Asks" },
];

export default function NavigationPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-medium">Navigation</h1>
        <p className="text-muted-foreground mt-1">Sidebar navigation patterns from the Linear app.</p>
      </div>

      {/* Main Sidebar */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">App Sidebar</h2>
        <Card>
          <CardContent className="p-0">
            <div className="w-[244px] bg-sidebar p-3 rounded-lg space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">D</div>
                <span className="text-[13px] font-medium">DesignKit</span>
                <span className="text-[11px] text-muted-foreground ml-auto">▾</span>
              </div>

              {sidebarItems.map((item, i) => {
                if (item.heading) {
                  return (
                    <div key={i} className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide px-2 pt-3 pb-1">
                      {item.label}
                    </div>
                  );
                }
                const Icon = item.icon!;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 h-7 rounded-lg text-[13px] cursor-pointer ${
                      item.indent ? "pl-6 pr-2" : "px-2"
                    } ${
                      item.active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[11px] text-muted-foreground">{item.badge}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Settings Sidebar */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Settings Sidebar</h2>
        <Card>
          <CardContent className="p-0">
            <div className="w-[244px] bg-sidebar p-3 rounded-lg space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1 text-[13px] text-muted-foreground mb-2">
                ← Back to app
              </div>

              {settingsNav.map((item, i) => {
                if (item.heading) {
                  return (
                    <div key={i} className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide px-2 pt-3 pb-1">
                      {item.label}
                    </div>
                  );
                }
                const Icon = item.icon!;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-2 h-7 rounded-lg text-[13px] cursor-pointer ${
                      item.active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Tab Navigation */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Tab Navigation</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-1">
              {["All issues", "Active", "Backlog"].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-3 py-1 rounded-md text-[13px] font-medium transition-colors ${
                    i === 1
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
              <button className="px-2 py-1 text-[13px] text-muted-foreground hover:text-foreground">+</button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
