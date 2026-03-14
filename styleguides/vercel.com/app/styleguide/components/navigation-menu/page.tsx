"use client";

import { useState } from "react";
import { Home, GitBranch, FileText, BarChart3, Gauge, Eye, Shield, Globe, Puzzle, Database, Flag, Bot, Cpu, Box, CreditCard, HelpCircle, Settings, ChevronRight } from "lucide-react";

const mainNav = [
  { icon: Home, label: "Projects", active: true },
  { icon: GitBranch, label: "Deployments" },
  { icon: FileText, label: "Logs" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Gauge, label: "Speed Insights" },
  { icon: Eye, label: "Observability", hasSubmenu: true },
  { icon: Shield, label: "Firewall" },
  { icon: Globe, label: "CDN" },
  { divider: true },
  { icon: Globe, label: "Domains" },
  { icon: Puzzle, label: "Integrations" },
  { icon: Database, label: "Storage" },
  { icon: Flag, label: "Flags" },
  { icon: Bot, label: "Agent", hasSubmenu: true },
  { icon: Cpu, label: "AI Gateway", hasSubmenu: true },
  { icon: Box, label: "Sandboxes" },
  { divider: true },
  { icon: CreditCard, label: "Usage" },
  { icon: HelpCircle, label: "Support" },
  { icon: Settings, label: "Settings", hasSubmenu: true },
];

const settingsNav = [
  { label: "General", active: true },
  { label: "Billing" },
  { label: "Build and Deployment" },
  { label: "Invoices" },
  { label: "Members" },
  { label: "Access Groups" },
  { label: "Agent" },
  { label: "Drains" },
  { label: "Webhooks" },
  { label: "Security & Privacy" },
  { label: "Deployment Protection" },
  { label: "Microfrontends" },
  { label: "Connectivity" },
  { label: "Environment Variables" },
  { label: "Activity" },
  { label: "My Notifications" },
  { label: "Apps" },
];

export default function NavigationMenuPage() {
  const [activeMain, setActiveMain] = useState("Projects");
  const [activeSetting, setActiveSetting] = useState("General");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Navigation Menu</h1>
        <p className="text-muted-foreground mt-1">Sidebar replica, settings sub-nav, top bar</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Sidebar */}
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div className="w-5 h-5 bg-orange-500 rounded-full" />
              <span className="text-sm font-medium">Caio&apos;s projects</span>
              <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">Hobby</span>
            </div>
          </div>
          <div className="p-2">
            <div className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground rounded-md hover:bg-accent cursor-pointer">
              <span className="text-sm">🔍 Find...</span>
              <span className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded">F</span>
            </div>
          </div>
          <nav className="p-2 space-y-0.5">
            {mainNav.map((item, i) => {
              if ('divider' in item) return <div key={i} className="my-2 h-px bg-border" />;
              const Icon = item.icon!;
              return (
                <button key={item.label} onClick={() => setActiveMain(item.label!)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                    activeMain === item.label ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasSubmenu && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Sub-Nav */}
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 px-2">
              <span className="text-sm text-muted-foreground">←</span>
              <span className="text-sm font-medium">Settings</span>
            </div>
          </div>
          <nav className="p-2 space-y-0.5">
            {settingsNav.map((item) => (
              <button key={item.label} onClick={() => setActiveSetting(item.label)}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                  activeSetting === item.label ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Top Header Bar */}
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <div className="border-b border-border p-3">
            <span className="text-sm font-medium">Top Header</span>
          </div>
          <div className="flex items-center justify-between p-3 border-b border-border bg-background">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-orange-500 rounded-full" />
              <span className="text-sm font-medium">Caio&apos;s projects</span>
            </div>
            <div className="text-sm text-foreground">Overview</div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-pink-400 rounded-full" />
            </div>
          </div>
          <div className="p-3">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">All projects</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
