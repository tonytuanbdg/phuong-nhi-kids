import type { Metadata } from "next";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { ShieldCheck, Heart, Truck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Câu chuyện thương hiệu PHUONG NHI KIDS.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "An toàn cho bé",
    desc: "100% chất liệu cotton, thun lạnh cao cấp, được kiểm tra kỹ trước khi lên kệ.",
  },
  {
    icon: Heart,
    title: "Tận tâm với ba mẹ",
    desc: "Tư vấn size, kiểu dáng phù hợp với từng bé — đổi trả linh hoạt trong 7 ngày.",
  },
  {
    icon: Sparkles,
    title: "Cập nhật xu hướng",
    desc: "Mẫu mã mới mỗi tuần, bắt kịp xu hướng thời trang trẻ em trong và ngoài nước.",
  },
  {
    icon: Truck,
    title: "Giao hàng nhanh chóng",
    desc: "Giao hàng toàn quốc, thanh toán khi nhận hàng (COD), xử lý đơn trong 24h.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-accent/15 py-14">
        <div className="container-shop grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-3xl font-bold sm:text-4xl">
              Về PHUONG NHI KIDS
            </h1>
            <p className="mt-4 text-muted-foreground">
              PHUONG NHI KIDS là thương hiệu thời trang trẻ em dành cho bé từ 1
              đến 16 tuổi. Chúng tôi tin rằng mỗi bộ trang phục không chỉ đẹp
              mà còn phải thật thoải mái để bé tự tin vui chơi, khám phá mỗi
              ngày.
            </p>
            <p className="mt-3 text-muted-foreground">
              Từ một cửa hàng nhỏ, PHUONG NHI KIDS không ngừng chọn lọc những
              chất liệu an toàn, mẫu mã xinh xắn và cập nhật xu hướng để mang
              đến trải nghiệm mua sắm tốt nhất cho ba mẹ.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <PlaceholderArt kind="dam" tone="pink" className="aspect-square rounded-3xl" />
            <PlaceholderArt kind="ao-khoac" tone="sky" className="aspect-square rounded-3xl translate-y-6" />
          </div>
        </div>
      </section>

      <section className="container-shop py-14">
        <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
          Giá trị cốt lõi
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
