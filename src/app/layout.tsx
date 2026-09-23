import type { Metadata } from "next";
import { Baloo_2, Be_Vietnam_Pro } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || "PHUONG NHI KIDS";

// Toàn bộ site phụ thuộc dữ liệu sống (tồn kho, giỏ hàng, đơn hàng) nên luôn
// render động, không cache tĩnh lúc build — tránh phải kết nối DB khi build.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: `${shopName} — Thời trang trẻ em cao cấp`,
    template: `%s | ${shopName}`,
  },
  description:
    "PHUONG NHI KIDS — Thời trang trẻ em từ 1 đến 16 tuổi. Chất liệu an toàn cho da bé, kiểu dáng xinh xắn, cập nhật xu hướng mỗi mùa.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${baloo.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
