"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, ChevronRight } from "lucide-react";

const categories = [
  { name: "Assets", color: "#22c55e", type: "System" },
  { name: "Banking & Finance", color: "#3b82f6", type: "System" },
  { name: "Cost of Goods Sold", color: "#f97316", type: "System" },
  { name: "Human Resources", color: "#a855f7", type: "System" },
  { name: "Operations", color: "#3b82f6", type: "System" },
  { name: "Revenue", color: "#22c55e", type: "System" },
  { name: "Sales & Marketing", color: "#06b6d4", type: "System" },
  { name: "Technology", color: "#3b82f6", type: "System" },
  { name: "Travel & Entertainment", color: "#f97316", type: "System" },
];

export default function DataTablePage() {
  return (
    <div className="space-y-10">
      <div><h1 className="text-xl font-medium">Data Table</h1><p className="text-sm text-muted-foreground mt-1">Tables — 0px radius, 49px rows, 48px header, category color squares</p></div>

      <div className="flex items-center justify-between mb-4">
        <Input placeholder="Search..." className="w-64" />
        <Button>Create</Button>
      </div>

      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] h-12 px-4 text-sm font-medium text-muted-foreground">Name</TableHead>
              <TableHead className="h-12 px-4 text-sm font-medium text-muted-foreground">Tax Type</TableHead>
              <TableHead className="h-12 px-4 text-sm font-medium text-muted-foreground">Tax Rate</TableHead>
              <TableHead className="h-12 px-4 text-sm font-medium text-muted-foreground">Report Code</TableHead>
              <TableHead className="w-10 h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.name} className="h-[49px]">
                <TableCell className="px-4 py-2">
                  <span className="flex items-center gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                    <span className="h-3 w-3 shrink-0" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                    <Badge variant="secondary">{cat.type}</Badge>
                  </span>
                </TableCell>
                <TableCell className="px-4 py-2 text-muted-foreground">-</TableCell>
                <TableCell className="px-4 py-2 text-muted-foreground">-</TableCell>
                <TableCell className="px-4 py-2 text-muted-foreground">-</TableCell>
                <TableCell className="px-4 py-2">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
