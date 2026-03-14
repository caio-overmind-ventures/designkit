"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "sonner";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

export default function ToastPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Toaster position="bottom-right" />
      <div>
        <h1 className="text-2xl font-medium">Toast</h1>
        <p className="text-muted-foreground mt-1">Notification toasts for feedback and alerts.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-base font-medium">Toast Variants</h2>
        <Card>
          <CardContent className="pt-6 flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => toast.success("Issue created", { description: "DES-5 has been added to the backlog" })}
            >
              <CheckCircle2 size={14} strokeWidth={1.5} className="mr-1.5" />
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("Failed to save", { description: "Network error. Please try again." })}
            >
              <AlertCircle size={14} strokeWidth={1.5} className="mr-1.5" />
              Error
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning("Rate limit reached", { description: "You can try again in 30 seconds." })}
            >
              <AlertTriangle size={14} strokeWidth={1.5} className="mr-1.5" />
              Warning
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("New update available", { description: "Linear 2.5 is ready to install." })}
            >
              <Info size={14} strokeWidth={1.5} className="mr-1.5" />
              Info
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast("Issue moved to In Progress", {
                  action: { label: "Undo", onClick: () => toast("Action undone") },
                })
              }
            >
              With Action
            </Button>
          </CardContent>
        </Card>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-base font-medium">Static Preview</h2>
        <div className="space-y-3 max-w-sm">
          {[
            { title: "Issue created", desc: "DES-5 has been added to the backlog", icon: CheckCircle2, color: "text-green-500" },
            { title: "Failed to save", desc: "Network error. Please try again.", icon: AlertCircle, color: "text-destructive" },
            { title: "Rate limit reached", desc: "Try again in 30 seconds.", icon: AlertTriangle, color: "text-yellow-500" },
            { title: "New update available", desc: "Linear 2.5 is ready.", icon: Info, color: "text-primary" },
          ].map((t) => (
            <Card key={t.title}>
              <CardContent className="flex items-start gap-3 py-3 px-4">
                <t.icon size={16} strokeWidth={1.5} className={`${t.color} mt-0.5 shrink-0`} />
                <div>
                  <p className="text-[13px] font-medium">{t.title}</p>
                  <p className="text-[12px] text-muted-foreground">{t.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
