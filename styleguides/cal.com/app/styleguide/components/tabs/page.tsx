"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Settings, Users, BarChart3, LayoutGrid, List } from "lucide-react";

export default function TabsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tabs</h1>
        <p className="text-muted-foreground text-sm mt-1">Horizontal tabs, segment controls, filter tabs, view toggles</p>
      </div>

      {/* Standard Tabs */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Standard Tabs</CardTitle></CardHeader>
        <CardContent>
          <Tabs defaultValue="basics">
            <TabsList>
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="limits">Limits</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
            </TabsList>
            <TabsContent value="basics" className="mt-4">
              <p className="text-sm text-muted-foreground">Event type basic settings — title, description, URL, duration.</p>
            </TabsContent>
            <TabsContent value="availability" className="mt-4">
              <p className="text-sm text-muted-foreground">Working hours and availability configuration.</p>
            </TabsContent>
            <TabsContent value="limits" className="mt-4">
              <p className="text-sm text-muted-foreground">How often you can be booked — frequency, buffer time, notice period.</p>
            </TabsContent>
            <TabsContent value="advanced" className="mt-4">
              <p className="text-sm text-muted-foreground">Calendar settings, webhooks, and more.</p>
            </TabsContent>
            <TabsContent value="recurring" className="mt-4">
              <p className="text-sm text-muted-foreground">Set up a repeating schedule for this event type.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Filter Tabs (Bookings)</CardTitle></CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="unconfirmed">Unconfirmed</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-semibold text-foreground">No upcoming bookings</p>
                <p className="text-sm mt-1">As soon as someone books a time with you it will show up here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Segment Control */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Segment Control (Availability)</CardTitle></CardHeader>
        <CardContent>
          <Tabs defaultValue="my">
            <TabsList>
              <TabsTrigger value="my">My availability</TabsTrigger>
              <TabsTrigger value="team">Team availability</TabsTrigger>
            </TabsList>
            <TabsContent value="my" className="mt-4">
              <div className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Working hours</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Mon — Fri, 9:00 AM — 5:00 PM</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> America/Sao_Paulo
                    </div>
                  </div>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-md">Default</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <Card>
        <CardHeader><CardTitle className="text-sm">View Toggle (Booking Layout)</CardTitle></CardHeader>
        <CardContent>
          <Tabs defaultValue="month">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="column">Column</TabsTrigger>
            </TabsList>
            <TabsContent value="month" className="mt-4">
              <div className="border border-border rounded-xl p-8 text-center text-sm text-muted-foreground">
                Month calendar view
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Icon Tabs */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Icon View Switcher</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-fit">
            <button className="p-2 rounded-md bg-card shadow-sm"><Calendar className="w-4 h-4" /></button>
            <button className="p-2 rounded-md text-muted-foreground hover:text-foreground"><LayoutGrid className="w-4 h-4" /></button>
            <button className="p-2 rounded-md text-muted-foreground hover:text-foreground"><List className="w-4 h-4" /></button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
