"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "@/generated/prisma/client";

const VALID_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "SHIPPING",
  "COMPLETED",
  "CANCELLED",
];

export async function updateOrderStatus(orderId: string, status: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  if (!VALID_STATUSES.includes(status as OrderStatus)) {
    throw new Error("Trạng thái không hợp lệ");
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as OrderStatus },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}
