import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-medium">Linear Design System</h1>
        <p className="text-muted-foreground">Extracted from linear.app</p>
        <Link
          href="/styleguide"
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 h-8 text-sm font-medium"
        >
          View Styleguide →
        </Link>
      </div>
    </div>
  );
}
