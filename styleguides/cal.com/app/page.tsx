import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Cal.com Design System</h1>
        <p className="text-muted-foreground">Extracted design tokens and components</p>
        <Link
          href="/styleguide"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-[10px] text-sm font-medium"
          style={{
            boxShadow: "0px 2px 3px 0px rgba(0,0,0,0.06), 0px 1px 1px 0px rgba(0,0,0,0.08), 1px 4px 8px 0px rgba(0,0,0,0.12), 0px 2px 0.4px 0px rgba(255,255,255,0.12) inset, 0px -3px 2px 0px rgba(0,0,0,0.04) inset"
          }}
        >
          View Styleguide →
        </Link>
      </div>
    </div>
  );
}
