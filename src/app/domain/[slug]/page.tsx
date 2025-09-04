import Link from "next/link";

export default function DomainDetailPage({ params }: { params: { slug: string } }) {
  const name = "brandly.io";
  const price = 4800;
  const status: "For Sale" | "Under Offer" | "Sold" = "For Sale";

  return (
    <div className="container-px mx-auto py-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="min-w-0">
          <div className="aspect-[16/9] rounded-[--radius-lg] bg-[--color-muted]" />
          <div className="mt-6 space-y-4">
            <div className="card rounded-[--radius] p-4">
              <div className="font-semibold mb-1">Why it works</div>
              <p className="text-sm text-[--color-muted-foreground]">Short, memorable, and easy to pronounce. Great for a fintech or growth product. Comes with a clean logo concept and a ready-to-use tagline.</p>
            </div>
            <div className="card rounded-[--radius] p-4">
              <div className="font-semibold mb-1">Audio pronunciation</div>
              <button className="h-9 px-3 rounded-full border border-[--color-border] text-sm">Play</button>
            </div>
            <div className="card rounded-[--radius] p-4">
              <div className="font-semibold mb-1">Buyer interest</div>
              <div className="text-sm text-[--color-muted-foreground]">High • 1.2k views • 87 hearts • 12 offers</div>
            </div>
            <div className="card rounded-[--radius] p-4">
              <div className="font-semibold mb-2">Related domains</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Link key={i} href="/domain/alt" className="card rounded-[--radius] p-3">
                    <div className="aspect-[4/3] rounded-md bg-[--color-muted]" />
                    <div className="mt-2 text-sm font-medium">altbrand.io</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="card rounded-[--radius] p-5 sticky top-24">
            <div className="text-sm text-[--color-muted-foreground]">{status}</div>
            <h1 className="text-2xl font-semibold mt-1">{name}</h1>
            <div className="mt-2 flex items-end gap-2">
              <div className="text-3xl font-semibold">${price.toLocaleString()}</div>
              <span className="text-xs rounded-full px-2 py-1 bg-[--color-muted]">Pay monthly available</span>
            </div>
            <div className="mt-4 grid gap-2">
              <button className="h-11 rounded-full bg-[--color-primary] text-[--color-primary-foreground] font-medium">Buy now</button>
              <button className="h-11 rounded-full border border-[--color-border] bg-[--color-card] font-medium">Start payment plan</button>
              <button className="h-9 rounded-full border border-[--color-border] text-sm">Make an offer</button>
            </div>
            <button className="mt-3 text-sm underline underline-offset-4">♥ Add to favorites</button>
            <div className="mt-4 p-3 rounded-[--radius] bg-[--color-muted] text-sm">
              <div className="font-medium">Refund Guarantee</div>
              <p className="text-[--color-muted-foreground]">Full refund if the transfer doesn’t complete. We sit in the middle until you confirm control.</p>
              <Link href="/escrow" className="underline">How escrow works</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}


