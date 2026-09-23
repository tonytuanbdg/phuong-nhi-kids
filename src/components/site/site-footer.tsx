import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/site/icons";

export function SiteFooter() {
  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || "PHUONG NHI KIDS";
  const phone = process.env.NEXT_PUBLIC_SHOP_PHONE || "0900 000 000";
  const address =
    process.env.NEXT_PUBLIC_SHOP_ADDRESS || "Dĩ An, Thành phố Hồ Chí Minh";
  const facebook =
    process.env.NEXT_PUBLIC_SHOP_FACEBOOK || "https://facebook.com";

  return (
    <footer className="mt-16 border-t border-border bg-muted/60">
      <div className="container-shop grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading font-bold text-primary-foreground">
              PN
            </span>
            <span className="font-heading text-lg font-bold">{shopName}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Thời trang trẻ em cho bé từ 1 đến 16 tuổi — chất liệu an toàn, kiểu
            dáng xinh xắn, đồng hành cùng ba mẹ chọn đồ đẹp cho con mỗi ngày.
          </p>
          <a
            href={facebook}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-card text-secondary shadow-sm hover:text-primary"
            aria-label="Facebook"
          >
            <FacebookIcon className="h-4 w-4" />
          </a>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-foreground">
            Danh mục
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/danh-muc/be-gai" className="hover:text-primary">
                Quần áo bé gái
              </Link>
            </li>
            <li>
              <Link href="/danh-muc/be-trai" className="hover:text-primary">
                Quần áo bé trai
              </Link>
            </li>
            <li>
              <Link href="/danh-muc/vay-dam" className="hover:text-primary">
                Váy đầm bé gái
              </Link>
            </li>
            <li>
              <Link href="/danh-muc/phu-kien" className="hover:text-primary">
                Phụ kiện
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-foreground">
            Hỗ trợ khách hàng
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/gioi-thieu" className="hover:text-primary">
                Giới thiệu shop
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="hover:text-primary">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link href="/huong-dan-chon-size" className="hover:text-primary">
                Hướng dẫn chọn size
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-doi-tra" className="hover:text-primary">
                Chính sách đổi trả
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-foreground">
            Liên hệ
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> {phone}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {shopName}. Đã đăng ký bản quyền.
      </div>
    </footer>
  );
}
