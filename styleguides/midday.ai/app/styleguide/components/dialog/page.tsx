"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function DialogPage() {
  const [create, setCreate] = useState(false);
  const [del, setDel] = useState(false);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-medium">Dialog</h1>
        <p className="text-sm text-muted-foreground mt-1">Modals — 0px radius, no shadow</p>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => setCreate(true)}>Create Customer</Button>
        <Button variant="destructive" onClick={() => setDel(true)}>Delete Team</Button>
      </div>

      <Dialog open={create} onOpenChange={setCreate}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Customer</DialogTitle>
            <DialogDescription>Add a new customer to your workspace.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Name</Label><Input placeholder="Acme Inc" /></div>
            <div className="space-y-2"><Label>Email</Label><Input placeholder="acme@example.com" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Phone</Label><Input placeholder="+1 555-1234" /></div>
              <div className="space-y-2"><Label>Website</Label><Input placeholder="acme.com" /></div>
            </div>
            <div className="space-y-2"><Label>Contact person</Label><Input placeholder="John Doe" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreate(false)}>Cancel</Button>
            <Button>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={del} onOpenChange={setDel}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete team</DialogTitle>
            <DialogDescription>Permanently remove your Team and all of its contents from the Midday platform. This action is not reversible.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDel(false)}>Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
