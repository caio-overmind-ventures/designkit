"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, FormInput, MessageSquare, Bell,
  Navigation, Table2, CreditCard, Columns3,
  ChevronDown, Terminal, BarChart3, Sun, Moon
} from "lucide-react";

const navItems = [
  { href: "/styleguide", label: "Overview", icon: LayoutDashboard },
  { href: "/styleguide/components/form", label: "Form", icon: FormInput },
  { href: "/styleguide/components/dialog", label: "Dialog", icon: MessageSquare },
  { href: "/styleguide/components/toast", label: "Toast", icon: Bell },
  { href: "/styleguide/components/navigation", label: "Navigation", icon: Navigation },
  { href: "/styleguide/components/data-table", label: "Data Table", icon: Table2 },
  { href: "/styleguide/components/cards", label: "Cards", icon: CreditCard },
  { href: "/styleguide/components/tabs", label: "Tabs", icon: Columns3 },
  { href: "/styleguide/components/dropdown", label: "Dropdown", icon: ChevronDown },
  { href: "/styleguide/components/command-palette", label: "Command", icon: Terminal },
  { href: "/styleguide/components/charts", label: "Charts", icon: BarChart3 },
];

export default function StyleguideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const basePath = "/s/linear.app";
  const [isDark, setIsDark] = useState(true);

  function toggleTheme() {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[244px] shrink-0 border-r border-border bg-sidebar p-3 flex flex-col gap-1">
        <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">L</div>
          <span className="text-sm font-medium">Linear</span>
        </div>

        <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide px-2 mt-2 mb-1">
          Styleguide
        </div>

        {navItems.map((item) => {
          const isActive = pathname === `${basePath}${item.href}` || pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg text-[13px] h-7 transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <Icon size={14} strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-auto pt-4 border-t border-border">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-2 py-1 rounded-lg text-[13px] h-7 text-sidebar-foreground/70 hover:bg-sidebar-accent/50 w-full"
          >
            {isDark ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
