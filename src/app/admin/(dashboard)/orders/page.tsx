import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatVND, orderStatusLabel } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/generated/prisma/client";

const STATUS_TONE: Record<OrderStatus, "primary" | "secondary" | "mint" | "muted"> = {
  PENDING: "primary",
  CONFIRMED: "secondary",
  SHIPPING: "secondary",
  COMPLETED: "mint",
  CANCELLED: "muted",
};

export default async function AdminOrdersPage({
  searchParams,
}: PageProps<"/admin/orders">) {
  const sp = await searchParams;
  const statusFilter = typeof sp.trang_thai === "string" ? sp.trang_thai : undefined;

  const orders = await prisma.order.findMany({
    where: statusFilter ? { status: statusFilter as OrderStatus } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const statuses: OrderStatus[] = ["PENDING", "CONFIRMED", "SHIPPING", "COMPLETED", "CANCELLED"];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Đơn hàng</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Theo dõi và xử lý đơn hàng của khách.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/admin/orders"
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${!statusFilter ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70"}`}
        >
          Tất cả
        </Link>
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?trang_thai=${s}`}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70"}`}
          >
            {orderStatusLabel(s)}
          </Link>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Mã đơn</th>
              <th className="px-5 py-3">Khách hàng</th>
              <th className="px-5 py-3">SĐT</th>
              <th className="px-5 py-3">Tổng tiền</th>
              <th className="px-5 py-3">Trạng thái</th>
              <th className="px-5 py-3">Ngày đặt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-5 py-3">
                  <Link href={`/admin/orders/${o.id}`} className="font-semibold text-primary hover:underline">
                    {o.orderCode}
                  </Link>
                </td>
                <td className="px-5 py-3">{o.customerName}</td>
                <td className="px-5 py-3">{o.phone}</td>
                <td className="px-5 py-3">{formatVND(o.total)}</td>
                <td className="px-5 py-3">
                  <Badge tone={STATUS_TONE[o.status]}>{orderStatusLabel(o.status)}</Badge>
                </td>
                <td className="px-5 py-3 text-muted-foreground">
                  {o.createdAt.toLocaleDateString("vi-VN")}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                  Không có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
