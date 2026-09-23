"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryFormFields } from "@/components/admin/category-form-fields";
import { createCategory } from "@/actions/admin-categories";

export function NewCategoryForm() {
  const [state, formAction, pending] = useActionState(createCategory, null);

  return (
    <form action={formAction} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
      <h2 className="font-heading text-base font-bold">Thêm danh mục mới</h2>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <CategoryFormFields />
      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Đang lưu..." : "Thêm danh mục"}
        </Button>
      </div>
    </form>
  );
}
