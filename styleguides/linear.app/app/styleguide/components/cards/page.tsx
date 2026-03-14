"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowUpRight, ArrowDownRight, CircleDot, Clock, Users, Zap } from "lucide-react";

export default function CardsPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-medium">Cards</h1>
        <p className="text-muted-foreground mt-1">Stat cards, settings cards, project cards, and pricing cards.</p>
      </div>

      {/* Stat Cards */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Stat Cards</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { title: "Total Issues", value: "2,350", change: "+12%", up: true, icon: CircleDot },
            { title: "In Progress", value: "187", change: "+5%", up: true, icon: Clock },
            { title: "Team Members", value: "24", change: "+2", up: true, icon: Users },
            { title: "Velocity", value: "42pts", change: "-8%", up: false, icon: Zap },
          ].map((s) => (
            <Card key={s.title}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-muted-foreground">{s.title}</span>
                  <s.icon size={14} strokeWidth={1.5} className="text-muted-foreground" />
                </div>
                <div className="text-2xl font-medium">{s.value}</div>
                <div className={`flex items-center gap-1 text-[11px] mt-1 ${s.up ? "text-green-500" : "text-red-500"}`}>
                  {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {s.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Settings Cards */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Settings Cards</h2>
        <Card>
          <CardContent className="divide-y divide-border">
            {[
              { title: "Show updates in sidebar", desc: "Highlight new features in the sidebar", on: true },
              { title: "Auto-assign to self", desc: "When creating new issues, assign them to yourself", on: false },
              { title: "Changelog newsletter", desc: "Receive changelog emails twice a month", on: true },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between py-4 first:pt-4">
                <div>
                  <p className="text-[13px] font-medium">{item.title}</p>
                  <p className="text-[12px] text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.on} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Project Cards */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Project Cards</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Design System v2", status: "In Progress", lead: "SE", progress: 65, issues: 42 },
            { name: "API Redesign", status: "Planned", lead: "SE", progress: 0, issues: 18 },
            { name: "Mobile App", status: "In Progress", lead: "SE", progress: 35, issues: 67 },
            { name: "Performance Sprint", status: "Completed", lead: "SE", progress: 100, issues: 23 },
          ].map((p) => (
            <Card key={p.name} className="cursor-pointer hover:border-border/80 transition-colors">
              <CardContent className="pt-4 pb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-medium">{p.name}</h3>
                  <Badge variant={p.status === "Completed" ? "default" : "secondary"}>{p.status}</Badge>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{p.issues} issues</span>
                  <div className="w-5 h-5 rounded-full bg-orange-800 flex items-center justify-center text-[9px] text-white font-medium">
                    {p.lead}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Pricing Cards */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Pricing Cards</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: "Free", price: "$0", features: ["250 issues", "2 teams", "10MB uploads"], current: true },
            { name: "Basic", price: "$10", features: ["Unlimited issues", "5 teams", "Unlimited uploads"], recommended: true },
            { name: "Business", price: "$16", features: ["Unlimited everything", "Issue SLAs", "Triage rules"] },
            { name: "Enterprise", price: "Custom", features: ["SSO/SAML", "Audit logs", "Priority support"] },
          ].map((plan) => (
            <Card key={plan.name} className={plan.recommended ? "border-primary" : ""}>
              <CardContent className="pt-4 pb-4 space-y-4">
                <div>
                  <h3 className="text-[13px] font-medium">{plan.name}</h3>
                  <div className="text-xl font-medium mt-1">
                    {plan.price}
                    {plan.price !== "Custom" && <span className="text-[12px] text-muted-foreground font-normal">/user/mo</span>}
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="text-[12px] text-muted-foreground flex items-center gap-1.5">
                      <span className="text-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.current ? "outline" : plan.recommended ? "default" : "secondary"}
                  className="w-full"
                  disabled={plan.current}
                >
                  {plan.current ? "Current plan" : plan.price === "Custom" ? "Request a trial" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
