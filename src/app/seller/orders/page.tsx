export default function SellerOrdersPage() {
  const orders = [
    { id: "ord_1", domain: "brandly.io", status: "paid" },
  ];
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Orders & Transfer</h1>
      <div className="mt-6 space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="card rounded-[--radius] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{o.domain}</div>
                <div className="text-sm text-[--color-muted-foreground]">{o.status}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-9 px-3 rounded-full border border-[--color-border] text-sm">Provide EPP</button>
                <button className="h-9 px-3 rounded-full border border-[--color-border] text-sm">Initiate push</button>
                <button className="h-9 px-3 rounded-full border border-[--color-border] text-sm">Message buyer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


