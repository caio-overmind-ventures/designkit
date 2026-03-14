"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface Styleguide {
  domain: string;
  createdAt: string;
  status: "running" | "stopped";
  port: number | null;
  startedAt: string | null;
  built: boolean;
}

interface DesignMeta {
  primaryColor: string;
  accentColor: string | null;
  font: string;
  style: string;
}

export default function Home() {
  const [styleguides, setStyleguides] = useState<Styleguide[]>([]);
  const [metas, setMetas] = useState<Record<string, DesignMeta>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [buildError, setBuildError] = useState<string | null>(null);

  const fetchList = useCallback(async () => {
    const res = await fetch("/api/styleguides");
    const data = await res.json();
    if (Array.isArray(data)) {
      setStyleguides(data);
    } else {
      setStyleguides(data.styleguides || []);
    }
  }, []);

  const fetchMetas = useCallback(async () => {
    const res = await fetch("/api/styleguides/meta");
    setMetas(await res.json());
  }, []);

  useEffect(() => {
    fetchList();
    fetchMetas();
    const interval = setInterval(fetchList, 5000);
    return () => clearInterval(interval);
  }, [fetchList, fetchMetas]);

  const handleBuild = async (domain: string) => {
    setBuildError(null);
    setLoading((p) => ({ ...p, [domain]: true }));
    const res = await fetch("/api/styleguides/build", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    });
    const result = await res.json();
    if (!result.ok && result.error) {
      setBuildError(`${domain}: ${result.error}`);
      setTimeout(() => setBuildError(null), 8000);
    }
    await fetchList();
    setLoading((p) => ({ ...p, [domain]: false }));
  };

  const handleDelete = async (domain: string) => {
    if (!confirm(`Delete ${domain}? This removes the styleguide, extraction, portable tokens, and screenshot.`)) return;
    setLoading((p) => ({ ...p, [domain]: true }));
    await fetch("/api/styleguides/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    });
    await fetchList();
    setLoading((p) => ({ ...p, [domain]: false }));
  };

  const handleDownload = (domain: string) => {
    window.open(`/api/styleguides/download?domain=${encodeURIComponent(domain)}`, "_blank");
  };

  const getStaticUrl = (domain: string) => {
    return `/s/${domain}/styleguide`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 py-6 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-sm font-bold tracking-widest uppercase">
            Design System Hub
          </h1>
          <p className="text-xs mt-1.5 text-muted-foreground">
            {styleguides.length} system{styleguides.length !== 1 ? "s" : ""}{" "}
            extracted
            {styleguides.filter(s => s.built).length > 0 && (
              <span className="text-green-600">
                {" "}
                · {styleguides.filter(s => s.built).length} built
              </span>
            )}
          </p>
        </div>
      </header>

      {/* Error banner */}
      {buildError && (
        <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-3 text-center">
          <p className="text-xs text-red-400">{buildError}</p>
        </div>
      )}

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {styleguides.length === 0 ? (
          <div className="border border-dashed border-border p-16 text-center text-muted-foreground">
            <p className="text-sm mb-2">No extractions yet</p>
            <code className="text-xs bg-secondary px-3 py-1.5">
              designkit extract site.com
            </code>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {styleguides.map((sg) => {
              const meta = metas[sg.domain];
              const isRunning = sg.status === "running";
              const isLoading = loading[sg.domain];

              return (
                <div
                  key={sg.domain}
                  className={`border bg-card overflow-hidden group transition-all ${
                    sg.built
                      ? "border-green-500/60 ring-1 ring-green-500/20"
                      : "border-border hover:border-foreground/20"
                  }`}
                >
                  {/* Screenshot — first fold */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={`/screenshots/${sg.domain}.jpg?v=${sg.createdAt.slice(0, 10)}`}
                      alt={`${sg.domain} first fold`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to color banner if no screenshot
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement!.style.background = meta?.primaryColor || "#000";
                      }}
                    />
                    {/* Color strip at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 flex">
                      <div
                        className="flex-1"
                        style={{ backgroundColor: meta?.primaryColor || "#000" }}
                      />
                      {meta?.accentColor && (
                        <div
                          className="w-1/3"
                          style={{ backgroundColor: meta.accentColor }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold tracking-tight">
                          {sg.domain}
                        </h2>
                        {sg.built && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span className="text-[10px] text-green-600 tracking-widest uppercase font-bold">
                              Built
                            </span>
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1.5">
                        {meta && (
                          <>
                            <span className="text-[10px] text-muted-foreground">
                              {meta.font}
                            </span>
                            <span className="text-[10px] text-muted-foreground/40">
                              ·
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {meta.style}
                            </span>
                          </>
                        )}
                        <span className="text-[10px] text-muted-foreground/40">
                          ·
                        </span>
                        <time className="text-[10px] text-muted-foreground tabular-nums">
                          {new Date(sg.createdAt).toISOString().slice(0, 10)}
                        </time>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2 pt-2 border-t border-border">
                      {sg.built ? (
                        <>
                          <a
                            href={getStaticUrl(sg.domain)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center px-3 py-2 text-[10px] font-bold tracking-widest uppercase bg-foreground text-background hover:opacity-80 transition-opacity"
                          >
                            Open Styleguide ↗
                          </a>
                          <button
                            onClick={() => handleBuild(sg.domain)}
                            disabled={isLoading}
                            className="px-3 py-2 text-[10px] tracking-widest uppercase text-muted-foreground border border-border hover:border-foreground hover:text-foreground transition-colors disabled:opacity-30"
                            title="Rebuild"
                          >
                            {isLoading ? "···" : "⟳"}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleBuild(sg.domain)}
                          disabled={isLoading}
                          className="flex-1 px-3 py-2 text-[10px] font-bold tracking-widest uppercase border border-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-30"
                        >
                          {isLoading ? "Building···" : "Build & Preview"}
                        </button>
                      )}
                      <button
                        onClick={() => handleDownload(sg.domain)}
                        title="Download tokens"
                        className="px-3 py-2 text-[10px] tracking-widest uppercase text-muted-foreground border border-border hover:border-foreground hover:text-foreground transition-colors"
                      >
                        ↓
                      </button>
                      {/* Delete disabled for public demo */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <span className="text-[9px] text-muted-foreground/50 tracking-widest uppercase">
            Powered by Overmind Ventures
          </span>
        </div>
      </footer>
    </div>
  );
}
