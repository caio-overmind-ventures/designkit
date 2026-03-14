"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";

export default function DialogPage() {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-medium">Dialog</h1>
        <p className="text-muted-foreground mt-1">Modals for creation, confirmation, and content.</p>
      </div>

      {/* Creation Modal */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Creation Modal</h2>
        <Card>
          <CardContent className="pt-6">
            <Dialog>
              <DialogTrigger>
                <Button>Create new issue</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[640px]">
                <DialogHeader>
                  <DialogTitle className="text-[13px] text-muted-foreground font-normal">
                    DES › New issue
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <Input placeholder="Issue title" className="border-0 text-base font-medium p-0 h-auto focus-visible:ring-0" />
                  <Textarea placeholder="Add description..." className="border-0 p-0 resize-none focus-visible:ring-0 min-h-[100px]" />
                </div>
                <Separator />
                <DialogFooter className="flex-row justify-between sm:justify-between">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">Backlog</Button>
                    <Button variant="ghost" size="sm">Priority</Button>
                    <Button variant="ghost" size="sm">Assignee</Button>
                    <Button variant="ghost" size="sm">Labels</Button>
                  </div>
                  <Button>Create issue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Confirmation */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Confirmation Dialog</h2>
        <Card>
          <CardContent className="pt-6">
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <DialogTrigger>
                <Button variant="destructive">Delete workspace</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[420px]">
                <DialogHeader>
                  <DialogTitle>Delete workspace</DialogTitle>
                  <DialogDescription>
                    This will permanently delete the workspace and all its data. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={() => setDeleteOpen(false)}>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Scrollable */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Scrollable Dialog</h2>
        <Card>
          <CardContent className="pt-6">
            <Dialog>
              <DialogTrigger>
                <Button variant="outline">View changelog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[540px] max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Changelog</DialogTitle>
                  <DialogDescription>Recent updates and improvements</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <p className="text-[13px] font-medium">Update {8 - i}.0</p>
                        <span className="text-[11px] text-muted-foreground">Mar {12 - i}</span>
                      </div>
                      <p className="text-[13px] text-muted-foreground pl-4">
                        Improved performance and fixed several bugs. Added new keyboard shortcuts
                        for faster navigation. Enhanced dark mode contrast ratios.
                      </p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
