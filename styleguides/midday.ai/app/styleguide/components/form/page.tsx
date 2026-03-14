"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function FormPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-medium">Form</h1>
        <p className="text-sm text-muted-foreground mt-1">Inputs, selects, textareas, switches — 0px radius, 36px height, compact density</p>
      </div>

      {/* Create Transaction — mirrors midday */}
      <div className="border-l border-border pl-6 max-w-lg space-y-6">
        <h2 className="text-xl font-medium">Create Transaction</h2>

        {/* Segment */}
        <div className="flex border border-border overflow-hidden">
          <button className="flex-1 py-1.5 text-sm bg-primary text-primary-foreground font-medium">Expense</button>
          <button className="flex-1 py-1.5 text-sm text-muted-foreground">Income</button>
        </div>
        <p className="text-sm text-muted-foreground -mt-4">Select whether this is money coming in or going out</p>

        <div className="space-y-2">
          <Label>Description</Label>
          <Input placeholder="e.g., Office supplies, Invoice payment" />
          <p className="text-sm text-muted-foreground">A brief description of what this transaction is for</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input type="number" placeholder="0.00" />
            <p className="text-sm text-muted-foreground">Enter the transaction amount</p>
          </div>
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select defaultValue="brl"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="brl">BRL</SelectItem><SelectItem value="usd">USD</SelectItem><SelectItem value="eur">EUR</SelectItem></SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">The currency for this transaction</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Account</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger>
              <SelectContent><SelectItem value="checking">Checking</SelectItem><SelectItem value="savings">Savings</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" defaultValue="2026-03-13" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent><SelectItem value="office">Office Supplies</SelectItem><SelectItem value="software">Software</SelectItem><SelectItem value="travel">Travel</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Assign</Label>
            <Select defaultValue="seven"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="seven">Seven</SelectItem><SelectItem value="caio">Caio</SelectItem></SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Note</Label>
          <Textarea placeholder="Add a note..." rows={3} />
        </div>

        <div className="flex items-center justify-between border border-border p-4">
          <div>
            <p className="text-sm font-medium">Exclude from reports</p>
            <p className="text-sm text-muted-foreground">Exclude this transaction from reports like profit, expense and revenue.</p>
          </div>
          <Switch />
        </div>

        <Button className="w-full">Create</Button>
      </div>

      <Separator />

      {/* Validation */}
      <section>
        <h2 className="text-lg font-medium mb-4">Validation States</h2>
        <div className="grid grid-cols-2 gap-6 max-w-lg">
          <div className="space-y-2">
            <Label>Name (valid)</Label>
            <Input defaultValue="Overmind Ventures" className="border-success" />
          </div>
          <div className="space-y-2">
            <Label className="text-destructive">Email (error)</Label>
            <Input defaultValue="invalid" className="border-destructive" />
            <p className="text-xs text-destructive">Please enter a valid email</p>
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Team ID (disabled)</Label>
            <Input defaultValue="7a531684-e00d-4228" disabled />
          </div>
          <div className="space-y-2">
            <Label>Read-only</Label>
            <Input defaultValue="Overmind Ventures" readOnly className="bg-muted" />
          </div>
        </div>
      </section>
    </div>
  );
}
