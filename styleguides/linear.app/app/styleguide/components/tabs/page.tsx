"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-medium">Tabs</h1>
        <p className="text-muted-foreground mt-1">Horizontal tabs, segment controls, filter tabs, and view toggles.</p>
      </div>

      {/* Standard Tabs */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Issue Filter Tabs</h2>
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="all">All issues</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="backlog">Backlog</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4 text-[13px] text-muted-foreground">Showing all 2,350 issues across all statuses.</TabsContent>
              <TabsContent value="active" className="mt-4 text-[13px] text-muted-foreground">Showing 187 active issues in progress.</TabsContent>
              <TabsContent value="backlog" className="mt-4 text-[13px] text-muted-foreground">Showing 843 backlog items awaiting triage.</TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* My Issues Tabs */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">My Issues Tabs</h2>
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="assigned">
              <TabsList>
                <TabsTrigger value="assigned">Assigned</TabsTrigger>
                <TabsTrigger value="created">Created</TabsTrigger>
                <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="assigned" className="mt-4 text-[13px] text-muted-foreground">4 issues assigned to you.</TabsContent>
              <TabsContent value="created" className="mt-4 text-[13px] text-muted-foreground">12 issues created by you.</TabsContent>
              <TabsContent value="subscribed" className="mt-4 text-[13px] text-muted-foreground">8 subscribed issues.</TabsContent>
              <TabsContent value="activity" className="mt-4 text-[13px] text-muted-foreground">Recent activity feed.</TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Settings Tabs */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Settings Section Tabs</h2>
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="interface">Interface</TabsTrigger>
                <TabsTrigger value="workflows">Workflows</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="mt-4 space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-[13px] font-medium">Default home view</p>
                    <p className="text-[12px] text-muted-foreground">Select which view to display when launching Linear</p>
                  </div>
                  <span className="text-[13px] text-muted-foreground">Active issues ▾</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-[13px] font-medium">Display names</p>
                    <p className="text-[12px] text-muted-foreground">How names are displayed in the interface</p>
                  </div>
                  <span className="text-[13px] text-muted-foreground">Full name ▾</span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* View Toggle */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">View Toggle (Pill Style)</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="inline-flex bg-secondary rounded-lg p-0.5 gap-0.5">
              {["List", "Board", "Timeline"].map((view, i) => (
                <button
                  key={view}
                  className={`px-3 py-1 rounded-md text-[13px] font-medium transition-colors ${
                    i === 0
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
