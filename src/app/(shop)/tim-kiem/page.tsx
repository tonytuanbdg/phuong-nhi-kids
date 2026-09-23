import type { Metadata } from "next";
import { searchProducts } from "@/lib/data";
import { ProductCard } from "@/components/site/product-card";
import { SearchBox } from "@/components/site/search-box";

export const metadata: Metadata = {
  title: "Tìm kiếm sản phẩm",
};

export default async function SearchPage({ searchParams }: PageProps<"/tim-kiem">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const results = q ? await searchProducts(q) : [];

  return (
    <div className="container-shop py-10">
      <h1 className="font-heading text-3xl font-bold">Tìm kiếm sản phẩm</h1>
      <div className="mt-5 max-w-xl">
        <SearchBox defaultValue={q} />
      </div>

      {q && (
        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} kết quả cho &quot;{q}&quot;
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
