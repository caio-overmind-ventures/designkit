"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Clock, ExternalLink, Link2, MoreHorizontal, Copy } from "lucide-react";

const eventTypes = [
  { name: "Reunião de 30 min", slug: "/seven-overmind/30min", duration: "30m", enabled: true, hidden: false },
  { name: "Reunião de 15 min", slug: "/seven-overmind/15min", duration: "15m", enabled: true, hidden: false },
  { name: "Reunião secreta", slug: "/seven-overmind/secret", duration: "15m", enabled: false, hidden: true },
  { name: "Quick chat", slug: "/seven-overmind/quick-chat", duration: "15m", enabled: true, hidden: false },
  { name: "Discovery call", slug: "/seven-overmind/discovery", duration: "45m", enabled: true, hidden: false },
];

const bookings = [
  { event: "Reunião de 30 min", with: "john@example.com", date: "Mar 15, 2026", time: "10:00 AM", status: "confirmed" },
  { event: "Reunião de 15 min", with: "maria@example.com", date: "Mar 16, 2026", time: "2:30 PM", status: "confirmed" },
  { event: "Discovery call", with: "alex@acme.co", date: "Mar 17, 2026", time: "11:00 AM", status: "pending" },
  { event: "Quick chat", with: "sarah@startup.io", date: "Mar 18, 2026", time: "4:00 PM", status: "cancelled" },
];

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    confirmed: "bg-success text-success-foreground",
    pending: "bg-warning text-warning-foreground",
    cancelled: "bg-destructive/10 text-destructive",
  };
  return <Badge className={variants[status] || ""}>{status}</Badge>;
}

export default function DataTablePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Data Table</h1>
        <p className="text-muted-foreground text-sm mt-1">Tables with badges, toggles, sort, and row actions</p>
      </div>

      {/* Event Types List */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Event Types (List Pattern)</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {eventTypes.map((et) => (
              <div key={et.slug} className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{et.name}</p>
                    <span className="text-xs text-muted-foreground">{et.slug}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs">{et.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {et.hidden && <Badge variant="secondary">Hidden</Badge>}
                  <Switch checked={et.enabled} />
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-muted rounded-lg"><ExternalLink className="w-4 h-4 text-muted-foreground" /></button>
                    <button className="p-1.5 hover:bg-muted rounded-lg"><Link2 className="w-4 h-4 text-muted-foreground" /></button>
                    <button className="p-1.5 hover:bg-muted rounded-lg"><MoreHorizontal className="w-4 h-4 text-muted-foreground" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Bookings Table</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>With</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-sm">{b.event}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{b.with}</TableCell>
                  <TableCell className="text-sm">{b.date}</TableCell>
                  <TableCell className="text-sm">{b.time}</TableCell>
                  <TableCell><StatusBadge status={b.status} /></TableCell>
                  <TableCell>
                    <button className="p-1 hover:bg-muted rounded-lg">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
