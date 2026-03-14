"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "@/lib/theme-provider";
import {
  Calendar,
  Settings,
  LayoutGrid,
  Table2,
  MessageSquare,
  Type,
  Palette,
  ToggleLeft,
  Columns3,
  SlidersHorizontal,
  Command,
  BarChart3,
  Sun,
  Moon,
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/styleguide", icon: Palette },
  { name: "Form", href: "/styleguide/components/form", icon: Settings },
  { name: "Dialog", href: "/styleguide/components/dialog", icon: MessageSquare },
  { name: "Toast", href: "/styleguide/components/toast", icon: ToggleLeft },
  { name: "Navigation", href: "/styleguide/components/navigation", icon: Columns3 },
  { name: "Data Table", href: "/styleguide/components/data-table", icon: Table2 },
  { name: "Cards", href: "/styleguide/components/cards", icon: LayoutGrid },
  { name: "Tabs", href: "/styleguide/components/tabs", icon: SlidersHorizontal },
  { name: "Dropdown", href: "/styleguide/components/dropdown", icon: Type },
  { name: "Command", href: "/styleguide/components/command", icon: Command },
  { name: "Charts", href: "/styleguide/components/charts", icon: BarChart3 },
];

function SidebarContent() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-[220px] border-r border-border bg-sidebar shrink-0 flex flex-col h-screen sticky top-0">
      <div className="px-3 py-4 border-b border-border">
        <Link href="/styleguide" className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-foreground" />
          <span className="text-sm font-semibold text-foreground">Cal.com</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Design System</p>
      </div>
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-3 border-t border-border">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted w-full"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </aside>
  );
}

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background">
        <SidebarContent />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-8">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}
