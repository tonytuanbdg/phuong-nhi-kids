import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "@/actions/admin-products";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Thêm sản phẩm mới</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Điền thông tin sản phẩm và các biến thể kích cỡ/màu sắc.
      </p>

      <div className="mt-6 max-w-3xl rounded-2xl border border-border bg-card p-6">
        <ProductForm action={createProduct} categories={categories} submitLabel="Tạo sản phẩm" />
      </div>
    </div>
  );
}
