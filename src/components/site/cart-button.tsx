"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore, cartCount } from "@/lib/cart-store";

export function CartButton() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-mount flag to avoid SSR/CSR hydration mismatch for persisted zustand state
  useEffect(() => setMounted(true), []);

  const count = mounted ? cartCount(items) : 0;

  return (
    <button
      onClick={openCart}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 hover:bg-muted hover:text-primary"
      aria-label="Giỏ hàng"
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
