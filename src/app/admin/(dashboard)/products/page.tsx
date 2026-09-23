import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatVND } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, variants: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Sản phẩm</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý toàn bộ sản phẩm đang bán trên website.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4" /> Thêm sản phẩm
          </Button>
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Sản phẩm</th>
              <th className="px-5 py-3">Danh mục</th>
              <th className="px-5 py-3">Giá</th>
              <th className="px-5 py-3">Tồn kho</th>
              <th className="px-5 py-3">Trạng thái</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => {
              const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
              return (
                <tr key={p.id}>
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="font-semibold hover:text-primary"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{p.category.name}</td>
                  <td className="px-5 py-3">{formatVND(p.basePrice)}</td>
                  <td className="px-5 py-3">{totalStock}</td>
                  <td className="px-5 py-3">
                    <Badge tone={p.status === "PUBLISHED" ? "mint" : "muted"}>
                      {p.status === "PUBLISHED" ? "Đang bán" : "Bản nháp"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <DeleteProductButton productId={p.id} productName={p.name} />
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                  Chưa có sản phẩm nào. Bấm &quot;Thêm sản phẩm&quot; để bắt đầu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
