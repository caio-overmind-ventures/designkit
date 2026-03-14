"use client";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

export default function ToastPage() {
  return (
    <div className="space-y-10">
      <Toaster richColors position="bottom-right" />
      <div><h1 className="text-xl font-medium">Toast</h1><p className="text-sm text-muted-foreground mt-1">Notification toasts</p></div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => toast.success("Transaction created", { description: "Saved successfully." })}>Success</Button>
        <Button variant="destructive" onClick={() => toast.error("Failed to sync", { description: "Could not connect to bank." })}>Error</Button>
        <Button variant="outline" onClick={() => toast.warning("Invoice overdue", { description: "INV-0023 is 15 days past due." })}>Warning</Button>
        <Button variant="secondary" onClick={() => toast.info("Insights ready", { description: "Monday summary available." })}>Info</Button>
        <Button variant="outline" onClick={() => toast("Deleted", { action: { label: "Undo", onClick: () => toast.success("Restored") } })}>With Action</Button>
      </div>
    </div>
  );
}
