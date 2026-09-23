"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ClipboardList,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/products", label: "Sản phẩm", icon: Package },
  { href: "/admin/categories", label: "Danh mục", icon: FolderTree },
  { href: "/admin/orders", label: "Đơn hàng", icon: ClipboardList },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading font-bold text-primary-foreground">
          PN
        </span>
        <div>
          <p className="font-heading text-sm font-bold leading-tight">
            PHUONG NHI KIDS
          </p>
          <p className="text-xs text-muted-foreground">Trang quản trị</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-muted"
              )}
            >
              <Icon className="h-4.5 w-4.5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-border p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-muted"
        >
          <ExternalLink className="h-4.5 w-4.5" />
          Xem website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4.5 w-4.5" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
