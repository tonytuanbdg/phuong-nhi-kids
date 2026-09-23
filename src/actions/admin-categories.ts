"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categoryFormSchema } from "@/lib/validations";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type CategoryActionState = { error?: string } | null;

function parseCategoryForm(formData: FormData) {
  const genderRaw = String(formData.get("gender") || "");
  return categoryFormSchema.safeParse({
    name: String(formData.get("name") || ""),
    slug: slugify(String(formData.get("slug") || formData.get("name") || "")),
    description: String(formData.get("description") || ""),
    gender: genderRaw === "BOY" || genderRaw === "GIRL" || genderRaw === "UNISEX" ? genderRaw : null,
    placeholderKind: String(formData.get("placeholderKind") || "bo-do"),
    placeholderTone: String(formData.get("placeholderTone") || "coral"),
    sortOrder: Number(formData.get("sortOrder") || 0),
  });
}

export async function createCategory(
  _prev: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  await requireAdmin();
  const parsed = parseCategoryForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }
  const existing = await prisma.category.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) return { error: "Slug đã tồn tại" };

  await prisma.category.create({ data: parsed.data });
  revalidatePath("/admin/categories");
  revalidatePath("/");
  return null;
}

export async function updateCategory(
  categoryId: string,
  _prev: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  await requireAdmin();
  const parsed = parseCategoryForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }
  const conflict = await prisma.category.findFirst({
    where: { slug: parsed.data.slug, NOT: { id: categoryId } },
  });
  if (conflict) return { error: "Slug đã tồn tại" };

  await prisma.category.update({ where: { id: categoryId }, data: parsed.data });
  revalidatePath("/admin/categories");
  revalidatePath("/");
  return null;
}

export async function deleteCategory(categoryId: string) {
  await requireAdmin();
  const count = await prisma.product.count({ where: { categoryId } });
  if (count > 0) {
    throw new Error("Không thể xóa danh mục còn sản phẩm");
  }
  await prisma.category.delete({ where: { id: categoryId } });
  revalidatePath("/admin/categories");
  revalidatePath("/");
}
