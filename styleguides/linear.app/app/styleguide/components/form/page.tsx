"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function FormPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-medium">Form</h1>
        <p className="text-muted-foreground mt-1">Input fields, selects, textareas, switches, and validation states.</p>
      </div>

      {/* Basic Inputs */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Text Inputs</h2>
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Issue title</Label>
                <Input placeholder="Enter issue title..." />
              </div>
              <div className="space-y-2">
                <Label>Assignee email</Label>
                <Input type="email" placeholder="name@company.com" />
              </div>
              <div className="space-y-2">
                <Label>Search</Label>
                <Input placeholder="Filter by name..." />
              </div>
              <div className="space-y-2">
                <Label>Disabled</Label>
                <Input disabled placeholder="Cannot edit" value="Read-only value" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Select */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Select</h2>
        <Card>
          <CardContent className="pt-6 grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Set priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="none">No priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Textarea */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Textarea</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Add description..." rows={4} />
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Switches */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Switches</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            {[
              { label: "Show updates in sidebar", desc: "Highlight new features and improvements", on: true },
              { label: "Changelog newsletter", desc: "Receive an email twice a month", on: false },
              { label: "Marketing and onboarding", desc: "Occasional emails to help you get the most out of Linear", on: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium">{item.label}</p>
                  <p className="text-[12px] text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.on} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Full Form */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Create Issue Form</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">New issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input placeholder="Issue title" className="border-0 text-base font-medium p-0 h-auto focus-visible:ring-0" />
            </div>
            <div className="space-y-2">
              <Textarea placeholder="Add description..." className="border-0 p-0 resize-none focus-visible:ring-0" rows={3} />
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">Backlog</Button>
              <Button variant="ghost" size="sm">Priority</Button>
              <Button variant="ghost" size="sm">Assignee</Button>
              <Button variant="ghost" size="sm">Labels</Button>
              <div className="flex-1" />
              <Switch />
              <span className="text-[12px] text-muted-foreground">Create more</span>
              <Button>Create issue</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
