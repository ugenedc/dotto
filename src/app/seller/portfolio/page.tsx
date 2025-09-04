export default function SellerPortfolioPage() {
  const rows = [
    { domain: "brandly.io", price: 4800, views: 1200, hearts: 87, offers: 12, popularity: "Rising" },
  ];
  return (
    <div className="container-px mx-auto py-8">
      <h1 className="text-2xl font-semibold">Portfolio</h1>
      <div className="mt-6 card rounded-[--radius] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-[--color-border]">
              <th className="p-3">Domain</th>
              <th className="p-3">Price</th>
              <th className="p-3">Views</th>
              <th className="p-3">Hearts</th>
              <th className="p-3">Offers</th>
              <th className="p-3">Popularity</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-[--color-border]">
                <td className="p-3 font-medium">{r.domain}</td>
                <td className="p-3">${r.price.toLocaleString()}</td>
                <td className="p-3">{r.views}</td>
                <td className="p-3">{r.hearts}</td>
                <td className="p-3">{r.offers}</td>
                <td className="p-3"><span className="rounded-full bg-[--color-muted] px-2 py-1 text-xs">{r.popularity}</span></td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="h-8 px-3 rounded-full border border-[--color-border]">Adjust price</button>
                    <button className="h-8 px-3 rounded-full border border-[--color-border]">Publish/Unpublish</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


