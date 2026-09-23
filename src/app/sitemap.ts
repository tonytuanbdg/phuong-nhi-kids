import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.product.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticRoutes = [
    "",
    "/gioi-thieu",
    "/lien-he",
    "/huong-dan-chon-size",
    "/chinh-sach-doi-tra",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/danh-muc/${c.slug}`,
    lastModified: c.updatedAt,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/san-pham/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
