"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar, Clock, Globe, Video, Users, FileText, Mail, MessageSquare,
  Zap, Phone, ArrowRight
} from "lucide-react";

const workflowTemplates = [
  { name: "Call to confirm booking", desc: "2 hrs before event starts", icon: Phone },
  { name: "Follow up with no shows", desc: "30m after event ends", icon: MessageSquare },
  { name: "Remind attendees to bring ID", desc: "1 day before event starts", icon: FileText },
  { name: "Send SMS reminder", desc: "24 hours before event starts", icon: MessageSquare },
  { name: "Email reminder", desc: "1 hour before event starts", icon: Mail },
  { name: "Custom email reminder", desc: "Event is rescheduled to host", icon: Mail },
];

const appCards = [
  { name: "Google Calendar", desc: "Sync your Google Calendar events", icon: Calendar, installed: true },
  { name: "Zoom", desc: "Video conferencing for your meetings", icon: Video, installed: true },
  { name: "Stripe", desc: "Collect payments for your meetings", icon: FileText, installed: false },
  { name: "Zapier", desc: "Connect Cal.com with 5000+ apps", icon: Zap, installed: false },
];

export default function CardsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cards</h1>
        <p className="text-muted-foreground text-sm mt-1">Event cards, stat cards, app cards, workflow templates</p>
      </div>

      {/* Event Type Cards */}
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Event Type Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Reunião de 30 min</CardTitle>
              <CardDescription>/seven-overmind/30min</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 30m</span>
                <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" /> Cal Video</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Reunião de 15 min</CardTitle>
              <CardDescription>/seven-overmind/15min</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 15m</span>
                <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" /> Cal Video</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Reunião secreta</CardTitle>
                <Badge variant="secondary">Hidden</Badge>
              </div>
              <CardDescription>/seven-overmind/secret</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 15m</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Stat Cards */}
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Stat Cards</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Upcoming", value: "12", change: "+3 this week" },
            { label: "Completed", value: "248", change: "+18 this month" },
            { label: "Cancelled", value: "5", change: "2% rate" },
            { label: "No shows", value: "2", change: "0.8% rate" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Workflow Template Cards */}
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Workflow Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {workflowTemplates.map((wf) => (
            <Card key={wf.name} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="pt-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <wf.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{wf.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{wf.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* App Cards */}
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">App Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {appCards.map((app) => (
            <Card key={app.name}>
              <CardContent className="pt-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <app.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{app.name}</p>
                    {app.installed && <Badge className="bg-success text-success-foreground text-[10px]">Installed</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{app.desc}</p>
                </div>
                <Button variant="outline" size="sm">
                  {app.installed ? "Configure" : "Install"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA / Promo Card */}
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Promo Card</h2>
        <Card>
          <CardContent className="pt-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">It looks like you&apos;re on a work email</p>
              <p className="text-sm text-muted-foreground mt-1">
                Organize events across your team and make sure every meeting lands with the right person.
              </p>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" size="sm">Dismiss</Button>
                <Button size="sm">Upgrade <ArrowRight className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
