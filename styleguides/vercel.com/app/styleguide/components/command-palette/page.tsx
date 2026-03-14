"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Settings, GitBranch, Globe, Database, FileText, Search, Sparkles, Users, Zap } from "lucide-react";

export default function CommandPalettePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Command Palette</h1>
        <p className="text-muted-foreground mt-1">⌘K overlay, grouped items, static preview</p>
      </div>

      {/* Static Command Palette Preview */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Find... (F)</h2>
        <div className="max-w-[384px]">
          <Command className="rounded-lg border border-border shadow-md">
            <CommandInput placeholder="Find..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Team">
                <CommandItem className="gap-2.5">
                  <Home className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm">Caio&apos;s projects</div>
                    <div className="text-xs text-muted-foreground">Team</div>
                  </div>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Quick Actions">
                <CommandItem className="gap-2.5">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm">Build Machines</div>
                    <div className="text-xs text-muted-foreground">Caio&apos;s projects / Build and Deployment / Settings</div>
                  </div>
                </CommandItem>
                <CommandItem className="gap-2.5">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm">Storage</div>
                    <div className="text-xs text-muted-foreground">Caio&apos;s projects</div>
                  </div>
                </CommandItem>
                <CommandItem className="gap-2.5">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm">Marketplace</div>
                    <div className="text-xs text-muted-foreground">Caio&apos;s projects</div>
                  </div>
                </CommandItem>
                <CommandItem className="gap-2.5">
                  <Zap className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm">Additional Concurrent Builds</div>
                    <div className="text-xs text-muted-foreground">Caio&apos;s projects / Build and Deployment / Settings</div>
                  </div>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Navigation Assistant">
                <CommandItem className="gap-2.5">
                  <Sparkles className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm">&ldquo;what did we deploy today?&rdquo;</div>
                    <div className="text-xs text-muted-foreground">Navigation Assistant</div>
                  </div>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </section>

      {/* Search with filters */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Project Search</h2>
        <div className="max-w-md">
          <Command className="rounded-lg border border-border">
            <CommandInput placeholder="Search Projects..." />
            <CommandList>
              <CommandEmpty>No projects found.</CommandEmpty>
              <CommandGroup heading="Projects">
                <CommandItem className="gap-2.5">
                  <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center">
                    <GitBranch className="w-3 h-3 text-background" />
                  </div>
                  <div>
                    <div className="text-sm">marketing-site</div>
                    <div className="text-xs text-muted-foreground">Last deployed 3h ago</div>
                  </div>
                </CommandItem>
                <CommandItem className="gap-2.5">
                  <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center">
                    <Zap className="w-3 h-3 text-background" />
                  </div>
                  <div>
                    <div className="text-sm">api-service</div>
                    <div className="text-xs text-muted-foreground">Last deployed 6h ago</div>
                  </div>
                </CommandItem>
                <CommandItem className="gap-2.5">
                  <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center">
                    <FileText className="w-3 h-3 text-background" />
                  </div>
                  <div>
                    <div className="text-sm">docs</div>
                    <div className="text-xs text-muted-foreground">Last deployed 1d ago</div>
                  </div>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </section>
    </div>
  );
}
