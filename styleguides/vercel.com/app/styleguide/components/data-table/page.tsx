"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, ArrowUpDown, Search, Check, X } from "lucide-react";

const members = [
  { name: "caio-3742", email: "caio@overmind.ventures", role: "Owner", twoFa: true, joined: "Feb 24, 2026" },
  { name: "seven-bot", email: "seven@overmind.ventures", role: "Member", twoFa: true, joined: "Mar 1, 2026" },
  { name: "dev-intern", email: "intern@overmind.ventures", role: "Viewer", twoFa: false, joined: "Mar 10, 2026" },
];

const deployments = [
  { project: "marketing-site", branch: "main", status: "Ready", env: "Production", time: "2m 14s", ago: "3h ago" },
  { project: "marketing-site", branch: "feat/hero", status: "Ready", env: "Preview", time: "1m 52s", ago: "5h ago" },
  { project: "api-service", branch: "main", status: "Error", env: "Production", time: "45s", time2: "Failed", ago: "6h ago" },
  { project: "dashboard", branch: "fix/auth", status: "Building", env: "Preview", time: "...", ago: "1m ago" },
  { project: "docs", branch: "main", status: "Ready", env: "Production", time: "3m 01s", ago: "1d ago" },
];

export default function DataTablePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Data Table</h1>
        <p className="text-muted-foreground mt-1">Tables with badges, sort, filter, row actions</p>
      </div>

      {/* Members Table */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Team Members</h2>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Filter..." className="pl-9" />
          </div>
          <Select><SelectTrigger className="w-40"><SelectValue placeholder="All Team Roles" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="owner">Owner</SelectItem><SelectItem value="member">Member</SelectItem></SelectContent></Select>
          <Select><SelectTrigger className="w-32"><SelectValue placeholder="2FA Status" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="enabled">Enabled</SelectItem></SelectContent></Select>
          <Button variant="outline" size="sm"><ArrowUpDown className="w-3.5 h-3.5 mr-1.5" /> Date</Button>
        </div>
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"><input type="checkbox" className="rounded" /></TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>2FA</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.email}>
                  <TableCell><input type="checkbox" className="rounded" /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full" />
                      <div>
                        <div className="text-sm font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{m.role}</Badge></TableCell>
                  <TableCell>
                    {m.twoFa ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-muted-foreground" />}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{m.joined}</TableCell>
                  <TableCell><Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
          <span>Select all (3)</span>
          <span>3 members</span>
        </div>
      </section>

      {/* Deployments Table */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Deployments</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deployments.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{d.project}</TableCell>
                  <TableCell className="font-mono text-sm">{d.branch}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${d.status === "Ready" ? "bg-green-500" : d.status === "Error" ? "bg-red-500" : "bg-amber-500 animate-pulse"}`} />
                      <span className="text-sm">{d.status}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline">{d.env}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.time}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{d.ago}</TableCell>
                  <TableCell><Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
