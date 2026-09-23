import Link from "next/link";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, RefreshCw, Sparkles } from "lucide-react";

const trustPoints = [
  { icon: ShieldCheck, label: "Chất liệu an toàn cho da bé" },
  { icon: Truck, label: "Giao hàng toàn quốc, COD" },
  { icon: RefreshCw, label: "Đổi size miễn phí 7 ngày" },
  { icon: Sparkles, label: "Mẫu mới mỗi tuần" },
];

export function Hero() {
  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || "PHUONG NHI KIDS";

  return (
    <section className="overflow-hidden bg-gradient-to-b from-accent/25 via-background to-background">
      <div className="container-shop grid items-center gap-8 py-10 lg:grid-cols-2 lg:py-16">
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pink/15 px-3 py-1.5 text-xs font-bold text-pink">
            <Sparkles className="h-3.5 w-3.5" /> Bộ sưu tập mới đã về
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl">
            Diện đồ xinh,
            <br />
            <span className="text-primary">bé vui mỗi ngày</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            {shopName} tuyển chọn quần áo trẻ em từ 1 đến 16 tuổi — chất liệu
            cotton mềm mại, kiểu dáng bắt trend, giá cả hợp lý cho ba mẹ.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/danh-muc/be-gai">
              <Button size="lg">Mua sắm ngay</Button>
            </Link>
            <Link href="/gioi-thieu">
              <Button size="lg" variant="outline">
                Về PHUONG NHI KIDS
              </Button>
            </Link>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-1.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-primary shadow-sm">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <dt className="text-xs font-medium leading-snug text-muted-foreground">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4">
            <PlaceholderArt
              kind="dam"
              tone="pink"
              className="col-span-1 aspect-square rounded-3xl shadow-md translate-y-4"
            />
            <PlaceholderArt
              kind="ao-thun"
              tone="sky"
              className="col-span-1 aspect-square rounded-3xl shadow-md"
            />
            <PlaceholderArt
              kind="quan"
              tone="sun"
              className="col-span-1 aspect-square rounded-3xl shadow-md"
            />
            <PlaceholderArt
              kind="bo-do"
              tone="mint"
              className="col-span-1 aspect-square rounded-3xl shadow-md translate-y-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
