import { prisma } from "@/lib/prisma";
import { CategoryRow } from "@/components/admin/category-row";
import { NewCategoryForm } from "@/components/admin/new-category-form";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Danh mục</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quản lý danh mục hiển thị trên trang chủ và menu điều hướng.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Tên danh mục</th>
              <th className="px-5 py-3">Slug</th>
              <th className="px-5 py-3">Thứ tự</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((c) => (
              <CategoryRow key={c.id} category={c} />
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">
                  Chưa có danh mục nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="max-w-2xl">
        <NewCategoryForm />
      </div>
    </div>
  );
}
