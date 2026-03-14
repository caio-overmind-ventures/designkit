"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function FormPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Form</h1>
        <p className="text-muted-foreground mt-1">Input, select, textarea, toggle, validation states</p>
      </div>

      {/* Team Name — Vercel-style section */}
      <Card>
        <CardHeader>
          <CardTitle>Team Name</CardTitle>
          <CardDescription>This is your team&apos;s visible name within Vercel. For example, the name of your company or department.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input defaultValue="Caio's projects" className="max-w-sm" />
          <p className="text-[13px] text-muted-foreground">Please use 32 characters at maximum.</p>
          <div className="flex justify-end">
            <Button size="sm">Save</Button>
          </div>
        </CardContent>
      </Card>

      {/* Team URL */}
      <Card>
        <CardHeader>
          <CardTitle>Team URL</CardTitle>
          <CardDescription>This is your team&apos;s URL namespace on Vercel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-0 max-w-md">
            <span className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-l-md border border-r-0 border-border h-10 flex items-center">vercel.com/</span>
            <Input defaultValue="caios-projects-692f98e5" className="rounded-l-none" />
          </div>
          <p className="text-[13px] text-muted-foreground">Please use 48 characters at maximum.</p>
          <div className="flex justify-end">
            <Button size="sm">Save</Button>
          </div>
        </CardContent>
      </Card>

      {/* Invite Members */}
      <Card>
        <CardHeader>
          <CardTitle>Invite Members</CardTitle>
          <CardDescription>Invite new members by email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-muted-foreground">
            + Add more
          </Button>
        </CardContent>
      </Card>

      {/* Toggle / Switch */}
      <Card>
        <CardHeader>
          <CardTitle>Vercel Toolbar</CardTitle>
          <CardDescription>Enable the Vercel Toolbar on your Deployments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            <div className="space-y-2">
              <Label>Pre-Production Deployments</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Default (on)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="on">Default (on)</SelectItem>
                  <SelectItem value="off">Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Production Deployments</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Default (on)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="on">Default (on)</SelectItem>
                  <SelectItem value="off">Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="override" defaultChecked />
            <Label htmlFor="override">Allow this setting to be overridden on the project level.</Label>
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save</Button>
          </div>
        </CardContent>
      </Card>

      {/* Textarea */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
          <CardDescription>Add environment variables for your deployment.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 max-w-2xl">
            <Label>Key</Label>
            <Input placeholder="NEXT_PUBLIC_API_URL" className="font-mono text-sm" />
          </div>
          <div className="space-y-2 max-w-2xl">
            <Label>Value</Label>
            <Textarea placeholder="Enter value..." className="font-mono text-sm" rows={3} />
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save</Button>
          </div>
        </CardContent>
      </Card>

      {/* Validation States */}
      <Card>
        <CardHeader>
          <CardTitle>Validation States</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label>Default</Label>
            <Input placeholder="Enter text..." />
          </div>
          <div className="space-y-2">
            <Label>With value</Label>
            <Input defaultValue="vercel.com" />
          </div>
          <div className="space-y-2">
            <Label className="text-destructive">Error</Label>
            <Input className="border-destructive" defaultValue="invalid@" />
            <p className="text-xs text-destructive">Please enter a valid email address.</p>
          </div>
          <div className="space-y-2">
            <Label>Disabled</Label>
            <Input disabled defaultValue="Read only" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
