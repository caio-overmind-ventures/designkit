"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import { Bar, BarChart, Area, AreaChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";

const velocityData = [
  { week: "W1", points: 32 },
  { week: "W2", points: 45 },
  { week: "W3", points: 38 },
  { week: "W4", points: 52 },
  { week: "W5", points: 41 },
  { week: "W6", points: 48 },
  { week: "W7", points: 55 },
  { week: "W8", points: 42 },
];

const issueData = [
  { month: "Jan", created: 120, completed: 95 },
  { month: "Feb", created: 145, completed: 130 },
  { month: "Mar", created: 110, completed: 125 },
  { month: "Apr", created: 160, completed: 142 },
  { month: "May", created: 135, completed: 150 },
  { month: "Jun", created: 155, completed: 168 },
];

const burndownData = [
  { day: "Mon", remaining: 45 },
  { day: "Tue", remaining: 38 },
  { day: "Wed", remaining: 32 },
  { day: "Thu", remaining: 28 },
  { day: "Fri", remaining: 20 },
  { day: "Sat", remaining: 15 },
  { day: "Sun", remaining: 12 },
];

const barConfig = {
  points: { label: "Points", color: "var(--chart-1)" },
} satisfies ChartConfig;

const areaConfig = {
  created: { label: "Created", color: "var(--chart-1)" },
  completed: { label: "Completed", color: "var(--chart-5)" },
} satisfies ChartConfig;

const lineConfig = {
  remaining: { label: "Remaining", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartsPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-medium">Charts</h1>
        <p className="text-muted-foreground mt-1">Bar, area, and line charts using extracted chart tokens.</p>
      </div>

      {/* Bar Chart */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Velocity (Bar)</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-[13px]">Sprint Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barConfig} className="h-[250px] w-full">
              <BarChart data={velocityData}>
                <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="points" fill="var(--color-points)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Area Chart */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Issues Over Time (Area)</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-[13px]">Created vs Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={areaConfig} className="h-[250px] w-full">
              <AreaChart data={issueData}>
                <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="created" fill="var(--color-created)" fillOpacity={0.15} stroke="var(--color-created)" strokeWidth={2} />
                <Area type="monotone" dataKey="completed" fill="var(--color-completed)" fillOpacity={0.15} stroke="var(--color-completed)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Line Chart */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Burndown (Line)</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-[13px]">Sprint Burndown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={lineConfig} className="h-[250px] w-full">
              <LineChart data={burndownData}>
                <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="remaining" stroke="var(--color-remaining)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
