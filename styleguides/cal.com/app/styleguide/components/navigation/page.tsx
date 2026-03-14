"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Calendar, BookOpen, Clock, Users, Grid3X3, GitBranch, Zap, BarChart3,
  ExternalLink, Copy, Gift, Settings, ChevronDown, Search, Plus, Link2
} from "lucide-react";

const mainNavItems = [
  { name: "Event types", icon: Calendar, active: true },
  { name: "Bookings", icon: BookOpen, active: false },
  { name: "Availability", icon: Clock, active: false },
  { name: "Teams", icon: Users, active: false },
  { name: "Apps", icon: Grid3X3, active: false, hasChevron: true },
  { name: "Routing", icon: GitBranch, active: false },
  { name: "Workflows", icon: Zap, active: false },
  { name: "Insights", icon: BarChart3, active: false, hasChevron: true },
];

const settingsNavItems = [
  { name: "Profile", active: true, section: "Seven" },
  { name: "General", active: false },
  { name: "Calendars", active: false },
  { name: "Conferencing", active: false },
  { name: "Appearance", active: false },
  { name: "Out of office", active: false },
  { name: "Push notifications", active: false },
  { name: "Features", active: false },
];

const bookingTabs = ["Upcoming", "Unconfirmed", "Recurring", "Past", "Cancelled"];

export default function NavigationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Navigation</h1>
        <p className="text-muted-foreground text-sm mt-1">Sidebar, settings nav, tabs, and top bar patterns</p>
      </div>

      {/* Main Sidebar */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Main Sidebar</CardTitle></CardHeader>
        <CardContent>
          <div className="w-[220px] bg-sidebar border border-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-3 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-accent" />
                <span className="text-sm font-medium">Seven</span>
              </div>
              <button className="p-1 hover:bg-muted rounded-md">
                <Search className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            {/* Nav */}
            <nav className="px-2 pb-3 space-y-0.5">
              {mainNavItems.map((item) => (
                <a
                  key={item.name}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    item.active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="flex-1">{item.name}</span>
                  {item.hasChevron && <ChevronDown className="w-3 h-3 text-muted-foreground" />}
                </a>
              ))}
            </nav>
            {/* Footer */}
            <div className="px-2 pb-3 pt-1 border-t border-border space-y-0.5">
              <a className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                <ExternalLink className="w-4 h-4" /> View public page
              </a>
              <a className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                <Copy className="w-4 h-4" /> Copy public page link
              </a>
              <a className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                <Gift className="w-4 h-4" /> Refer and earn
              </a>
              <a className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                <Settings className="w-4 h-4" /> Settings
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Sidebar */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Settings Sidebar</CardTitle></CardHeader>
        <CardContent>
          <div className="w-[180px] space-y-4">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1 px-2">Seven</p>
              <nav className="space-y-0.5">
                {settingsNavItems.map((item) => (
                  <a
                    key={item.name}
                    className={`block px-2 py-1 rounded-lg text-sm font-medium cursor-pointer ${
                      item.active
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1 px-2">Security</p>
              <nav className="space-y-0.5">
                <a className="block px-2 py-1 rounded-lg text-sm text-muted-foreground hover:text-foreground cursor-pointer">Password</a>
                <a className="block px-2 py-1 rounded-lg text-sm text-muted-foreground hover:text-foreground cursor-pointer">Impersonation</a>
                <a className="block px-2 py-1 rounded-lg text-sm text-muted-foreground hover:text-foreground cursor-pointer">Two factor auth</a>
              </nav>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Horizontal Tabs / Filters */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Horizontal Tabs (Booking Filters)</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-1 border-b border-border pb-2">
            {bookingTabs.map((tab, i) => (
              <button
                key={tab}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="flex-1" />
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="w-4 h-4" /> Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Bar */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Page Header with Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Event types</h3>
              <p className="text-sm text-muted-foreground">Configure different events for people to book on your calendar.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-input rounded-[10px] px-2 h-8">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input className="bg-transparent text-sm px-2 h-full outline-none w-32 placeholder:text-muted-foreground" placeholder="Search" />
              </div>
              <Button size="sm">
                <Plus className="w-4 h-4" /> New
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SlidersHorizontal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>
    </svg>
  );
}
