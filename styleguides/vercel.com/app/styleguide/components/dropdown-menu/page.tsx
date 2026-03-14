"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, Globe, Database, Puzzle, Users, MoreHorizontal, Copy, Trash2, ExternalLink, Settings, LogOut, HelpCircle, FileText, Pencil } from "lucide-react";

export default function DropdownMenuPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dropdown Menu</h1>
        <p className="text-muted-foreground mt-1">Action menu, nested, with shortcuts</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Add New — Primary action dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger >
            <Button className="gap-1.5">Add New... <ChevronDown className="w-3.5 h-3.5" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem><Plus className="w-4 h-4 mr-2" /> Project</DropdownMenuItem>
            <DropdownMenuItem><Globe className="w-4 h-4 mr-2" /> Domain</DropdownMenuItem>
            <DropdownMenuItem><Database className="w-4 h-4 mr-2" /> Store</DropdownMenuItem>
            <DropdownMenuItem><Puzzle className="w-4 h-4 mr-2" /> Integration</DropdownMenuItem>
            <DropdownMenuItem><Users className="w-4 h-4 mr-2" /> Team Member</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Row actions — kebab menu */}
        <DropdownMenu>
          <DropdownMenuTrigger >
            <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem><ExternalLink className="w-4 h-4 mr-2" /> Visit<DropdownMenuShortcut>⌘O</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><Copy className="w-4 h-4 mr-2" /> Copy URL<DropdownMenuShortcut>⌘C</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><Pencil className="w-4 h-4 mr-2" /> Rename</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Settings className="w-4 h-4 mr-2" /> Settings
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>General</DropdownMenuItem>
                <DropdownMenuItem>Domains</DropdownMenuItem>
                <DropdownMenuItem>Environment Variables</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger >
            <Button variant="outline" className="gap-2">
              <div className="w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full" />
              caio-3742
              <ChevronDown className="w-3.5 h-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="text-sm font-medium">caio-3742</div>
              <div className="text-xs text-muted-foreground">caio@overmind.ventures</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Settings className="w-4 h-4 mr-2" /> Settings</DropdownMenuItem>
            <DropdownMenuItem><HelpCircle className="w-4 h-4 mr-2" /> Help</DropdownMenuItem>
            <DropdownMenuItem><FileText className="w-4 h-4 mr-2" /> Docs</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><LogOut className="w-4 h-4 mr-2" /> Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
