import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatVND } from "@/lib/format";
import { OrderStatusSelect } from "@/components/admin/order-status-select";

export default async function AdminOrderDetailPage({
  params,
}: PageProps<"/admin/orders/[id]">) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <div className="max-w-3xl">
      <Link href="/admin/orders" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách đơn hàng
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Đơn hàng {order.orderCode}</h1>
        <OrderStatusSelect orderId={order.id} status={order.status} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Thông tin khách hàng
          </h2>
          <dl className="mt-3 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Họ tên</dt>
              <dd className="font-medium">{order.customerName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Điện thoại</dt>
              <dd className="font-medium">{order.phone}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Địa chỉ</dt>
              <dd className="mt-1 font-medium">{order.address}</dd>
            </div>
            {order.note && (
              <div>
                <dt className="text-muted-foreground">Ghi chú</dt>
                <dd className="mt-1 font-medium">{order.note}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Thanh toán
          </h2>
          <dl className="mt-3 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Phương thức</dt>
              <dd className="font-medium">{order.paymentMethod}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tạm tính</dt>
              <dd className="font-medium">{formatVND(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Phí vận chuyển</dt>
              <dd className="font-medium">{formatVND(order.shippingFee)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <dt>Tổng cộng</dt>
              <dd className="text-primary">{formatVND(order.total)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-5 py-3">Sản phẩm</th>
              <th className="px-5 py-3">Phân loại</th>
              <th className="px-5 py-3">Đơn giá</th>
              <th className="px-5 py-3">SL</th>
              <th className="px-5 py-3">Thành tiền</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-3 font-medium">{item.productName}</td>
                <td className="px-5 py-3 text-muted-foreground">{item.variantLabel}</td>
                <td className="px-5 py-3">{formatVND(item.unitPrice)}</td>
                <td className="px-5 py-3">{item.quantity}</td>
                <td className="px-5 py-3 font-semibold">{formatVND(item.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
