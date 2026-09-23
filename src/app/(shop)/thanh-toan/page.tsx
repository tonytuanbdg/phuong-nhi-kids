"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCartStore, cartSubtotal } from "@/lib/cart-store";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations";
import { createOrder } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { formatVND } from "@/lib/format";
import { PlaceholderArt, type PlaceholderKind, type PlaceholderTone } from "@/components/site/placeholder-art";

const FREE_SHIPPING_THRESHOLD = 500_000;
const SHIPPING_FEE = 30_000;

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Omit<CheckoutInput, "items">>({
    resolver: zodResolver(checkoutSchema.omit({ items: true })),
  });

  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-mount flag to avoid SSR/CSR hydration mismatch for persisted zustand state
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = cartSubtotal(items);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  async function onSubmit(values: Omit<CheckoutInput, "items">) {
    if (items.length === 0) {
      toast.error("Giỏ hàng đang trống");
      return;
    }
    const result = await createOrder({
      ...values,
      items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
    });
    if (result.success) {
      clear();
      router.push(`/don-hang/${result.orderCode}`);
    } else {
      toast.error(result.error);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-shop py-20 text-center">
        <p className="text-lg font-medium">Giỏ hàng đang trống</p>
        <Link href="/" className="mt-4 inline-block">
          <Button>Tiếp tục mua sắm</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-shop py-10">
      <h1 className="font-heading text-3xl font-bold">Thanh toán</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"
      >
        <div className="flex flex-col gap-5 rounded-2xl border border-border p-6">
          <h2 className="font-heading text-lg font-bold">Thông tin giao hàng</h2>

          <div>
            <Label htmlFor="customerName">Họ và tên người nhận</Label>
            <Input id="customerName" placeholder="Nguyễn Thị A" {...register("customerName")} />
            {errors.customerName && (
              <p className="mt-1 text-xs text-destructive">{errors.customerName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" placeholder="0900 000 000" {...register("phone")} />
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Địa chỉ nhận hàng</Label>
            <Textarea
              id="address"
              rows={3}
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
              {...register("address")}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="note">Ghi chú (không bắt buộc)</Label>
            <Textarea id="note" rows={2} placeholder="Ví dụ: giao giờ hành chính" {...register("note")} />
          </div>

          <div className="rounded-xl bg-muted p-4 text-sm">
            <p className="font-semibold">Phương thức thanh toán</p>
            <p className="mt-1 text-muted-foreground">
              Thanh toán khi nhận hàng (COD) — bạn kiểm tra hàng và thanh toán trực
              tiếp cho shipper.
            </p>
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-border p-6">
          <h2 className="mb-4 font-heading text-lg font-bold">Đơn hàng của bạn</h2>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.variantId} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border">
                  <PlaceholderArt
                    kind={item.placeholderKind as PlaceholderKind}
                    tone={item.placeholderTone as PlaceholderTone}
                    className="h-full w-full"
                  />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 text-sm">
                  <p className="line-clamp-1 font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.size} / {item.color}
                  </p>
                </div>
                <span className="text-sm font-semibold">
                  {formatVND(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tạm tính</span>
              <span>{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phí vận chuyển</span>
              <span>{shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <span>Tổng cộng</span>
              <span className="text-primary">{formatVND(total)}</span>
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
          </Button>
        </div>
      </form>
    </div>
  );
}
