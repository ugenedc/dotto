import Link from "next/link";

const filterChips = [
  "Category",
  "TLD",
  "Budget",
  "Style",
  "Syllables",
  "Payment Plans",
];

const heroExamples = ["fintech", "cute pet brand", "AI tools"];

export default function Home() {
  return (
    <div>
      <section className="py-10 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-tight leading-[1.1]">
            Find your next brandable domain
          </h1>
          <p className="mt-2 text-[--color-muted-foreground]">
            Curated, premium names with escrow-backed checkout and a full refund guarantee.
          </p>
        </div>
        <div className="mt-5 sm:mt-6 grid gap-3">
          <div className="relative">
            <input
              type="search"
              aria-label="Search by idea or keyword"
              placeholder="Search by idea or keyword"
              className="w-full h-12 sm:h-14 rounded-full border border-[--color-border] bg-[--color-card] pl-12 pr-4 text-base placeholder:text-[--color-muted-foreground] focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
            />
            <svg aria-hidden viewBox="0 0 20 20" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[--color-muted-foreground]">
              <path fill="currentColor" d="M12.9 14.32a8 8 0 1 1 1.414-1.414l3.386 3.387-1.414 1.414-3.386-3.387ZM14 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0Z" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterChips.map((chip) => (
              <button key={chip} className="h-9 px-3 rounded-full border border-[--color-border] bg-[--color-card] text-sm hover:bg-[--color-muted]">
                {chip}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-[--color-muted-foreground]">
            <span>Try:</span>
            {heroExamples.map((ex, i) => (
              <button key={ex} className="underline underline-offset-4 hover:text-[--color-foreground]">
                {ex}
                {i < heroExamples.length - 1 ? "," : ""}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Trending</h2>
          <Link href="/search" className="text-sm underline underline-offset-4">All domains</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card p-3 rounded-[--radius]">
              <div className="aspect-[4/3] rounded-[--radius] bg-[--color-muted]" />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">brandly.io</div>
                  <div className="text-xs text-[--color-muted-foreground]">Pay monthly</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$4,800</div>
                  <div className="text-xs text-[--color-muted-foreground]">High</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-6">
        <h2 className="text-xl font-semibold mb-3">Fresh Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card p-3 rounded-[--radius]">
              <div className="aspect-[4/3] rounded-[--radius] bg-[--color-muted]" />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">flowbank.com</div>
                  <div className="text-xs text-[--color-muted-foreground]">New</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$12,000</div>
                  <div className="text-xs text-[--color-muted-foreground]">Medium</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-6">
        <h2 className="text-xl font-semibold mb-3">Short & Punchy (≤ 6 chars)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card p-3 rounded-[--radius]">
              <div className="aspect-[4/3] rounded-[--radius] bg-[--color-muted]" />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">zupra.com</div>
                  <div className="text-xs text-[--color-muted-foreground]">Pay monthly</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$7,900</div>
                  <div className="text-xs text-[--color-muted-foreground]">High</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-6">
        <h2 className="text-xl font-semibold mb-3">With Payment Plans</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card p-3 rounded-[--radius]">
              <div className="aspect-[4/3] rounded-[--radius] bg-[--color-muted]" />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">cresco.app</div>
                  <div className="text-xs text-[--color-muted-foreground]">Pay monthly</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$2,400</div>
                  <div className="text-xs text-[--color-muted-foreground]">Emerging</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-5 rounded-[--radius]">
            <div className="font-semibold">Choose</div>
            <p className="text-sm text-[--color-muted-foreground] mt-1">Pick a domain you love from our curated catalog.</p>
          </div>
          <div className="card p-5 rounded-[--radius]">
            <div className="font-semibold">Pay (escrow)</div>
            <p className="text-sm text-[--color-muted-foreground] mt-1">We hold funds in escrow until you confirm control.</p>
          </div>
          <div className="card p-5 rounded-[--radius]">
            <div className="font-semibold">Transfer → Done</div>
            <p className="text-sm text-[--color-muted-foreground] mt-1">Seller transfers the domain. You confirm. We release funds.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
