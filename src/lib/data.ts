import { prisma } from "@/lib/prisma";
import type { Gender } from "@/generated/prisma/client";

const productListSelect = {
  id: true,
  name: true,
  slug: true,
  basePrice: true,
  compareAtPrice: true,
  gender: true,
  isNewArrival: true,
  isFeatured: true,
  placeholderKind: true,
  placeholderTone: true,
  images: { orderBy: { sortOrder: "asc" as const }, take: 1 },
  category: { select: { name: true, slug: true } },
} satisfies import("@/generated/prisma/client").Prisma.ProductSelect;

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getFeaturedProducts(take = 8) {
  return prisma.product.findMany({
    where: { status: "PUBLISHED", isFeatured: true },
    select: productListSelect,
    orderBy: { createdAt: "desc" },
    take,
  });
}

export async function getNewArrivals(take = 8) {
  return prisma.product.findMany({
    where: { status: "PUBLISHED", isNewArrival: true },
    select: productListSelect,
    orderBy: { createdAt: "desc" },
    take,
  });
}

export type ProductFilters = {
  gender?: Gender;
  minPrice?: number;
  maxPrice?: number;
  sort?: "moi-nhat" | "gia-tang" | "gia-giam";
  page?: number;
  pageSize?: number;
};

export async function getProductsByCategory(
  categorySlug: string,
  filters: ProductFilters = {}
) {
  const { gender, minPrice, maxPrice, sort = "moi-nhat", page = 1, pageSize = 12 } =
    filters;

  const where = {
    status: "PUBLISHED" as const,
    category: { slug: categorySlug },
    ...(gender ? { gender } : {}),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          basePrice: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        }
      : {}),
  };

  const orderBy =
    sort === "gia-tang"
      ? { basePrice: "asc" as const }
      : sort === "gia-giam"
        ? { basePrice: "desc" as const }
        : { createdAt: "desc" as const };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      select: productListSelect,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ]);

  return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      variants: { orderBy: { size: "asc" } },
    },
  });
}

export async function getRelatedProducts(categoryId: string, excludeId: string, take = 4) {
  return prisma.product.findMany({
    where: { categoryId, status: "PUBLISHED", id: { not: excludeId } },
    select: productListSelect,
    take,
  });
}

export async function searchProducts(query: string, take = 20) {
  if (!query.trim()) return [];
  return prisma.product.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
      ],
    },
    select: productListSelect,
    take,
  });
}

export type ProductListItem = Awaited<ReturnType<typeof getFeaturedProducts>>[number];
