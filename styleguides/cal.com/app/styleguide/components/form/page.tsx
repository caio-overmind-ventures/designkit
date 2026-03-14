"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Globe, Link2 } from "lucide-react";

export default function FormPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Form Components</h1>
        <p className="text-muted-foreground text-sm mt-1">Inputs, selects, textareas, toggles, and validation states</p>
      </div>

      {/* Basic Inputs */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Basic Inputs</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Quick chat" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-[10px] border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                cal.com/
              </span>
              <Input id="url" placeholder="seven-overmind/30min" className="rounded-l-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seven@overmind.ventures" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <div className="flex items-center gap-2">
              <Input id="duration" type="number" defaultValue={30} className="w-24" />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selects */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Selects</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select defaultValue="sao-paulo">
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sao-paulo">America/Sao_Paulo</SelectItem>
                <SelectItem value="london">Europe/London</SelectItem>
                <SelectItem value="ny">America/New_York</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Time format</Label>
            <Select defaultValue="12h">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12-hour</SelectItem>
                <SelectItem value="24h">24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Start of week</Label>
            <Select defaultValue="sunday">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Textarea */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Textarea</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="A quick video meeting." rows={4} />
          </div>
          <div className="space-y-2">
            <Label>About</Label>
            <Textarea placeholder="Tell us about yourself..." rows={6} />
          </div>
        </CardContent>
      </Card>

      {/* Toggle Switches */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Switches / Toggles</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dynamic group links</p>
              <p className="text-sm text-muted-foreground">Allow attendees to book you through dynamic group bookings</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Allow search engine indexing</p>
              <p className="text-sm text-muted-foreground">Allow search engines to access your public content</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Monthly digest email</p>
              <p className="text-sm text-muted-foreground">Monthly digest email for teams</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Allow multiple durations</p>
              <p className="text-sm text-muted-foreground">Let bookers choose from multiple durations</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Validation States */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Validation States</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="valid">Valid input</Label>
            <Input id="valid" defaultValue="seven-overmind" className="border-green-500/50 focus:ring-green-500/30" />
            <p className="text-xs text-green-600 dark:text-green-400">Username is available</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="error">Error input</Label>
            <Input id="error" defaultValue="" className="border-destructive/50 focus:ring-destructive/30" />
            <p className="text-xs text-destructive">This field is required</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled" className="text-muted-foreground">Disabled input</Label>
            <Input id="disabled" disabled placeholder="Not editable" />
          </div>
        </CardContent>
      </Card>

      {/* Complete Form */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Complete Event Form</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">Title</Label>
            <Input id="event-title" defaultValue="Quick chat" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-url">URL</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-[10px] border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                <Link2 className="w-4 h-4 mr-1" /> cal.com/seven-overmind/
              </span>
              <Input id="event-url" defaultValue="quick-chat" className="rounded-l-none" />
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
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Allow multiple durations</span>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex justify-end gap-3">
            <Button variant="outline">Close</Button>
            <Button>Continue</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
