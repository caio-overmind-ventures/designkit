"use client";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const revenue = [
  { m: "Jan", rev: 12000, exp: 8000 }, { m: "Feb", rev: 15000, exp: 9500 }, { m: "Mar", rev: 18000, exp: 10000 },
  { m: "Apr", rev: 14000, exp: 11000 }, { m: "May", rev: 22000, exp: 12000 }, { m: "Jun", rev: 25000, exp: 13000 },
  { m: "Jul", rev: 28000, exp: 12500 }, { m: "Aug", rev: 24000, exp: 14000 }, { m: "Sep", rev: 30000, exp: 15000 },
  { m: "Oct", rev: 32000, exp: 14500 }, { m: "Nov", rev: 35000, exp: 16000 }, { m: "Dec", rev: 38000, exp: 17000 },
];

const flow = [
  { m: "Jan", in: 15000, out: -8000 }, { m: "Feb", in: 18000, out: -10000 }, { m: "Mar", in: 22000, out: -11000 },
  { m: "Apr", in: 19000, out: -12000 }, { m: "May", in: 25000, out: -13000 }, { m: "Jun", in: 28000, out: -14000 },
];

const cfg1 = { rev: { label: "Revenue", color: "hsl(var(--chart-1))" }, exp: { label: "Expenses", color: "hsl(var(--chart-2))" } };
const cfg2 = { in: { label: "Inflow", color: "hsl(var(--chart-1))" }, out: { label: "Outflow", color: "hsl(var(--chart-5))" } };

export default function ChartsPage() {
  return (
    <div className="space-y-10">
      <div><h1 className="text-xl font-medium">Charts</h1><p className="text-sm text-muted-foreground mt-1">Bar, area, line charts</p></div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Revenue vs Expenses</CardTitle><CardDescription className="text-xs">Monthly · 1 year</CardDescription></CardHeader>
        <CardContent>
          <ChartContainer config={cfg1} className="h-64 w-full">
            <BarChart data={revenue}>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="m" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" tickFormatter={(v) => `$${v/1000}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="rev" fill="var(--color-rev)" radius={0} />
              <Bar dataKey="exp" fill="var(--color-exp)" radius={0} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader><CardTitle className="text-sm">Cash Flow</CardTitle><CardDescription className="text-xs">6 months</CardDescription></CardHeader>
        <CardContent>
          <ChartContainer config={cfg2} className="h-56 w-full">
            <AreaChart data={flow}>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="m" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" tickFormatter={(v) => `$${v/1000}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="in" fill="var(--color-in)" fillOpacity={0.15} stroke="var(--color-in)" strokeWidth={2} />
              <Area type="monotone" dataKey="out" fill="var(--color-out)" fillOpacity={0.15} stroke="var(--color-out)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader><CardTitle className="text-sm">Growth Trend</CardTitle><CardDescription className="text-xs">12 months</CardDescription></CardHeader>
        <CardContent>
          <ChartContainer config={cfg1} className="h-56 w-full">
            <LineChart data={revenue}>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="m" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" tickFormatter={(v) => `$${v/1000}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="rev" stroke="var(--color-rev)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="exp" stroke="var(--color-exp)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
