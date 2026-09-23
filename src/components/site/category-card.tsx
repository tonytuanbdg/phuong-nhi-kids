import Link from "next/link";
import { PlaceholderArt, type PlaceholderKind, type PlaceholderTone } from "@/components/site/placeholder-art";
import type { Category } from "@/generated/prisma/client";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/danh-muc/${category.slug}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl border border-border"
    >
      <PlaceholderArt
        kind={category.placeholderKind as PlaceholderKind}
        tone={category.placeholderTone as PlaceholderTone}
        className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-foreground/0" />
      <div className="relative p-4">
        <h3 className="font-heading text-lg font-bold text-white">
          {category.name}
        </h3>
        <span className="text-xs font-medium text-white/85">Xem bộ sưu tập →</span>
      </div>
    </Link>
  );
}
