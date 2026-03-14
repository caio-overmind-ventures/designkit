"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Command, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator, CommandShortcut
} from "@/components/ui/command";
import {
  CircleDot, FolderOpen, Settings, User, Inbox,
  Eye, Plus, Search, Sun, Moon, Palette
} from "lucide-react";

export default function CommandPalettePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-medium">Command Palette</h1>
        <p className="text-muted-foreground mt-1">⌘K overlay with grouped items and keyboard navigation.</p>
      </div>

      {/* Full Command Palette */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Default State</h2>
        <Card>
          <CardContent className="pt-6 flex justify-center">
            <Command className="rounded-xl border shadow-lg max-w-[640px]">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Issues">
                  <CommandItem>
                    <Plus size={14} strokeWidth={1.5} className="mr-2" />
                    Create new issue
                    <CommandShortcut>C</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <CircleDot size={14} strokeWidth={1.5} className="mr-2" />
                    My issues
                    <CommandShortcut>⌘⇧I</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Search size={14} strokeWidth={1.5} className="mr-2" />
                    Search issues
                    <CommandShortcut>/</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Navigation">
                  <CommandItem>
                    <Inbox size={14} strokeWidth={1.5} className="mr-2" />
                    Inbox
                    <CommandShortcut>⌘⇧N</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <FolderOpen size={14} strokeWidth={1.5} className="mr-2" />
                    Projects
                    <CommandShortcut>⌘⇧P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Eye size={14} strokeWidth={1.5} className="mr-2" />
                    Views
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <Settings size={14} strokeWidth={1.5} className="mr-2" />
                    Preferences
                    <CommandShortcut>⌘,</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <User size={14} strokeWidth={1.5} className="mr-2" />
                    Profile
                  </CommandItem>
                  <CommandItem>
                    <Palette size={14} strokeWidth={1.5} className="mr-2" />
                    Change interface theme
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Theme Switcher */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Filtered: Theme</h2>
        <Card>
          <CardContent className="pt-6 flex justify-center">
            <Command className="rounded-xl border shadow-lg max-w-[640px]">
              <CommandInput placeholder="light" />
              <CommandList>
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <Sun size={14} strokeWidth={1.5} className="mr-2" />
                    Change interface theme › <span className="font-medium ml-1">Light</span>
                  </CommandItem>
                  <CommandItem>
                    <Sun size={14} strokeWidth={1.5} className="mr-2" />
                    Change interface theme › <span className="font-medium ml-1">Pure Light</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Empty State */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Empty State</h2>
        <Card>
          <CardContent className="pt-6 flex justify-center">
            <Command className="rounded-xl border shadow-lg max-w-[640px]">
              <CommandInput placeholder="xyznonexistent" />
              <CommandList>
                <CommandEmpty>
                  <div className="py-4 text-center">
                    <Search size={20} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-[13px] text-muted-foreground">No results found</p>
                    <p className="text-[12px] text-muted-foreground/60">Go to advanced search</p>
                  </div>
                </CommandEmpty>
              </CommandList>
            </Command>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
