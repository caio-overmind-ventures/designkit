"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export default function DropdownMenuPage() {
  return (
    <div className="space-y-10">
      <div><h1 className="text-xl font-medium">Dropdown Menu</h1><p className="text-sm text-muted-foreground mt-1">Context menus, action menus, nested</p></div>

      <div className="flex flex-wrap gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center text-muted-foreground border border-border hover:bg-accent">⋯</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Category Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit category</DropdownMenuItem>
            <DropdownMenuItem>Set tax type</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="h-9 px-4 border border-border text-sm font-medium hover:bg-accent">Transaction Actions</DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>View details<DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem>Edit<DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem>Attach receipt</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Assign to</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Seven</DropdownMenuItem>
                <DropdownMenuItem>Caio</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Office Supplies</DropdownMenuItem>
                <DropdownMenuItem>Software</DropdownMenuItem>
                <DropdownMenuItem>Marketing</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="h-9 px-4 bg-primary text-primary-foreground text-sm font-medium">Create ▾</DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>New transaction</DropdownMenuItem>
            <DropdownMenuItem>New invoice</DropdownMenuItem>
            <DropdownMenuItem>New customer</DropdownMenuItem>
            <DropdownMenuItem>New project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">Menu Variants (Static)</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-border p-4">
            <p className="text-sm font-medium mb-2">Simple</p>
            <div className="border border-border p-1 space-y-0.5">
              {["Edit", "Duplicate", "Archive"].map((i) => (<div key={i} className="px-2 py-1.5 text-sm hover:bg-accent cursor-pointer">{i}</div>))}
              <div className="h-px bg-border" />
              <div className="px-2 py-1.5 text-sm text-destructive cursor-pointer">Delete</div>
            </div>
          </div>
          <div className="border border-border p-4">
            <p className="text-sm font-medium mb-2">With Shortcuts</p>
            <div className="border border-border p-1 space-y-0.5">
              {[{ l: "Edit", k: "⌘E" }, { l: "Copy", k: "⌘C" }].map((i) => (
                <div key={i.l} className="px-2 py-1.5 text-sm flex justify-between hover:bg-accent cursor-pointer">{i.l}<span className="text-xs text-muted-foreground">{i.k}</span></div>
              ))}
            </div>
          </div>
          <div className="border border-border p-4">
            <p className="text-sm font-medium mb-2">Nested</p>
            <div className="border border-border p-1 space-y-0.5">
              <div className="px-2 py-1.5 text-sm hover:bg-accent cursor-pointer">View</div>
              <div className="px-2 py-1.5 text-sm flex justify-between hover:bg-accent cursor-pointer">Assign to <span className="text-muted-foreground">›</span></div>
              <div className="px-2 py-1.5 text-sm flex justify-between hover:bg-accent cursor-pointer">Category <span className="text-muted-foreground">›</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
