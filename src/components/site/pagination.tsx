"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("trang", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5">
      <button
        onClick={() => goTo(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted disabled:opacity-40"
        aria-label="Trang trước"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium",
            p === currentPage
              ? "bg-primary text-primary-foreground"
              : "border border-border hover:bg-muted"
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => goTo(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-muted disabled:opacity-40"
        aria-label="Trang sau"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
