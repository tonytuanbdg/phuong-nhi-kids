"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Select } from "@/components/ui/input";
import { updateOrderStatus } from "@/actions/admin-orders";
import { orderStatusLabel } from "@/lib/format";
import type { OrderStatus } from "@/generated/prisma/client";

const statuses: OrderStatus[] = ["PENDING", "CONFIRMED", "SHIPPING", "COMPLETED", "CANCELLED"];

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <Select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const value = e.target.value;
        startTransition(async () => {
          await updateOrderStatus(orderId, value);
          toast.success("Đã cập nhật trạng thái đơn hàng");
        });
      }}
      className="w-48"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {orderStatusLabel(s)}
        </option>
      ))}
    </Select>
  );
}
