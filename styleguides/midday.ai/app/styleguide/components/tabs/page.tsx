"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function TabsPage() {
  return (
    <div className="space-y-10">
      <div><h1 className="text-xl font-medium">Tabs</h1><p className="text-sm text-muted-foreground mt-1">Segment controls, filter tabs — 0px radius, 34px height</p></div>

      <section>
        <h2 className="text-lg font-medium mb-4">Dashboard Tabs</h2>
        <Tabs defaultValue="overview">
          <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="metrics">Metrics</TabsTrigger></TabsList>
          <TabsContent value="overview"><div className="border border-border p-4 mt-2"><div className="grid grid-cols-3 gap-4">
            <div><p className="text-xs text-muted-foreground">Revenue</p><p className="text-lg">R$12,450</p></div>
            <div><p className="text-xs text-muted-foreground">Expenses</p><p className="text-lg">R$3,200</p></div>
            <div><p className="text-xs text-muted-foreground">Net</p><p className="text-lg text-success">+R$9,250</p></div>
          </div></div></TabsContent>
          <TabsContent value="metrics"><div className="border border-border p-4 mt-2"><p className="text-sm text-muted-foreground">MRR, burn rate, runway metrics</p></div></TabsContent>
        </Tabs>
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">Segment Control (Expense/Income)</h2>
        <div className="flex border border-border overflow-hidden max-w-sm">
          <button className="flex-1 py-1.5 text-sm bg-primary text-primary-foreground font-medium">Expense</button>
          <button className="flex-1 py-1.5 text-sm text-muted-foreground">Income</button>
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">Filter Tabs</h2>
        <Tabs defaultValue="all">
          <TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="review">Review</TabsTrigger></TabsList>
          <TabsContent value="all"><div className="border border-border p-4 mt-2 text-sm text-muted-foreground">142 transactions</div></TabsContent>
          <TabsContent value="review"><div className="border border-border p-4 mt-2 text-sm text-muted-foreground">3 need review</div></TabsContent>
        </Tabs>
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">Apps Tabs</h2>
        <Tabs defaultValue="all">
          <TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="installed">Installed</TabsTrigger></TabsList>
          <TabsContent value="all"><div className="border border-border p-4 mt-2 text-sm text-muted-foreground">22 apps available</div></TabsContent>
          <TabsContent value="installed"><div className="border border-border p-4 mt-2 text-sm text-muted-foreground">No apps installed</div></TabsContent>
        </Tabs>
      </section>

      <Separator />

      <section>
        <h2 className="text-lg font-medium mb-4">Notification Tabs (Plain Text)</h2>
        <div className="w-72 border border-border p-4">
          <div className="flex gap-4 border-b border-border pb-2">
            <button className="text-sm font-medium border-b-2 border-foreground -mb-2.5 pb-2">Inbox</button>
            <button className="text-sm text-muted-foreground -mb-2.5 pb-2">Archive</button>
          </div>
          <div className="py-6 text-center"><p className="text-sm text-muted-foreground">No new notifications</p></div>
        </div>
      </section>
    </div>
  );
}
