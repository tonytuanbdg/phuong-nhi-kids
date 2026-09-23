import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { formatVND, orderStatusLabel } from "@/lib/format";

export default async function OrderConfirmationPage({
  params,
}: PageProps<"/don-hang/[code]">) {
  const { code } = await params;

  const order = await prisma.order.findUnique({
    where: { orderCode: code },
    include: { items: true },
  });

  if (!order) notFound();

  const phone = process.env.NEXT_PUBLIC_SHOP_PHONE || "0900 000 000";

  return (
    <div className="container-shop py-14">
      <div className="mx-auto max-w-2xl rounded-3xl border border-border p-8 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-mint" />
        <h1 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
          Đặt hàng thành công!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Cảm ơn <strong>{order.customerName}</strong> đã tin chọn PHUONG NHI
          KIDS. Mã đơn hàng của bạn là:
        </p>
        <p className="mt-2 font-heading text-xl font-bold text-primary">
          {order.orderCode}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Trạng thái hiện tại: <strong>{orderStatusLabel(order.status)}</strong>.
          Chúng tôi sẽ gọi điện xác nhận đơn hàng trong thời gian sớm nhất.
        </p>

        <div className="mt-6 rounded-2xl bg-muted p-5 text-left">
          <ul className="flex flex-col gap-2 divide-y divide-border">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between pt-2 text-sm first:pt-0">
                <span>
                  {item.productName} ({item.variantLabel}) × {item.quantity}
                </span>
                <span className="font-medium">{formatVND(item.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm">
            <span>Phí vận chuyển</span>
            <span>{order.shippingFee === 0 ? "Miễn phí" : formatVND(order.shippingFee)}</span>
          </div>
          <div className="mt-1 flex justify-between text-base font-bold">
            <span>Tổng cộng</span>
            <span className="text-primary">{formatVND(order.total)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button variant="outline">Tiếp tục mua sắm</Button>
          </Link>
          <a href={`tel:${phone.replace(/\s/g, "")}`}>
            <Button>
              <Phone className="h-4 w-4" /> Gọi shop: {phone}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
