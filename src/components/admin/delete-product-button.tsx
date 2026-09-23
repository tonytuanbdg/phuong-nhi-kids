"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProduct } from "@/actions/admin-products";

export function DeleteProductButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Xóa sản phẩm "${productName}"? Hành động này không thể hoàn tác.`)) {
      return;
    }
    startTransition(async () => {
      try {
        await deleteProduct(productId);
        toast.success("Đã xóa sản phẩm");
      } catch {
        toast.error("Không thể xóa sản phẩm");
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" /> Xóa
    </button>
  );
}
