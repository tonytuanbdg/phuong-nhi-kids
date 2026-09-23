"use client";

import { useActionState } from "react";
import { Input, Textarea, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Category, Product } from "@/generated/prisma/client";
import type { ProductActionState } from "@/actions/admin-products";

const PLACEHOLDER_KINDS = [
  { value: "dam", label: "Đầm" },
  { value: "vay", label: "Váy" },
  { value: "ao-thun", label: "Áo thun" },
  { value: "so-mi", label: "Áo sơ mi" },
  { value: "quan", label: "Quần" },
  { value: "ao-khoac", label: "Áo khoác" },
  { value: "bo-do", label: "Bộ đồ" },
  { value: "phu-kien", label: "Phụ kiện" },
];

const PLACEHOLDER_TONES = [
  { value: "coral", label: "San hô" },
  { value: "sky", label: "Xanh sky" },
  { value: "sun", label: "Vàng nắng" },
  { value: "mint", label: "Xanh mint" },
  { value: "pink", label: "Hồng phấn" },
];

export function ProductForm({
  action,
  categories,
  defaultValues,
  submitLabel = "Lưu sản phẩm",
}: {
  action: (state: ProductActionState, formData: FormData) => Promise<ProductActionState>;
  categories: Category[];
  defaultValues?: Product & { sizes?: string; colors?: string; stock?: number };
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state?.error && (
        <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">Tên sản phẩm</Label>
          <Input id="name" name="name" required defaultValue={defaultValues?.name} />
        </div>

        <div>
          <Label htmlFor="slug">Slug (đường dẫn URL)</Label>
          <Input id="slug" name="slug" placeholder="tu-dong-tao-tu-ten" defaultValue={defaultValues?.slug} />
        </div>

        <div>
          <Label htmlFor="categoryId">Danh mục</Label>
          <Select id="categoryId" name="categoryId" required defaultValue={defaultValues?.categoryId}>
            <option value="">-- Chọn danh mục --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="description">Mô tả sản phẩm</Label>
          <Textarea
            id="description"
            name="description"
            rows={4}
            required
            defaultValue={defaultValues?.description}
          />
        </div>

        <div>
          <Label htmlFor="gender">Giới tính</Label>
          <Select id="gender" name="gender" defaultValue={defaultValues?.gender || "UNISEX"}>
            <option value="GIRL">Bé gái</option>
            <option value="BOY">Bé trai</option>
            <option value="UNISEX">Unisex</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="status">Trạng thái</Label>
          <Select id="status" name="status" defaultValue={defaultValues?.status || "PUBLISHED"}>
            <option value="PUBLISHED">Đang bán</option>
            <option value="DRAFT">Bản nháp (ẩn)</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="ageMinMonths">Tuổi từ (tháng)</Label>
          <Input
            id="ageMinMonths"
            name="ageMinMonths"
            type="number"
            min={0}
            defaultValue={defaultValues?.ageMinMonths ?? 12}
          />
        </div>

        <div>
          <Label htmlFor="ageMaxMonths">Tuổi đến (tháng)</Label>
          <Input
            id="ageMaxMonths"
            name="ageMaxMonths"
            type="number"
            min={1}
            defaultValue={defaultValues?.ageMaxMonths ?? 192}
          />
        </div>

        <div>
          <Label htmlFor="basePrice">Giá bán (đ)</Label>
          <Input
            id="basePrice"
            name="basePrice"
            type="number"
            min={0}
            required
            defaultValue={defaultValues?.basePrice}
          />
        </div>

        <div>
          <Label htmlFor="compareAtPrice">Giá gốc (không bắt buộc, để hiện giảm giá)</Label>
          <Input
            id="compareAtPrice"
            name="compareAtPrice"
            type="number"
            min={0}
            defaultValue={defaultValues?.compareAtPrice ?? undefined}
          />
        </div>

        <div>
          <Label htmlFor="placeholderKind">Kiểu minh họa ảnh</Label>
          <Select
            id="placeholderKind"
            name="placeholderKind"
            defaultValue={defaultValues?.placeholderKind || "bo-do"}
          >
            {PLACEHOLDER_KINDS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="placeholderTone">Tông màu minh họa</Label>
          <Select
            id="placeholderTone"
            name="placeholderTone"
            defaultValue={defaultValues?.placeholderTone || "coral"}
          >
            {PLACEHOLDER_TONES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-6 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={defaultValues?.isFeatured}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            Sản phẩm nổi bật
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="isNewArrival"
              defaultChecked={defaultValues?.isNewArrival}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            Hàng mới về
          </label>
        </div>

        {!defaultValues && (
          <>
            <div className="sm:col-span-2 rounded-xl border border-dashed border-border p-4">
              <p className="mb-3 text-sm font-semibold">
                Kích cỡ &amp; màu sắc (sẽ tạo tự động các biến thể)
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="sizes">Kích cỡ (cách nhau bởi dấu phẩy)</Label>
                  <Input id="sizes" name="sizes" placeholder="90cm, 100cm, 110cm" required />
                </div>
                <div>
                  <Label htmlFor="colors">Màu sắc (cách nhau bởi dấu phẩy)</Label>
                  <Input id="colors" name="colors" placeholder="Hồng, Xanh" required />
                </div>
                <div>
                  <Label htmlFor="stock">Tồn kho mỗi biến thể</Label>
                  <Input id="stock" name="stock" type="number" min={0} defaultValue={20} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Đang lưu..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
