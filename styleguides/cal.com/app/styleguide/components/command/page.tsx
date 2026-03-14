"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem,
  CommandSeparator, CommandShortcut,
} from "@/components/ui/command";
import { Calendar, Clock, Users, Settings, Search, Plus, BarChart3, Zap, Globe, Video } from "lucide-react";

export default function CommandPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Command Palette</h1>
        <p className="text-muted-foreground text-sm mt-1">⌘K overlay with grouped items</p>
      </div>

      {/* Full Command Palette */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Command Palette (Static Preview)</CardTitle></CardHeader>
        <CardContent>
          <div className="max-w-lg mx-auto">
            <Command className="border border-border rounded-xl shadow-lg">
              <CommandInput placeholder="Search events, people, actions..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Quick Actions">
                  <CommandItem><Plus className="w-4 h-4 mr-2" /> New event type<CommandShortcut>⌘N</CommandShortcut></CommandItem>
                  <CommandItem><Calendar className="w-4 h-4 mr-2" /> View bookings<CommandShortcut>⌘B</CommandShortcut></CommandItem>
                  <CommandItem><Clock className="w-4 h-4 mr-2" /> Set availability<CommandShortcut>⌘A</CommandShortcut></CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Event Types">
                  <CommandItem><Video className="w-4 h-4 mr-2" /> Reunião de 30 min<CommandShortcut>/30min</CommandShortcut></CommandItem>
                  <CommandItem><Video className="w-4 h-4 mr-2" /> Reunião de 15 min<CommandShortcut>/15min</CommandShortcut></CommandItem>
                  <CommandItem><Video className="w-4 h-4 mr-2" /> Reunião secreta<CommandShortcut>/secret</CommandShortcut></CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Navigation">
                  <CommandItem><Calendar className="w-4 h-4 mr-2" /> Event types</CommandItem>
                  <CommandItem><Users className="w-4 h-4 mr-2" /> Teams</CommandItem>
                  <CommandItem><Zap className="w-4 h-4 mr-2" /> Workflows</CommandItem>
                  <CommandItem><BarChart3 className="w-4 h-4 mr-2" /> Insights</CommandItem>
                  <CommandItem><Settings className="w-4 h-4 mr-2" /> Settings</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem><Globe className="w-4 h-4 mr-2" /> Change timezone</CommandItem>
                  <CommandItem><Settings className="w-4 h-4 mr-2" /> Appearance</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </CardContent>
      </Card>

      {/* Compact Search */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Search Input (Compact)</CardTitle></CardHeader>
        <CardContent>
          <div className="max-w-sm">
            <Command className="border border-border rounded-[10px]">
              <CommandInput placeholder="Search" />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup>
                  <CommandItem>Reunião de 30 min</CommandItem>
                  <CommandItem>Reunião de 15 min</CommandItem>
                  <CommandItem>Reunião secreta</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
