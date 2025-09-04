export default function SellerOnboardingPage() {
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Seller onboarding</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="card rounded-[--radius] p-5">
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <div className="font-medium">Profile</div>
              <p className="text-sm text-[--color-muted-foreground]">Add display name and payout preferences.</p>
            </li>
            <li>
              <div className="font-medium">Ownership verification</div>
              <p className="text-sm text-[--color-muted-foreground]">Add a TXT code or prepare a registrar push. We explain both in 3 steps.</p>
            </li>
          </ol>
          <button className="mt-4 h-10 px-4 rounded-full bg-[--color-primary] text-[--color-primary-foreground] text-sm">Start</button>
        </section>
        <aside className="card rounded-[--radius] p-5">
          <div className="font-medium">Progress</div>
          <div className="mt-2 text-sm text-[--color-muted-foreground]">0/2 completed</div>
        </aside>
      </div>
    </div>
  );
}


