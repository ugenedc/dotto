export default function CreateListingPage() {
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Create a listing</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="card rounded-[--radius] p-5">
          <ol className="list-decimal list-inside space-y-3">
            <li>Domain</li>
            <li>Pricing & Offers</li>
            <li>Payment Plan (optional)</li>
            <li>Category/Style/Keywords</li>
            <li>Generate Brand Kit</li>
            <li>Preview</li>
            <li>Publish</li>
          </ol>
          <div className="mt-4 p-3 rounded-[--radius] bg-[--color-muted] text-sm">Publish is disabled until ownership is verified.</div>
        </section>
        <aside className="space-y-4">
          <div className="card rounded-[--radius] p-5">
            <div className="font-medium">Brand Kit</div>
            <div className="mt-2 text-sm text-[--color-muted-foreground]">Logo, hero mock, audio, AI blurb + tagline. Regenerate or upload manually.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}


