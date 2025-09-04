export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const stages = [
    { id: 1, name: "Funds secured", done: true },
    { id: 2, name: "Seller action", done: false },
    { id: 3, name: "Buyer receives control", done: false },
    { id: 4, name: "Buyer confirms", done: false },
    { id: 5, name: "Funds released", done: false },
  ];
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Order #{params.id}</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="card rounded-[--radius] p-5">
          <div className="font-medium">Transfer timeline</div>
          <div className="mt-4 space-y-3">
            {stages.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${s.done ? "bg-[--color-success]" : "bg-[--color-border]"}`} />
                <div className={s.done ? "" : "text-[--color-muted-foreground]"}>{s.name}</div>
              </div>
            ))}
          </div>
        </section>
        <aside className="space-y-4">
          <div className="card rounded-[--radius] p-5">
            <div className="font-medium">Actions</div>
            <div className="mt-3 grid gap-2 text-sm">
              <button className="h-10 rounded-full border border-[--color-border]">I received the domain / I control it</button>
              <button className="h-10 rounded-full border border-[--color-border]">Provide EPP / Initiate push</button>
            </div>
          </div>
          <div className="card rounded-[--radius] p-5">
            <div className="font-medium">Support thread</div>
            <div className="mt-2 text-sm text-[--color-muted-foreground]">Message support if you need help.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}


