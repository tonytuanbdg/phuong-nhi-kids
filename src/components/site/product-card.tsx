import Link from "next/link";
import { PlaceholderArt, type PlaceholderKind, type PlaceholderTone } from "@/components/site/placeholder-art";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/format";
import type { ProductListItem } from "@/lib/data";

export function ProductCard({ product }: { product: ProductListItem }) {
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.basePrice) /
          product.compareAtPrice!) *
          100
      )
    : 0;

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <PlaceholderArt
          kind={product.placeholderKind as PlaceholderKind}
          tone={product.placeholderTone as PlaceholderTone}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {product.isNewArrival && <Badge tone="mint">Mới về</Badge>}
          {hasDiscount && <Badge tone="primary">-{discountPercent}%</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <span className="text-xs font-medium text-muted-foreground">
          {product.category.name}
        </span>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-heading text-base font-bold text-primary">
            {formatVND(product.basePrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatVND(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
