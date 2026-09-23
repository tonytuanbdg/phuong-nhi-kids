"use client";

import { useTransition, useRef } from "react";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addVariant, updateVariantStock, deleteVariant } from "@/actions/admin-products";
import type { ProductVariant } from "@/generated/prisma/client";

export function VariantsManager({
  productId,
  variants,
}: {
  productId: string;
  variants: ProductVariant[];
}) {
  const [pending, startTransition] = useTransition();
  const addFormRef = useRef<HTMLFormElement>(null);

  function handleStockUpdate(variantId: string, formData: FormData) {
    startTransition(async () => {
      await updateVariantStock(variantId, productId, formData);
      toast.success("Đã cập nhật tồn kho");
    });
  }

  function handleDelete(variantId: string) {
    if (!confirm("Xóa biến thể này?")) return;
    startTransition(async () => {
      await deleteVariant(variantId, productId);
      toast.success("Đã xóa biến thể");
    });
  }

  function handleAdd(formData: FormData) {
    startTransition(async () => {
      await addVariant(productId, formData);
      addFormRef.current?.reset();
      toast.success("Đã thêm biến thể");
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-heading text-lg font-bold">Kích cỡ &amp; tồn kho</h2>
      <table className="mt-4 w-full text-left text-sm">
        <thead className="text-xs uppercase text-muted-foreground">
          <tr>
            <th className="py-2">Kích cỡ</th>
            <th className="py-2">Màu sắc</th>
            <th className="py-2">SKU</th>
            <th className="py-2">Tồn kho</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {variants.map((v) => (
            <tr key={v.id}>
              <td className="py-2 pr-2 font-medium">{v.size}</td>
              <td className="py-2 pr-2">{v.color}</td>
              <td className="py-2 pr-2 text-xs text-muted-foreground">{v.sku}</td>
              <td className="py-2 pr-2">
                <form
                  action={(fd) => handleStockUpdate(v.id, fd)}
                  className="flex items-center gap-2"
                >
                  <Input
                    name="stock"
                    type="number"
                    min={0}
                    defaultValue={v.stock}
                    className="h-9 w-20"
                  />
                  <button
                    type="submit"
                    disabled={pending}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Lưu
                  </button>
                </form>
              </td>
              <td className="py-2 text-right">
                <button
                  onClick={() => handleDelete(v.id)}
                  disabled={pending}
                  className="text-destructive hover:opacity-70"
                  aria-label="Xóa biến thể"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
          {variants.length === 0 && (
            <tr>
              <td colSpan={5} className="py-4 text-center text-muted-foreground">
                Chưa có biến thể nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <form ref={addFormRef} action={handleAdd} className="mt-5 flex flex-wrap items-end gap-3 border-t border-border pt-5">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Kích cỡ</label>
          <Input name="size" placeholder="110cm" className="h-9 w-28" required />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Màu sắc</label>
          <Input name="color" placeholder="Vàng" className="h-9 w-28" required />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Tồn kho</label>
          <Input name="stock" type="number" min={0} defaultValue={20} className="h-9 w-24" />
        </div>
        <Button type="submit" size="sm" variant="outline" disabled={pending}>
          <Plus className="h-3.5 w-3.5" /> Thêm biến thể
        </Button>
      </form>
    </div>
  );
}
