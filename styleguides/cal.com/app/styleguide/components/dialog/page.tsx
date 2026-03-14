"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Plus, Trash2 } from "lucide-react";

export default function DialogPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dialog</h1>
        <p className="text-muted-foreground text-sm mt-1">Creation modals, confirmation dialogs, and scrollable content</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Dialog Variants</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button onClick={() => setCreateOpen(true)}><Plus className="w-4 h-4" /> New Event Type</Button>
          <Button variant="outline" onClick={() => setConfirmOpen(true)}>Confirm Action</Button>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}><Trash2 className="w-4 h-4" /> Delete</Button>

          {/* Creation Dialog */}
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new event type</DialogTitle>
                <DialogDescription>
                  Set up event types to offer different types of meetings.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="dialog-title">Title</Label>
                  <Input id="dialog-title" placeholder="Quick chat" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dialog-url">URL</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-[10px] border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                      cal.com/seven-overmind/
                    </span>
                    <Input id="dialog-url" placeholder="quick-chat" className="rounded-l-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="A quick video meeting." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue={15} className="w-24" />
                    <span className="text-sm text-muted-foreground">minutes</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateOpen(false)}>Close</Button>
                <Button onClick={() => setCreateOpen(false)}>Continue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Confirmation Dialog */}
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm timezone change</DialogTitle>
                <DialogDescription>
                  Are you sure you want to update your timezone to America/Sao_Paulo? This will affect all your event availability.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                <Button onClick={() => setConfirmOpen(false)}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <DialogTitle>Delete account</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all data.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={() => setDeleteOpen(false)}>
                  <Trash2 className="w-4 h-4" /> Delete account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Static Preview */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Static Preview — Creation Modal</CardTitle></CardHeader>
        <CardContent>
          <div className="border border-border rounded-2xl p-8 bg-card max-w-lg mx-auto" style={{
            boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)"
          }}>
            <h3 className="text-base font-semibold">Add a new event type</h3>
            <p className="text-sm text-muted-foreground mt-1">Set up event types to offer different types of meetings.</p>
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input defaultValue="Quick chat" />
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-[10px] border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                    cal.com/seven-overmind/
                  </span>
                  <Input defaultValue="quick-chat" className="rounded-l-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea defaultValue="A quick video meeting." rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" defaultValue={15} className="w-24" />
                  <span className="text-sm text-muted-foreground">minutes</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline">Close</Button>
              <Button>Continue</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
