export default function SellerOffersInboxPage() {
  const offers = [
    { id: "1", domain: "brandly.io", amount: 4200, status: "Pending", proceeds: 4050 },
  ];
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Offers Inbox</h1>
      <div className="mt-6 space-y-3">
        {offers.map((o) => (
          <div key={o.id} className="card rounded-[--radius] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{o.domain}</div>
                <div className="text-sm text-[--color-muted-foreground]">${o.amount.toLocaleString()} • {o.status}</div>
              </div>
              <div className="text-sm text-[--color-muted-foreground]">Net proceeds ~ ${o.proceeds.toLocaleString()}</div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="h-9 px-3 rounded-full bg-[--color-success] text-white text-sm">Accept</button>
              <button className="h-9 px-3 rounded-full border border-[--color-border] text-sm">Counter</button>
              <button className="h-9 px-3 rounded-full border border-[--color-border] text-sm">Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


