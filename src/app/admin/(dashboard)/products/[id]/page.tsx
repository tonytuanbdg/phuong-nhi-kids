import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";
import { VariantsManager } from "@/components/admin/variants-manager";
import { updateProduct } from "@/actions/admin-products";

export default async function EditProductPage({
  params,
}: PageProps<"/admin/products/[id]">) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { variants: { orderBy: { size: "asc" } } } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, product.id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Chỉnh sửa sản phẩm</h1>
        <p className="mt-1 text-sm text-muted-foreground">{product.name}</p>
      </div>

      <div className="max-w-3xl rounded-2xl border border-border bg-card p-6">
        <ProductForm action={boundUpdate} categories={categories} defaultValues={product} submitLabel="Lưu thay đổi" />
      </div>

      <div className="max-w-3xl">
        <VariantsManager productId={product.id} variants={product.variants} />
      </div>
    </div>
  );
}
