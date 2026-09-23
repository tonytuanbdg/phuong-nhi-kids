import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { PlaceholderArt, type PlaceholderKind, type PlaceholderTone } from "@/components/site/placeholder-art";
import { ProductCard } from "@/components/site/product-card";
import { AddToCartForm } from "@/components/site/add-to-cart-form";
import { Badge } from "@/components/ui/badge";
import { formatVND, ageLabel, genderLabel } from "@/lib/format";
import { ShieldCheck, Truck, RefreshCw } from "lucide-react";

export async function generateMetadata(
  { params }: PageProps<"/san-pham/[slug]">
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: PageProps<"/san-pham/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id, 4);
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.basePrice;

  const sizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const colors = Array.from(new Set(product.variants.map((v) => v.color)));

  return (
    <div className="container-shop py-8">
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">Trang chủ</Link> /{" "}
        <Link href={`/danh-muc/${product.category.slug}`} className="hover:text-primary">
          {product.category.name}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="aspect-square overflow-hidden rounded-3xl border border-border">
            <PlaceholderArt
              kind={product.placeholderKind as PlaceholderKind}
              tone={product.placeholderTone as PlaceholderTone}
              className="h-full w-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl border border-border opacity-80"
              >
                <PlaceholderArt
                  kind={product.placeholderKind as PlaceholderKind}
                  tone={product.placeholderTone as PlaceholderTone}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            {product.isNewArrival && <Badge tone="mint">Mới về</Badge>}
            <Badge tone="secondary">{genderLabel(product.gender)}</Badge>
            <Badge tone="muted">
              {ageLabel(product.ageMinMonths, product.ageMaxMonths)}
            </Badge>
          </div>

          <h1 className="font-heading text-2xl font-bold sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="font-heading text-2xl font-bold text-primary">
              {formatVND(product.basePrice)}
            </span>
            {hasDiscount && (
              <span className="text-base text-muted-foreground line-through">
                {formatVND(product.compareAtPrice!)}
              </span>
            )}
          </div>

          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6">
            <AddToCartForm product={product} sizes={sizes} colors={colors} />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Vải an toàn cho da bé
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="h-5 w-5 text-primary" />
              Giao toàn quốc, COD
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <RefreshCw className="h-5 w-5 text-primary" />
              Đổi size trong 7 ngày
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-heading text-2xl font-bold">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
