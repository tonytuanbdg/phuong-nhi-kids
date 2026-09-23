import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, getProductsByCategory, type ProductFilters } from "@/lib/data";
import { ProductCard } from "@/components/site/product-card";
import { CategoryFilters } from "@/components/site/category-filters";
import { Pagination } from "@/components/site/pagination";

export async function generateMetadata(
  { params }: PageProps<"/danh-muc/[slug]">
): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description:
      category.description ||
      `Mua sắm ${category.name} chất lượng cao tại PHUONG NHI KIDS.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/danh-muc/[slug]">) {
  const { slug } = await params;
  const sp = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const gender = typeof sp.gioi_tinh === "string" ? sp.gioi_tinh : undefined;
  const sort = typeof sp.sap_xep === "string" ? sp.sap_xep : undefined;
  const page = typeof sp.trang === "string" ? Number(sp.trang) || 1 : 1;
  const minPrice = typeof sp.gia_tu === "string" ? Number(sp.gia_tu) : undefined;
  const maxPrice = typeof sp.gia_den === "string" ? Number(sp.gia_den) : undefined;

  const filters: ProductFilters = {
    gender: gender === "BOY" || gender === "GIRL" || gender === "UNISEX" ? gender : undefined,
    sort: sort === "gia-tang" || sort === "gia-giam" ? sort : "moi-nhat",
    page,
    minPrice,
    maxPrice,
  };

  const { items, total, totalPages } = await getProductsByCategory(slug, filters);

  return (
    <div className="container-shop py-8">
      <nav className="mb-2 text-xs text-muted-foreground">
        <span>Trang chủ</span> / <span className="text-foreground">{category.name}</span>
      </nav>
      <h1 className="font-heading text-3xl font-bold">{category.name}</h1>
      {category.description && (
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {category.description}
        </p>
      )}
      <p className="mt-1 text-sm text-muted-foreground">{total} sản phẩm</p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        <CategoryFilters currentGender={filters.gender} currentSort={filters.sort} />

        <div>
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
              Chưa có sản phẩm phù hợp bộ lọc. Vui lòng thử lại với bộ lọc khác.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
