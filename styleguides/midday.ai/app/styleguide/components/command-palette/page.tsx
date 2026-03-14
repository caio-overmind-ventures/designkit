"use client";
import { useState, useEffect } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, Receipt, FileText, Timer, Users, Settings, Plus, Link2, BarChart3, TrendingUp, Wallet } from "lucide-react";

export default function CommandPalettePage() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const d = (e: KeyboardEvent) => { if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(o => !o); } }; document.addEventListener("keydown", d); return () => document.removeEventListener("keydown", d); }, []);

  return (
    <div className="space-y-10">
      <div><h1 className="text-xl font-medium">Command Palette</h1><p className="text-sm text-muted-foreground mt-1">Global search — Lucide icons, monochromatic</p></div>

      <Button variant="outline" className="w-full max-w-sm justify-between text-muted-foreground" onClick={() => setOpen(true)}>
        Find anything... <kbd className="border border-border px-1.5 py-0.5 text-[10px]">⌘ K</kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find anything..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem><LayoutDashboard className="mr-2 h-4 w-4" strokeWidth={1.5} /> Overview<CommandShortcut>⌘1</CommandShortcut></CommandItem>
            <CommandItem><Receipt className="mr-2 h-4 w-4" strokeWidth={1.5} /> Transactions<CommandShortcut>⌘2</CommandShortcut></CommandItem>
            <CommandItem><FileText className="mr-2 h-4 w-4" strokeWidth={1.5} /> Invoices</CommandItem>
            <CommandItem><Timer className="mr-2 h-4 w-4" strokeWidth={1.5} /> Tracker</CommandItem>
            <CommandItem><Users className="mr-2 h-4 w-4" strokeWidth={1.5} /> Customers</CommandItem>
            <CommandItem><Settings className="mr-2 h-4 w-4" strokeWidth={1.5} /> Settings</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem><Plus className="mr-2 h-4 w-4" strokeWidth={1.5} /> Create transaction</CommandItem>
            <CommandItem><FileText className="mr-2 h-4 w-4" strokeWidth={1.5} /> Create invoice</CommandItem>
            <CommandItem><Users className="mr-2 h-4 w-4" strokeWidth={1.5} /> Create customer</CommandItem>
            <CommandItem><Link2 className="mr-2 h-4 w-4" strokeWidth={1.5} /> Connect bank</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Reports">
            <CommandItem><BarChart3 className="mr-2 h-4 w-4" strokeWidth={1.5} /> Burn rate analysis</CommandItem>
            <CommandItem><TrendingUp className="mr-2 h-4 w-4" strokeWidth={1.5} /> Expense Breakdown</CommandItem>
            <CommandItem><Wallet className="mr-2 h-4 w-4" strokeWidth={1.5} /> Spending Analysis</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">Static Preview</h2>
        <div className="max-w-lg">
          <Command className="border border-border">
            <CommandInput placeholder="Find anything..." />
            <CommandList>
              <CommandGroup heading="Suggestions">
                <CommandItem><LayoutDashboard className="mr-2 h-4 w-4" strokeWidth={1.5} /> Overview</CommandItem>
                <CommandItem><Receipt className="mr-2 h-4 w-4" strokeWidth={1.5} /> Recent transactions</CommandItem>
                <CommandItem><FileText className="mr-2 h-4 w-4" strokeWidth={1.5} /> Draft invoices</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Quick Actions">
                <CommandItem><Plus className="mr-2 h-4 w-4" strokeWidth={1.5} /> Create transaction<CommandShortcut>⌘N</CommandShortcut></CommandItem>
                <CommandItem><FileText className="mr-2 h-4 w-4" strokeWidth={1.5} /> Create invoice<CommandShortcut>⌘I</CommandShortcut></CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </section>
    </div>
  );
}
