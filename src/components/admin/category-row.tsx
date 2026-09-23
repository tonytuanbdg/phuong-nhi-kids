"use client";

import { useActionState, useState, useTransition } from "react";
import { toast } from "sonner";
import { Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryFormFields } from "@/components/admin/category-form-fields";
import { updateCategory, deleteCategory, type CategoryActionState } from "@/actions/admin-categories";
import type { Category } from "@/generated/prisma/client";

export function CategoryRow({ category }: { category: Category }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const boundUpdate = updateCategory.bind(null, category.id);
  const [state, formAction, isSubmitting] = useActionState<CategoryActionState, FormData>(
    boundUpdate,
    null
  );

  function handleDelete() {
    if (!confirm(`Xóa danh mục "${category.name}"?`)) return;
    startTransition(async () => {
      try {
        await deleteCategory(category.id);
        toast.success("Đã xóa danh mục");
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Không thể xóa danh mục");
      }
    });
  }

  if (editing) {
    return (
      <tr>
        <td colSpan={4} className="bg-muted/40 px-5 py-4">
          <form action={formAction} className="flex flex-col gap-3">
            {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
            <CategoryFormFields defaultValues={category} />
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={isSubmitting}>
                Lưu thay đổi
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => setEditing(false)}>
                <X className="h-3.5 w-3.5" /> Hủy
              </Button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className="px-5 py-3 font-semibold">{category.name}</td>
      <td className="px-5 py-3 text-muted-foreground">/{category.slug}</td>
      <td className="px-5 py-3">{category.sortOrder}</td>
      <td className="px-5 py-3 text-right">
        <button
          onClick={() => setEditing(true)}
          className="mr-3 inline-flex items-center gap-1 text-xs font-medium text-secondary hover:underline"
        >
          <Pencil className="h-3.5 w-3.5" /> Sửa
        </button>
        <button
          onClick={handleDelete}
          disabled={pending}
          className="inline-flex items-center gap-1 text-xs font-medium text-destructive hover:underline disabled:opacity-50"
        >
          <Trash2 className="h-3.5 w-3.5" /> Xóa
        </button>
      </td>
    </tr>
  );
}
