"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";

const bandwidthData = [
  { month: "Jan", transfer: 2.4, requests: 180 },
  { month: "Feb", transfer: 1.8, requests: 145 },
  { month: "Mar", transfer: 3.2, requests: 290 },
  { month: "Apr", transfer: 2.1, requests: 210 },
  { month: "May", transfer: 4.5, requests: 380 },
  { month: "Jun", transfer: 3.8, requests: 320 },
];

const deployData = [
  { day: "Mon", success: 12, failed: 1 },
  { day: "Tue", success: 8, failed: 0 },
  { day: "Wed", success: 15, failed: 2 },
  { day: "Thu", success: 11, failed: 0 },
  { day: "Fri", success: 18, failed: 1 },
  { day: "Sat", success: 4, failed: 0 },
  { day: "Sun", success: 2, failed: 0 },
];

const functionData = [
  { hour: "00:00", invocations: 120, duration: 45 },
  { hour: "04:00", invocations: 80, duration: 32 },
  { hour: "08:00", invocations: 450, duration: 78 },
  { hour: "12:00", invocations: 680, duration: 95 },
  { hour: "16:00", invocations: 520, duration: 82 },
  { hour: "20:00", invocations: 310, duration: 55 },
];

const radarData = [
  { metric: "Speed", score: 92 },
  { metric: "Reliability", score: 98 },
  { metric: "Security", score: 85 },
  { metric: "Scalability", score: 90 },
  { metric: "DX", score: 95 },
  { metric: "Cost", score: 78 },
];

const bandwidthConfig: ChartConfig = {
  transfer: { label: "Data Transfer (GB)", color: "var(--color-chart-1)" },
  requests: { label: "Requests (K)", color: "var(--color-chart-3)" },
};

const deployConfig: ChartConfig = {
  success: { label: "Success", color: "var(--color-chart-4)" },
  failed: { label: "Failed", color: "var(--color-chart-5)" },
};

const functionConfig: ChartConfig = {
  invocations: { label: "Invocations", color: "var(--color-chart-1)" },
  duration: { label: "Duration (ms)", color: "var(--color-chart-2)" },
};

const radarConfig: ChartConfig = {
  score: { label: "Score", color: "var(--color-chart-1)" },
};

export default function ChartsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Charts</h1>
        <p className="text-muted-foreground mt-1">Bar, area, line, radar using extracted chart tokens</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart — Deployments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Deployments</CardTitle>
            <CardDescription>Success vs failed this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={deployConfig} className="h-[200px] w-full">
              <BarChart data={deployData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="success" fill="var(--color-success)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="failed" fill="var(--color-failed)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Area Chart — Bandwidth */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Bandwidth</CardTitle>
            <CardDescription>Data transfer over 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={bandwidthConfig} className="h-[200px] w-full">
              <AreaChart data={bandwidthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="transfer" fill="var(--color-transfer)" fillOpacity={0.15} stroke="var(--color-transfer)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Line Chart — Functions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Function Performance</CardTitle>
            <CardDescription>Invocations and duration today</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={functionConfig} className="h-[200px] w-full">
              <LineChart data={functionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="invocations" stroke="var(--color-invocations)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="duration" stroke="var(--color-duration)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Radar — Platform Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Platform Score</CardTitle>
            <CardDescription>Performance across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={radarConfig} className="h-[200px] w-full">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Radar dataKey="score" fill="var(--color-score)" fillOpacity={0.2} stroke="var(--color-score)" strokeWidth={2} />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
