"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DialogPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dialog</h1>
        <p className="text-muted-foreground mt-1">Creation modal, confirmation, scrollable</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Create Project */}
        <Dialog>
          <DialogTrigger render={<Button />}>Add New Project</DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Import Project</DialogTitle>
              <DialogDescription>Add a repo from your git provider to deploy on Vercel.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Repository URL</Label>
                <Input placeholder="https://github.com/user/repo" />
              </div>
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input placeholder="my-project" />
              </div>
              <div className="space-y-2">
                <Label>Framework</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-detect" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="react">Create React App</SelectItem>
                    <SelectItem value="vue">Vue.js</SelectItem>
                    <SelectItem value="svelte">SvelteKit</SelectItem>
                    <SelectItem value="nuxt">Nuxt</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation */}
        <Dialog>
          <DialogTrigger render={<Button variant="destructive" />}>Delete Team</DialogTrigger>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>Delete Team</DialogTitle>
              <DialogDescription>
                Permanently remove your team and all of its contents from the Vercel platform. This action is not reversible — please continue with caution.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-2">
                <Label>Type <span className="font-mono text-foreground">delete my team</span> to confirm</Label>
                <Input placeholder="delete my team" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Transfer */}
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>Transfer In Domain</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer In Domain</DialogTitle>
              <DialogDescription>Transfer a domain from another registrar to Vercel.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Domain Name</Label>
                <Input placeholder="example.com" />
              </div>
              <div className="space-y-2">
                <Label>Auth Code</Label>
                <Input placeholder="Enter authorization code" type="password" />
              </div>
              <p className="text-[13px] text-muted-foreground">
                You can get the auth code from your current registrar. The domain must be unlocked before transfer.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Transfer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
