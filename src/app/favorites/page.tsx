import Link from "next/link";

export default function FavoritesPage() {
  const items: { slug: string; name: string; price: number }[] = [];
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Favorites</h1>
      {items.length === 0 ? (
        <div className="mt-6 card rounded-[--radius] p-5">
          <div className="font-medium">No favorites yet</div>
          <p className="text-sm text-[--color-muted-foreground]">Tap ♥ on any domain you like.</p>
          <Link href="/search" className="inline-block mt-3 h-10 px-4 rounded-full bg-[--color-primary] text-[--color-primary-foreground] text-sm">Browse domains</Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((d) => (
            <Link key={d.slug} href={`/domain/${d.slug}`} className="card rounded-[--radius] p-3">
              <div className="aspect-[4/3] rounded-md bg-[--color-muted]" />
              <div className="mt-2 flex items-center justify-between">
                <div className="font-medium">{d.name}</div>
                <div className="font-semibold text-sm">${d.price.toLocaleString()}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


