"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";

const bookingData = [
  { month: "Jan", bookings: 45, cancelled: 3 },
  { month: "Feb", bookings: 52, cancelled: 5 },
  { month: "Mar", bookings: 68, cancelled: 4 },
  { month: "Apr", bookings: 61, cancelled: 2 },
  { month: "May", bookings: 73, cancelled: 6 },
  { month: "Jun", bookings: 82, cancelled: 3 },
];

const dailyData = [
  { day: "Mon", meetings: 8 },
  { day: "Tue", meetings: 12 },
  { day: "Wed", meetings: 10 },
  { day: "Thu", meetings: 14 },
  { day: "Fri", meetings: 6 },
];

const chartConfig = {
  bookings: { label: "Bookings", color: "var(--chart-1)" },
  cancelled: { label: "Cancelled", color: "var(--chart-5)" },
  meetings: { label: "Meetings", color: "var(--chart-2)" },
} satisfies ChartConfig;

export default function ChartsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Charts</h1>
        <p className="text-muted-foreground text-sm mt-1">Bar, line, and area charts using extracted chart tokens</p>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Monthly Bookings</CardTitle>
          <CardDescription>Bookings vs cancellations over 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={bookingData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="bookings" fill="var(--color-bookings)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Booking Trend</CardTitle>
          <CardDescription>Monthly booking volume</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={bookingData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="bookings" stroke="var(--color-bookings)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Daily Meetings</CardTitle>
          <CardDescription>Meetings by day of week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart data={dailyData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="meetings" fill="var(--color-meetings)" fillOpacity={0.2} stroke="var(--color-meetings)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
