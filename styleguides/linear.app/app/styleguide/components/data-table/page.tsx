"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { MoreHorizontal, Circle } from "lucide-react";

const issues = [
  { id: "DES-1", title: "Get familiar with Linear", status: "Todo", statusColor: "#e2e2e3", priority: "None", assignee: "SE", date: "Mar 12" },
  { id: "DES-2", title: "Set up your teams", status: "In Progress", statusColor: "#f2c94c", priority: "High", assignee: "SE", date: "Mar 12" },
  { id: "DES-3", title: "Connect your tools", status: "Todo", statusColor: "#e2e2e3", priority: "Medium", assignee: "SE", date: "Mar 12" },
  { id: "DES-4", title: "Import your data", status: "Backlog", statusColor: "#bdbdbd", priority: "Low", assignee: "—", date: "Mar 12" },
  { id: "DES-5", title: "Configure notifications", status: "Done", statusColor: "#5e6ad2", priority: "None", assignee: "SE", date: "Mar 13" },
  { id: "DES-6", title: "Invite team members", status: "Cancelled", statusColor: "#95a2b3", priority: "Urgent", assignee: "—", date: "Mar 13" },
];

const labels = [
  { name: "Bug", color: "#eb5757", issues: 24, lastApplied: "Mar 12" },
  { name: "Feature", color: "#bb87fc", issues: 42, lastApplied: "Mar 12" },
  { name: "Improvement", color: "#4ea7fc", issues: 18, lastApplied: "Mar 12" },
  { name: "Documentation", color: "#26b5ce", issues: 8, lastApplied: "Mar 11" },
  { name: "Performance", color: "#f2994a", issues: 5, lastApplied: "Mar 10" },
];

const members = [
  { name: "seven@overmind.ventures", display: "seven", email: "seven@overmind.ventures", status: "Admin", teams: "1 team", joined: "Mar 12", lastSeen: "Online" },
];

export default function DataTablePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-medium">Data Table</h1>
        <p className="text-muted-foreground mt-1">Tables with badges, sort controls, filters, and row actions.</p>
      </div>

      {/* Issue Table */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Issue List</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[80px]">Priority</TableHead>
                  <TableHead className="w-[60px]">Assignee</TableHead>
                  <TableHead className="w-[80px]">Created</TableHead>
                  <TableHead className="w-[40px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id} className="cursor-pointer">
                    <TableCell className="text-muted-foreground">{issue.id}</TableCell>
                    <TableCell className="font-medium">{issue.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Circle size={10} fill={issue.statusColor} stroke="none" />
                        <span className="text-[12px]">{issue.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-[12px] text-muted-foreground">{issue.priority}</TableCell>
                    <TableCell>
                      {issue.assignee !== "—" ? (
                        <div className="w-5 h-5 rounded-full bg-orange-800 flex items-center justify-center text-[9px] text-white font-medium">
                          {issue.assignee}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-[12px] text-muted-foreground">{issue.date}</TableCell>
                    <TableCell>
                      <MoreHorizontal size={14} className="text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Labels Table */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Labels Table</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[80px]">Issues</TableHead>
                  <TableHead className="w-[120px]">Last applied</TableHead>
                  <TableHead className="w-[40px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {labels.map((label) => (
                  <TableRow key={label.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-[9px] h-[9px] rounded-full" style={{ backgroundColor: label.color }} />
                        <span className="font-medium">{label.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{label.issues}</TableCell>
                    <TableCell className="text-[12px] text-muted-foreground">{label.lastApplied}</TableCell>
                    <TableCell>
                      <MoreHorizontal size={14} className="text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Members Table */}
      <section className="space-y-4">
        <h2 className="text-base font-medium">Members Table</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[80px]">Status</TableHead>
                  <TableHead className="w-[80px]">Teams</TableHead>
                  <TableHead className="w-[80px]">Joined</TableHead>
                  <TableHead className="w-[80px]">Last seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((m) => (
                  <TableRow key={m.email}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-orange-800 flex items-center justify-center text-[10px] text-white font-medium">SE</div>
                        <div>
                          <p className="font-medium">{m.name}</p>
                          <p className="text-[11px] text-muted-foreground">{m.display}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{m.email}</TableCell>
                    <TableCell>
                      <span className="text-primary font-medium text-[12px]">{m.status}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{m.teams}</TableCell>
                    <TableCell className="text-[12px] text-muted-foreground">{m.joined}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[12px]">{m.lastSeen}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
