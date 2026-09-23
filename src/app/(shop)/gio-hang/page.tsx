"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore, cartSubtotal } from "@/lib/cart-store";
import { PlaceholderArt, type PlaceholderKind, type PlaceholderTone } from "@/components/site/placeholder-art";
import { Button } from "@/components/ui/button";
import { formatVND } from "@/lib/format";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-mount flag to avoid SSR/CSR hydration mismatch for persisted zustand state
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = cartSubtotal(items);

  return (
    <div className="container-shop py-10">
      <h1 className="font-heading text-3xl font-bold">Giỏ hàng của bạn</h1>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border py-20 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          <p className="font-medium">Giỏ hàng đang trống</p>
          <Link href="/">
            <Button variant="primary">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li
                key={item.variantId}
                className="flex gap-4 rounded-2xl border border-border p-4"
              >
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border">
                  <PlaceholderArt
                    kind={item.placeholderKind as PlaceholderKind}
                    tone={item.placeholderTone as PlaceholderTone}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/san-pham/${item.slug}`}
                      className="font-semibold hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Xóa sản phẩm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.size} / {item.color}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-1 rounded-full border border-border">
                      <button
                        onClick={() => setQuantity(item.variantId, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
                        aria-label="Giảm số lượng"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(item.variantId, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted disabled:opacity-40"
                        aria-label="Tăng số lượng"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-heading font-bold text-primary">
                      {formatVND(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit rounded-2xl border border-border p-5">
            <h2 className="mb-4 font-heading text-lg font-bold">Tóm tắt đơn hàng</h2>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tạm tính</span>
              <span className="font-semibold">{formatVND(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Phí vận chuyển sẽ được tính ở bước tiếp theo.
            </p>
            <Link href="/thanh-toan">
              <Button size="lg" className="mt-5 w-full">
                Tiến hành thanh toán
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
