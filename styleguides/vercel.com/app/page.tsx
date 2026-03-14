"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => { router.replace("/styleguide"); }, [router]);
  return <div className="flex items-center justify-center min-h-screen text-muted-foreground text-sm">Loading...</div>;
}
