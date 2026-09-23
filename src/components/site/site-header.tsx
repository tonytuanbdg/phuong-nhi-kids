import Link from "next/link";
import { getCategories } from "@/lib/data";
import { CartButton } from "@/components/site/cart-button";
import { MobileNav } from "@/components/site/mobile-nav";
import { Search } from "lucide-react";

export async function SiteHeader() {
  const categories = await getCategories().catch(() => []);
  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || "PHUONG NHI KIDS";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="bg-primary py-1.5 text-center text-xs font-medium text-primary-foreground">
        Miễn phí đổi size trong 7 ngày · Giao hàng toàn quốc, thanh toán khi nhận hàng
      </div>
      <div className="container-shop flex h-18 items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-2">
          <MobileNav categories={categories} />
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground">
              PN
            </span>
            <span className="font-heading text-xl font-bold leading-none text-foreground">
              {shopName}
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/danh-muc/${cat.slug}`}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/gioi-thieu"
            className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
          >
            Giới thiệu
          </Link>
          <Link
            href="/lien-he"
            className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
          >
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/tim-kiem"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-muted hover:text-primary"
            aria-label="Tìm kiếm"
          >
            <Search className="h-5 w-5" />
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
