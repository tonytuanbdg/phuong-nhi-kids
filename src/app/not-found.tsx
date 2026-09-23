import Link from "next/link";
import { PlaceholderArt } from "@/components/site/placeholder-art";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
        <PlaceholderArt kind="phu-kien" tone="sun" className="h-32 w-32 rounded-full" />
        <h1 className="font-heading text-3xl font-bold">Không tìm thấy trang</h1>
        <p className="max-w-sm text-muted-foreground">
          Trang bạn tìm không tồn tại hoặc đã được di chuyển. Cùng quay lại mua
          sắm những bộ đồ xinh xắn cho bé nhé!
        </p>
        <Link href="/">
          <Button size="lg">Về trang chủ</Button>
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
