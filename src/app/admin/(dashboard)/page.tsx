import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatVND, orderStatusLabel } from "@/lib/format";
import { Package, ClipboardList, Clock, TrendingUp } from "lucide-react";

export default async function AdminDashboardPage() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [productCount, pendingCount, monthlyOrders, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.findMany({
      where: { createdAt: { gte: startOfMonth }, status: { not: "CANCELLED" } },
      select: { total: true },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Tổng sản phẩm", value: productCount, icon: Package },
    { label: "Đơn chờ xác nhận", value: pendingCount, icon: Clock },
    { label: "Đơn tháng này", value: monthlyOrders.length, icon: ClipboardList },
    { label: "Doanh thu tháng này", value: formatVND(monthlyRevenue), icon: TrendingUp },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Tổng quan</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Chào mừng quay lại trang quản trị PHUONG NHI KIDS.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 font-heading text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-heading text-base font-bold">Đơn hàng gần đây</h2>
          <Link href="/admin/orders" className="text-sm font-semibold text-primary hover:underline">
            Xem tất cả
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Mã đơn</th>
                <th className="px-5 py-3">Khách hàng</th>
                <th className="px-5 py-3">Tổng tiền</th>
                <th className="px-5 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-semibold text-primary hover:underline"
                    >
                      {order.orderCode}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{order.customerName}</td>
                  <td className="px-5 py-3">{formatVND(order.total)}</td>
                  <td className="px-5 py-3">{orderStatusLabel(order.status)}</td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">
                    Chưa có đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
