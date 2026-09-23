"use server";

import { prisma } from "@/lib/prisma";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations";
import { generateOrderCode } from "@/lib/format";

const FREE_SHIPPING_THRESHOLD = 500_000;
const SHIPPING_FEE = 30_000;

type CheckoutResult =
  | { success: true; orderCode: string }
  | { success: false; error: string };

export async function createOrder(input: CheckoutInput): Promise<CheckoutResult> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" };
  }
  const data = parsed.data;

  const variantIds = data.items.map((i) => i.variantId);
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: variantIds } },
    include: { product: true },
  });

  if (variants.length !== variantIds.length) {
    return { success: false, error: "Một số sản phẩm trong giỏ hàng không còn tồn tại" };
  }

  const lineItems = data.items.map((item) => {
    const variant = variants.find((v) => v.id === item.variantId)!;
    if (variant.stock < item.quantity) {
      throw new Error(`"${variant.product.name}" (${variant.size}/${variant.color}) chỉ còn ${variant.stock} sản phẩm`);
    }
    const unitPrice = variant.product.basePrice;
    return {
      productId: variant.productId,
      variantId: variant.id,
      productName: variant.product.name,
      variantLabel: `${variant.size} / ${variant.color}`,
      unitPrice,
      quantity: item.quantity,
      lineTotal: unitPrice * item.quantity,
    };
  });

  const subtotal = lineItems.reduce((sum, i) => sum + i.lineTotal, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;
  const orderCode = generateOrderCode();

  try {
    await prisma.$transaction(async (tx) => {
      await tx.order.create({
        data: {
          orderCode,
          customerName: data.customerName,
          phone: data.phone,
          address: data.address,
          note: data.note || null,
          subtotal,
          shippingFee,
          total,
          items: { create: lineItems },
        },
      });

      for (const item of data.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo đơn hàng";
    return { success: false, error: message };
  }

  return { success: true, orderCode };
}
