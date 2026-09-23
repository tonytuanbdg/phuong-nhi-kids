import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
  address: z.string().trim().min(10, "Vui lòng nhập địa chỉ đầy đủ"),
  note: z.string().trim().optional(),
  items: z
    .array(
      z.object({
        variantId: z.string().min(1),
        quantity: z.number().int().min(1),
      })
    )
    .min(1, "Giỏ hàng đang trống"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export const productFormSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập tên sản phẩm"),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu -"),
  description: z.string().trim().min(10, "Vui lòng nhập mô tả sản phẩm"),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  gender: z.enum(["BOY", "GIRL", "UNISEX"]),
  ageMinMonths: z.number().int().min(0),
  ageMaxMonths: z.number().int().min(1),
  basePrice: z.number().int().min(1000, "Giá phải lớn hơn 1.000đ"),
  compareAtPrice: z.number().int().min(0).optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  isFeatured: z.boolean(),
  isNewArrival: z.boolean(),
  placeholderKind: z.string(),
  placeholderTone: z.string(),
});

export const categoryFormSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập tên danh mục"),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu -"),
  description: z.string().trim().optional(),
  gender: z.enum(["BOY", "GIRL", "UNISEX"]).optional().nullable(),
  placeholderKind: z.string(),
  placeholderTone: z.string(),
  sortOrder: z.number().int(),
});
