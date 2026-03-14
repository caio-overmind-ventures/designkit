"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuShortcut, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal, ExternalLink, Copy, Pencil, Trash2, Link2, Code2, Download,
  Eye, EyeOff, ArrowUpRight, Globe
} from "lucide-react";

export default function DropdownPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dropdown Menu</h1>
        <p className="text-muted-foreground text-sm mt-1">Action menus, nested menus, with shortcuts</p>
      </div>

      {/* Event Type Actions */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Event Type Actions</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-[10px] p-2 text-sm font-medium hover:bg-muted transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem><Pencil className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
              <DropdownMenuItem><ExternalLink className="w-4 h-4 mr-2" /> Preview<DropdownMenuShortcut>⌘P</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem><Copy className="w-4 h-4 mr-2" /> Duplicate<DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem><Link2 className="w-4 h-4 mr-2" /> Copy link</DropdownMenuItem>
              <DropdownMenuItem><Code2 className="w-4 h-4 mr-2" /> Embed</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><EyeOff className="w-4 h-4 mr-2" /> Hide from profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-[10px] border border-input bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
              <div className="w-5 h-5 rounded-full bg-accent" />
              Seven
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="text-sm font-medium">Seven</p>
                  <p className="text-xs text-muted-foreground">seven@overmind.ventures</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><ExternalLink className="w-4 h-4 mr-2" /> View public page</DropdownMenuItem>
              <DropdownMenuItem><Copy className="w-4 h-4 mr-2" /> Copy public link</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger><Globe className="w-4 h-4 mr-2" /> Timezone</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>America/Sao_Paulo</DropdownMenuItem>
                  <DropdownMenuItem>Europe/London</DropdownMenuItem>
                  <DropdownMenuItem>America/New_York</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Download className="w-4 h-4 mr-2" /> Export data</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Delete account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Booking Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-[10px] border border-input bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
              Booking Actions
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View details</DropdownMenuItem>
              <DropdownMenuItem><Pencil className="w-4 h-4 mr-2" /> Reschedule</DropdownMenuItem>
              <DropdownMenuItem><ArrowUpRight className="w-4 h-4 mr-2" /> Request reschedule</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Cancel booking
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </div>
  );
}
