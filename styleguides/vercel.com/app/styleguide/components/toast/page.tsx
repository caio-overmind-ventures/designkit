"use client";

import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { CircleCheck, CircleAlert, TriangleAlert, Info } from "lucide-react";

export default function ToastPage() {
  return (
    <div className="space-y-10">
      <Toaster position="bottom-right" />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Toast</h1>
        <p className="text-muted-foreground mt-1">Success, error, warning, info, with action</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => toast.success("Project deployed successfully", { description: "Production deployment completed in 32s" })}>
          Success
        </Button>
        <Button variant="destructive" onClick={() => toast.error("Deployment failed", { description: "Build error: Module not found" })}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.warning("Domain expiring soon", { description: "example.com expires in 14 days" })}>
          Warning
        </Button>
        <Button variant="secondary" onClick={() => toast.info("New feature available", { description: "Edge Functions now support WebSocket connections" })}>
          Info
        </Button>
        <Button variant="outline" onClick={() => toast("Deployment ready", { description: "Preview: https://my-app-abc123.vercel.app", action: { label: "Visit", onClick: () => {} } })}>
          With Action
        </Button>
        <Button variant="outline" onClick={() => toast.promise(new Promise(r => setTimeout(r, 2000)), { loading: "Deploying...", success: "Deployed!", error: "Failed" })}>
          Promise
        </Button>
      </div>
    </div>
  );
}
