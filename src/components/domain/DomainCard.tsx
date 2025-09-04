import Link from "next/link";

export type DomainCardProps = {
  slug: string;
  name: string;
  priceUsd: number;
  plan?: "monthly" | null;
  popularity?: "High" | "Medium" | "Emerging";
};

export function DomainCard({ slug, name, priceUsd, plan, popularity }: DomainCardProps) {
  return (
    <Link href={`/domain/${slug}`} className="card block p-3 rounded-[--radius] hover:translate-y-[-1px] transition-transform">
      <div className="aspect-[4/3] rounded-[--radius] bg-[--color-muted]" />
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-[--color-muted-foreground]">{plan ? "Pay monthly" : ""}</div>
        </div>
        <div className="text-right">
          <div className="font-semibold">${priceUsd.toLocaleString()}</div>
          <div className="text-xs text-[--color-muted-foreground]">{popularity ?? ""}</div>
        </div>
      </div>
    </Link>
  );
}


