"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productFormSchema } from "@/lib/validations";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
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

export type ProductActionState = { error?: string } | null;

export async function createProduct(
  _prev: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  await requireAdmin();

  const raw = {
    name: String(formData.get("name") || ""),
    slug: slugify(String(formData.get("slug") || formData.get("name") || "")),
    description: String(formData.get("description") || ""),
    categoryId: String(formData.get("categoryId") || ""),
    gender: String(formData.get("gender") || "UNISEX"),
    ageMinMonths: Number(formData.get("ageMinMonths") || 12),
    ageMaxMonths: Number(formData.get("ageMaxMonths") || 192),
    basePrice: Number(formData.get("basePrice") || 0),
    compareAtPrice: formData.get("compareAtPrice")
      ? Number(formData.get("compareAtPrice"))
      : null,
    status: String(formData.get("status") || "PUBLISHED"),
    isFeatured: formData.get("isFeatured") === "on",
    isNewArrival: formData.get("isNewArrival") === "on",
    placeholderKind: String(formData.get("placeholderKind") || "bo-do"),
    placeholderTone: String(formData.get("placeholderTone") || "coral"),
  };

  const parsed = productFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }
  const data = parsed.data;

  const sizes = String(formData.get("sizes") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const colors = String(formData.get("colors") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const stock = Number(formData.get("stock") || 0);

  if (sizes.length === 0 || colors.length === 0) {
    return { error: "Vui lòng nhập ít nhất 1 kích cỡ và 1 màu sắc" };
  }

  const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return { error: "Slug đã tồn tại, vui lòng đổi tên hoặc slug khác" };
  }

  const variants = sizes.flatMap((size) =>
    colors.map((color) => ({
      size,
      color,
      stock,
      sku: `${data.slug}-${slugify(size)}-${slugify(color)}`,
    }))
  );

  const product = await prisma.product.create({
    data: {
      ...data,
      variants: { create: variants },
    },
  });

  revalidatePath("/admin/products");
  redirect(`/admin/products/${product.id}`);
}

export async function updateProduct(
  productId: string,
  _prev: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  await requireAdmin();

  const raw = {
    name: String(formData.get("name") || ""),
    slug: slugify(String(formData.get("slug") || formData.get("name") || "")),
    description: String(formData.get("description") || ""),
    categoryId: String(formData.get("categoryId") || ""),
    gender: String(formData.get("gender") || "UNISEX"),
    ageMinMonths: Number(formData.get("ageMinMonths") || 12),
    ageMaxMonths: Number(formData.get("ageMaxMonths") || 192),
    basePrice: Number(formData.get("basePrice") || 0),
    compareAtPrice: formData.get("compareAtPrice")
      ? Number(formData.get("compareAtPrice"))
      : null,
    status: String(formData.get("status") || "PUBLISHED"),
    isFeatured: formData.get("isFeatured") === "on",
    isNewArrival: formData.get("isNewArrival") === "on",
    placeholderKind: String(formData.get("placeholderKind") || "bo-do"),
    placeholderTone: String(formData.get("placeholderTone") || "coral"),
  };

  const parsed = productFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }

  const conflict = await prisma.product.findFirst({
    where: { slug: parsed.data.slug, NOT: { id: productId } },
  });
  if (conflict) {
    return { error: "Slug đã tồn tại, vui lòng đổi tên hoặc slug khác" };
  }

  await prisma.product.update({ where: { id: productId }, data: parsed.data });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
  return { error: undefined };
}

export async function deleteProduct(productId: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
}

export async function addVariant(productId: string, formData: FormData) {
  await requireAdmin();
  const size = String(formData.get("size") || "").trim();
  const color = String(formData.get("color") || "").trim();
  const stock = Number(formData.get("stock") || 0);
  if (!size || !color) return;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return;

  await prisma.productVariant.create({
    data: {
      productId,
      size,
      color,
      stock,
      sku: `${product.slug}-${slugify(size)}-${slugify(color)}-${Date.now().toString(36)}`,
    },
  });
  revalidatePath(`/admin/products/${productId}`);
}

export async function updateVariantStock(
  variantId: string,
  productId: string,
  formData: FormData
) {
  await requireAdmin();
  const stock = Number(formData.get("stock") || 0);
  await prisma.productVariant.update({ where: { id: variantId }, data: { stock } });
  revalidatePath(`/admin/products/${productId}`);
}

export async function deleteVariant(variantId: string, productId: string) {
  await requireAdmin();
  await prisma.productVariant.delete({ where: { id: variantId } });
  revalidatePath(`/admin/products/${productId}`);
}
