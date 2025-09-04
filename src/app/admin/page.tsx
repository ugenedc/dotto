export default function AdminQueuesPage() {
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="card rounded-[--radius] p-5">
          <div className="font-medium">Listings to review</div>
          <div className="text-sm text-[--color-muted-foreground]">0 pending</div>
        </div>
        <div className="card rounded-[--radius] p-5">
          <div className="font-medium">Disputes</div>
          <div className="text-sm text-[--color-muted-foreground]">No active disputes</div>
        </div>
        <div className="card rounded-[--radius] p-5">
          <div className="font-medium">Orders needing attention</div>
          <div className="text-sm text-[--color-muted-foreground]">None</div>
        </div>
      </div>
    </div>
  );
}


