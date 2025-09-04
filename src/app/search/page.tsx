"use client";
import { useState } from "react";
import Link from "next/link";
import { DomainCard } from "@/components/domain/DomainCard";
import type { DomainCardProps } from "@/components/domain/DomainCard";

const mockDomains: DomainCardProps[] = Array.from({ length: 24 }).map((_, i) => ({
  slug: `brand-${i}`,
  name: i % 3 === 0 ? `brandly.io` : i % 3 === 1 ? `flowbank.com` : `zupra.com`,
  priceUsd: i % 3 === 0 ? 4800 : i % 3 === 1 ? 12000 : 7900,
  plan: i % 2 === 0 ? ("monthly" as const) : null,
  popularity: i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Emerging",
}));

export default function SearchPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <div className="container-px mx-auto py-6 grid gap-6 md:grid-cols-[260px_1fr]">
      <aside className="hidden md:block">
        <div className="card rounded-[--radius] p-4">
          <div className="font-semibold mb-3">Filters</div>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-medium">Category</div>
              <div className="mt-1 text-[--color-muted-foreground]">Fintech, AI, Pets…</div>
            </div>
            <div>
              <div className="font-medium">Extension/TLD</div>
              <div className="mt-1 text-[--color-muted-foreground]">.com .io .ai …</div>
            </div>
            <div>
              <div className="font-medium">Budget</div>
              <div className="mt-1 text-[--color-muted-foreground]">$1k – $50k</div>
            </div>
            <div>
              <div className="font-medium">Length</div>
              <div className="mt-1 text-[--color-muted-foreground]">4 – 12 chars</div>
            </div>
            <div>
              <div className="font-medium">Syllables</div>
              <div className="mt-1 text-[--color-muted-foreground]">1 – 3</div>
            </div>
            <div>
              <div className="font-medium">Style tags</div>
              <div className="mt-1 text-[--color-muted-foreground]">Short, Punchy, Cute…</div>
            </div>
            <div className="flex items-center gap-2">
              <input id="plans" type="checkbox" />
              <label htmlFor="plans">Payment plans only</label>
            </div>
          </div>
        </div>
      </aside>

      <section className="min-w-0">
        <div className="flex items-center justify-between">
          <div className="text-sm text-[--color-muted-foreground]">Showing {mockDomains.length} results</div>
          <div className="flex items-center gap-2">
            <select className="h-9 px-3 rounded-full border border-[--color-border] bg-[--color-card] text-sm">
              <option>Sort: Popularity</option>
              <option>Price</option>
              <option>Newest</option>
              <option>Length</option>
              <option>A→Z</option>
            </select>
            <div className="hidden sm:flex rounded-full border border-[--color-border] overflow-hidden">
              <button className={`h-9 px-3 text-sm ${view === "grid" ? "bg-[--color-muted]" : ""}`} onClick={() => setView("grid")}>Grid</button>
              <button className={`h-9 px-3 text-sm ${view === "list" ? "bg-[--color-muted]" : ""}`} onClick={() => setView("list")}>List</button>
            </div>
          </div>
        </div>

        <div className={view === "grid" ? "mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "mt-4 space-y-3"}>
          {mockDomains.map((d) => (
            view === "grid" ? (
              <DomainCard key={d.slug} {...d} />
            ) : (
              <Link key={d.slug} href={`/domain/${d.slug}`} className="card rounded-[--radius] p-3 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-12 w-16 rounded-md bg-[--color-muted] shrink-0" />
                  <div className="truncate">
                    <div className="font-medium truncate">{d.name}</div>
                    <div className="text-xs text-[--color-muted-foreground]">{d.plan ? "Pay monthly" : ""}</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold">${d.priceUsd.toLocaleString()}</div>
                  <div className="text-xs text-[--color-muted-foreground]">{d.popularity}</div>
                </div>
              </Link>
            )
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="h-10 px-4 rounded-full border border-[--color-border] bg-[--color-card] text-sm hover:bg-[--color-muted]">Load more</button>
        </div>

        <div className="mt-6 card rounded-[--radius] p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">Save these filters & get alerts</div>
            <button className="h-9 px-3 rounded-full bg-[--color-primary] text-[--color-primary-foreground] text-sm">Save search</button>
          </div>
        </div>
      </section>
    </div>
  );
}


