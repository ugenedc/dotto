export default function SavedSearchesPage() {
  const searches: { id: string; name: string; alerts: boolean }[] = [];
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Saved searches</h1>
      {searches.length === 0 ? (
        <div className="mt-6 card rounded-[--radius] p-5">
          <div className="font-medium">No saved searches</div>
          <p className="text-sm text-[--color-muted-foreground]">Save filters on any results page to get alerts.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {searches.map((s) => (
            <div key={s.id} className="card rounded-[--radius] p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-[--color-muted-foreground]">Filters summarized here</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-9 px-3 rounded-full border border-[--color-border] text-sm">Edit filters</button>
                <button className="h-9 px-3 rounded-full bg-[--color-primary] text-[--color-primary-foreground] text-sm">Run search</button>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked={s.alerts} /> Alerts
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


