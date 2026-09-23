"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import type { getProductBySlug } from "@/lib/data";

type ProductDetail = NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>;

export function AddToCartForm({
  product,
  sizes,
  colors,
}: {
  product: ProductDetail;
  sizes: string[];
  colors: string[];
}) {
  const [size, setSize] = useState(sizes[0] ?? "");
  const [color, setColor] = useState(colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const variant = useMemo(
    () => product.variants.find((v) => v.size === size && v.color === color),
    [product.variants, size, color]
  );

  const inStock = (variant?.stock ?? 0) > 0;

  function handleAddToCart() {
    if (!variant) {
      toast.error("Vui lòng chọn size và màu sắc");
      return;
    }
    if (!inStock) {
      toast.error("Sản phẩm tạm hết hàng với lựa chọn này");
      return;
    }
    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      slug: product.slug,
      size: variant.size,
      color: variant.color,
      unitPrice: product.basePrice,
      quantity,
      imageUrl: product.images[0]?.url ?? null,
      placeholderKind: product.placeholderKind,
      placeholderTone: product.placeholderTone,
      maxStock: variant.stock,
    });
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`);
  }

  return (
    <div className="flex flex-col gap-5">
      {sizes.length > 0 && (
        <div>
          <span className="mb-2 block text-sm font-semibold">Kích cỡ</span>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  s === size
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <span className="mb-2 block text-sm font-semibold">Màu sắc</span>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  c === color
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {variant && !inStock && (
        <p className="text-sm font-medium text-destructive">
          Lựa chọn này tạm hết hàng, vui lòng chọn size/màu khác.
        </p>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-border">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center hover:bg-muted"
            aria-label="Giảm số lượng"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            onClick={() =>
              setQuantity((q) => Math.min(variant?.stock ?? 99, q + 1))
            }
            className="flex h-11 w-11 items-center justify-center hover:bg-muted"
            aria-label="Tăng số lượng"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!variant || !inStock}
        >
          <ShoppingBag className="h-4 w-4" />
          Thêm vào giỏ hàng
        </Button>
      </div>
    </div>
  );
}
