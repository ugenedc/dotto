export default function OffersBuyerPage() {
  const offers = [
    { id: "1", domain: "brandly.io", amount: 4200, status: "Pending" },
    { id: "2", domain: "zupra.com", amount: 6500, status: "Countered" },
  ];
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">My offers</h1>
      <div className="mt-6 space-y-3">
        {offers.map((o) => (
          <div key={o.id} className="card rounded-[--radius] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{o.domain}</div>
                <div className="text-sm text-[--color-muted-foreground]">${o.amount.toLocaleString()} • {o.status}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-9 px-3 rounded-full border border-[--color-border] text-sm">Message</button>
                <button className="h-9 px-3 rounded-full bg-[--color-primary] text-[--color-primary-foreground] text-sm">Update offer</button>
              </div>
            </div>
            <div className="mt-3 text-sm text-[--color-muted-foreground]">Sellers reply within 48 hours on average.</div>
          </div>
        ))}
      </div>
    </div>
  );
}


