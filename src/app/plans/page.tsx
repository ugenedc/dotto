export default function PlansPage() {
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Payment plans</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="card rounded-[--radius] p-5">
          <div className="font-medium">Choose a plan</div>
          <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
            {[{d:20,m:12},{d:30,m:9},{d:40,m:6}].map((p,i)=> (
              <button key={i} className="rounded-[--radius] border border-[--color-border] p-4 text-left hover:bg-[--color-muted]">
                <div className="font-semibold">{p.d}% deposit</div>
                <div className="text-[--color-muted-foreground]">{p.m} monthly payments</div>
              </button>
            ))}
          </div>
        </section>
        <aside className="space-y-4">
          <div className="card rounded-[--radius] p-5">
            <div className="font-medium">Schedule</div>
            <div className="mt-3 text-sm text-[--color-muted-foreground]">
              Deposit today, then monthly on the same date. You can point the domain via our managed nameservers during the plan. Ownership transfers after the final payment.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}


