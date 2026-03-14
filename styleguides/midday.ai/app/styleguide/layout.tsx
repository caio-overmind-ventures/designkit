"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { useState, useEffect } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  return (
    <button onClick={() => { const n = !dark; setDark(n); document.documentElement.classList.toggle("dark", n); }}
      className="border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-accent transition-colors">
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

export default function StyleguideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r border-border bg-background p-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Link href="/styleguide" className="text-sm font-medium tracking-tight">midday.ai</Link>
          <ThemeToggle />
        </div>
        <nav className="flex flex-col gap-4">
          {navigation.map((s) => (
            <div key={s.title}>
              <h3 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1.5">{s.title}</h3>
              <ul className="flex flex-col">
                {s.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className={`block px-2 py-1 text-sm transition-colors ${pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto bg-background">
        <div className="mx-auto max-w-5xl px-8 py-10">{children}</div>
      </main>
    </div>
  );
}
