import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { CategoryCard } from "@/components/site/category-card";
import { ProductCard } from "@/components/site/product-card";
import { getCategories, getFeaturedProducts, getNewArrivals } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  const [categories, featured, newArrivals] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
    getNewArrivals(8),
  ]);

  return (
    <>
      <Hero />

      <section className="container-shop py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            Mua sắm theo danh mục
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {newArrivals.length > 0 && (
        <section className="container-shop py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Hàng mới về
            </h2>
            <Link
              href="/danh-muc/be-gai"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="bg-muted/50 py-12">
          <div className="container-shop">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                Được yêu thích nhất
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-shop py-14">
        <div className="grid gap-6 rounded-3xl bg-secondary/10 p-8 sm:grid-cols-3 sm:p-10">
          <div className="sm:col-span-3">
            <h2 className="font-heading text-2xl font-bold">
              Vì sao ba mẹ tin chọn PHUONG NHI KIDS?
            </h2>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">100%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Vải cotton, thun lạnh cao cấp an toàn cho da bé
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">1–16</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Đầy đủ size cho bé từ 1 đến 16 tuổi
            </p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">24h</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Xử lý đơn hàng nhanh chóng, giao toàn quốc
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
