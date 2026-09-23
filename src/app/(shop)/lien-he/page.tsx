import type { Metadata } from "next";
import { Phone, MapPin, Clock } from "lucide-react";
import { FacebookIcon } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Thông tin liên hệ PHUONG NHI KIDS.",
};

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_SHOP_PHONE || "0900 000 000";
  const zalo = process.env.NEXT_PUBLIC_SHOP_ZALO || "0900000000";
  const address =
    process.env.NEXT_PUBLIC_SHOP_ADDRESS || "Dĩ An, Thành phố Hồ Chí Minh";
  const facebook = process.env.NEXT_PUBLIC_SHOP_FACEBOOK || "https://facebook.com";

  const items = [
    { icon: Phone, label: "Hotline", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { icon: Phone, label: "Zalo", value: zalo, href: `https://zalo.me/${zalo.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Địa chỉ cửa hàng", value: address },
    { icon: FacebookIcon, label: "Fanpage", value: "PHUONG NHI KIDS", href: facebook },
    { icon: Clock, label: "Giờ mở cửa", value: "8:00 - 21:00, tất cả các ngày trong tuần" },
  ];

  return (
    <div className="container-shop py-14">
      <h1 className="font-heading text-3xl font-bold">Liên hệ với chúng tôi</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Có thắc mắc về size, đơn hàng hay muốn tư vấn chọn đồ cho bé? Liên hệ
        ngay với PHUONG NHI KIDS qua các kênh dưới đây.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map(({ icon: Icon, label, value, href }) => {
          const content = (
            <div className="flex items-start gap-3 rounded-2xl border border-border p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="font-semibold">{value}</p>
              </div>
            </div>
          );
          return href ? (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="hover:opacity-90">
              {content}
            </a>
          ) : (
            <div key={label}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
