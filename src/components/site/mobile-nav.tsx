"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Category } from "@/generated/prisma/client";

export function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-muted"
        aria-label="Mở menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full w-72 flex-col gap-1 bg-card p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-heading text-lg font-bold">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
                aria-label="Đóng menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/danh-muc/${cat.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
              >
                {cat.name}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            <Link
              href="/gioi-thieu"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Giới thiệu
            </Link>
            <Link
              href="/lien-he"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
