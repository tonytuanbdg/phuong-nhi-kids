"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore, cartSubtotal } from "@/lib/cart-store";
import { PlaceholderArt, type PlaceholderKind, type PlaceholderTone } from "@/components/site/placeholder-art";
import { formatVND } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-mount flag to avoid SSR/CSR hydration mismatch for persisted zustand state
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const subtotal = cartSubtotal(items);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-foreground/40" onClick={closeCart} />
      <div className="relative flex h-full w-full max-w-md flex-col bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-heading text-lg font-bold">Giỏ hàng của bạn</h2>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
            aria-label="Đóng giỏ hàng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            <p className="font-medium text-foreground">Giỏ hàng đang trống</p>
            <p className="text-sm text-muted-foreground">
              Cùng chọn vài bộ đồ thật xinh cho bé nhé!
            </p>
            <Button onClick={closeCart} variant="primary" size="sm">
              Tiếp tục mua sắm
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border">
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
                          onClick={closeCart}
                          className="text-sm font-semibold leading-snug hover:text-primary"
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
                      <p className="text-xs text-muted-foreground">
                        {item.size} / {item.color}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 rounded-full border border-border">
                          <button
                            onClick={() =>
                              setQuantity(item.variantId, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                            aria-label="Giảm số lượng"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              setQuantity(item.variantId, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.maxStock}
                            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted disabled:opacity-40"
                            aria-label="Tăng số lượng"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-primary">
                          {formatVND(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-base font-semibold">
                <span>Tạm tính</span>
                <span className="text-primary">{formatVND(subtotal)}</span>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">
                Phí vận chuyển và tổng tiền sẽ được tính ở bước thanh toán.
              </p>
              <Link href="/thanh-toan" onClick={closeCart}>
                <Button variant="primary" size="lg" className="w-full">
                  Tiến hành thanh toán
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
