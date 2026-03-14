"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { CheckCircle2, XCircle, AlertTriangle, Info, Calendar } from "lucide-react";

export default function ToastPage() {
  return (
    <div className="space-y-8">
      <Toaster position="bottom-right" richColors />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Toast / Notifications</h1>
        <p className="text-muted-foreground text-sm mt-1">Success, error, warning, info toasts with optional actions</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Toast Triggers</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => toast.success("Event type created", { description: "Reunião de 30 min is now available for booking." })}
          >
            <CheckCircle2 className="w-4 h-4" /> Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Failed to save", { description: "Please check your connection and try again." })}
          >
            <XCircle className="w-4 h-4" /> Error
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("No available slots", { description: "This event type has no slots for the next 7 days." })}
          >
            <AlertTriangle className="w-4 h-4" /> Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("Timezone updated", { description: "Your timezone is now America/Sao_Paulo." })}
          >
            <Info className="w-4 h-4" /> Info
          </Button>
          <Button
            variant="outline"
            onClick={() => toast("New booking", {
              description: "Someone just booked Reunião de 30 min",
              action: { label: "View", onClick: () => {} },
              icon: <Calendar className="w-4 h-4" />,
            })}
          >
            <Calendar className="w-4 h-4" /> With Action
          </Button>
        </CardContent>
      </Card>

      {/* Static Previews */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Static Preview</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl border border-green-500/30 bg-success">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">Event type created</p>
              <p className="text-sm text-muted-foreground">Reunião de 30 min is now available for booking.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl border border-red-500/30 bg-destructive/10">
            <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">Failed to save</p>
              <p className="text-sm text-muted-foreground">Please check your connection and try again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl border border-yellow-500/30 bg-warning">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">No available slots</p>
              <p className="text-sm text-muted-foreground">This event type has no slots for the next 7 days.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl border border-blue-500/30 bg-info">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">Timezone updated</p>
              <p className="text-sm text-muted-foreground">Your timezone is now America/Sao_Paulo.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
