"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Grid3X3, List, Filter } from "lucide-react";

export default function TabsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tabs</h1>
        <p className="text-muted-foreground mt-1">Horizontal tabs, segment control, filter tabs, view toggle</p>
      </div>

      {/* Underline Tabs — Members style */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Underline Tabs</h2>
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-4 px-0 h-auto">
            <TabsTrigger value="members" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-1 pb-2 text-sm">
              Team Members
            </TabsTrigger>
            <TabsTrigger value="pending" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-1 pb-2 text-sm">
              Pending Invitations
            </TabsTrigger>
          </TabsList>
          <TabsContent value="members" className="mt-4">
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">3 team members listed here.</p>
            </CardContent></Card>
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <Card><CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">No pending invitations.</p>
            </CardContent></Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* View Toggle — Grid/List */}
      <section>
        <h2 className="text-lg font-semibold mb-4">View Toggle</h2>
        <div className="flex items-center gap-0 border border-border rounded-md overflow-hidden w-fit">
          <button className="flex items-center justify-center w-9 h-9 bg-accent text-foreground">
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button className="flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground transition-colors">
            <List className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Filter Tabs — Deployments style */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Filter Tabs</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="w-3.5 h-3.5" /> All Environments
          </Button>
          <div className="flex items-center gap-1 border border-border rounded-md px-2 py-1">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-sm ml-1">Status</span>
            <Badge variant="secondary" className="ml-1 text-xs">5/6</Badge>
          </div>
        </div>
      </section>

      {/* Segment Control — Settings style */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Segment Control</h2>
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="mt-4">
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">General settings content.</p></CardContent></Card>
          </TabsContent>
          <TabsContent value="billing" className="mt-4">
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Billing settings content.</p></CardContent></Card>
          </TabsContent>
          <TabsContent value="members" className="mt-4">
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Members settings content.</p></CardContent></Card>
          </TabsContent>
          <TabsContent value="security" className="mt-4">
            <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Security settings content.</p></CardContent></Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
