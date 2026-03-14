"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Database, Globe, HardDrive, Package, Zap, Activity, ExternalLink } from "lucide-react";

const usageItems = [
  { label: "Fast Data Transfer", used: "0", limit: "100 GB", percent: 0 },
  { label: "Fast Origin Transfer", used: "0", limit: "10 GB", percent: 0 },
  { label: "Edge Requests", used: "0", limit: "1M", percent: 0 },
  { label: "Function Invocations", used: "0", limit: "1M", percent: 0 },
];

const storageProviders = [
  { icon: HardDrive, name: "Edge Config", desc: "Ultra-low latency reads" },
  { icon: Package, name: "Blob", desc: "Fast object storage" },
  { icon: Database, name: "Neon", desc: "Serverless Postgres" },
  { icon: Database, name: "Supabase", desc: "Postgres backend" },
  { icon: Zap, name: "Upstash", desc: "Serverless DB (Redis, Vector, Queue)" },
];

const templates = [
  { name: "Next.js Boilerplate", desc: "Get started with Next.js and React.", color: "bg-foreground" },
  { name: "Chatbot", desc: "A full featured, hackable Next.js AI chatbot.", color: "bg-purple-500" },
  { name: "Express.js", desc: "Get started with Express.js on Vercel", color: "bg-green-600" },
  { name: "Vite + React Starter", desc: "Get started with Vite and React on Vercel.", color: "bg-violet-500" },
];

export default function CardsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Cards</h1>
        <p className="text-muted-foreground mt-1">Stat cards, app cards, usage, storage, templates</p>
      </div>

      {/* Usage Card */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Usage Card</h2>
        <Card className="max-w-md">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Last 30 days</CardTitle>
              <Button size="sm">Upgrade</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {usageItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full border-2 border-border" />
                  <span className="text-sm flex-1">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.used} / {item.limit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Storage Providers */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Storage Providers</h2>
        <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
          {storageProviders.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="flex items-center justify-between px-4 py-3 hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Create</Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Template Cards */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Template Cards</h2>
        <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
          {templates.map((t) => (
            <div key={t.name} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${t.color} rounded-md`} />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.desc}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">Deploy</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Alerts Card */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Alert/CTA Card</h2>
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-3">
              <Activity className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Get alerted for anomalies</p>
                <p className="text-xs text-muted-foreground mt-1">Automatically monitor your projects for anomalies and get notified.</p>
              </div>
              <Button variant="outline" size="sm">Upgrade to Observability Plus</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Browse Templates Card */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Browse Templates</h2>
        <Card className="max-w-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Browse Templates</p>
                <p className="text-xs text-muted-foreground mt-0.5">Jumpstart AI projects, ecommerce, and more</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500 rounded-full" />
                <div className="w-6 h-6 bg-orange-500 rounded-full" />
                <div className="w-6 h-6 bg-violet-500 rounded-full" />
                <ExternalLink className="w-4 h-4 text-muted-foreground ml-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
