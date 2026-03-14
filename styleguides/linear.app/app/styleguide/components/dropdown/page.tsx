"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal, Copy, Pencil, Trash2, Share, Star,
  ArrowRight, Tag, User, Flag, Circle
} from "lucide-react";

export default function DropdownPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-medium">Dropdown Menu</h1>
        <p className="text-muted-foreground mt-1">Action menus, nested submenus, and keyboard shortcuts.</p>
      </div>

      {/* Issue Actions */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Issue Actions</h2>
        <Card>
          <CardContent className="pt-6 flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" size="sm">
                  <MoreHorizontal size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Issue actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Pencil size={14} strokeWidth={1.5} className="mr-2" /> Edit title
                  <DropdownMenuShortcut>E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy size={14} strokeWidth={1.5} className="mr-2" /> Copy issue ID
                  <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share size={14} strokeWidth={1.5} className="mr-2" /> Copy issue URL
                  <DropdownMenuShortcut>⌘⇧C</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star size={14} strokeWidth={1.5} className="mr-2" /> Add to favorites
                  <DropdownMenuShortcut>F</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <ArrowRight size={14} strokeWidth={1.5} className="mr-2" /> Move to team
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>DesignKit</DropdownMenuItem>
                    <DropdownMenuItem>Engineering</DropdownMenuItem>
                    <DropdownMenuItem>Product</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Tag size={14} strokeWidth={1.5} className="mr-2" /> Labels
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Circle size={8} fill="#eb5757" stroke="none" className="mr-2" /> Bug
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Circle size={8} fill="#bb87fc" stroke="none" className="mr-2" /> Feature
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Circle size={8} fill="#4ea7fc" stroke="none" className="mr-2" /> Improvement
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 size={14} strokeWidth={1.5} className="mr-2" /> Delete issue
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Priority Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="sm">
                  <Flag size={14} strokeWidth={1.5} className="mr-1.5" /> Priority
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44">
                {[
                  { label: "Urgent", color: "#eb5757" },
                  { label: "High", color: "#f2994a" },
                  { label: "Medium", color: "#f2c94c" },
                  { label: "Low", color: "#4ea7fc" },
                  { label: "No priority", color: "#bdbdbd" },
                ].map((p) => (
                  <DropdownMenuItem key={p.label}>
                    <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: p.color }} />
                    {p.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Assign Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="sm">
                  <User size={14} strokeWidth={1.5} className="mr-1.5" /> Assign
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Team members</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="w-5 h-5 rounded-full bg-orange-800 flex items-center justify-center text-[9px] text-white font-medium mr-2">SE</div>
                  seven
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-muted-foreground">Unassign</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
