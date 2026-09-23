import { Input, Textarea, Label, Select } from "@/components/ui/input";
import type { Category } from "@/generated/prisma/client";

const PLACEHOLDER_KINDS = [
  "dam",
  "vay",
  "ao-thun",
  "so-mi",
  "quan",
  "ao-khoac",
  "bo-do",
  "phu-kien",
];
const PLACEHOLDER_TONES = ["coral", "sky", "sun", "mint", "pink"];

export function CategoryFormFields({ defaultValues }: { defaultValues?: Category }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label>Tên danh mục</Label>
        <Input name="name" required defaultValue={defaultValues?.name} />
      </div>
      <div>
        <Label>Slug</Label>
        <Input name="slug" placeholder="tu-dong-tao" defaultValue={defaultValues?.slug} />
      </div>
      <div className="sm:col-span-2">
        <Label>Mô tả</Label>
        <Textarea name="description" rows={2} defaultValue={defaultValues?.description ?? ""} />
      </div>
      <div>
        <Label>Giới tính</Label>
        <Select name="gender" defaultValue={defaultValues?.gender ?? ""}>
          <option value="">Tất cả</option>
          <option value="GIRL">Bé gái</option>
          <option value="BOY">Bé trai</option>
          <option value="UNISEX">Unisex</option>
        </Select>
      </div>
      <div>
        <Label>Thứ tự hiển thị</Label>
        <Input name="sortOrder" type="number" defaultValue={defaultValues?.sortOrder ?? 0} />
      </div>
      <div>
        <Label>Kiểu minh họa</Label>
        <Select name="placeholderKind" defaultValue={defaultValues?.placeholderKind || "bo-do"}>
          {PLACEHOLDER_KINDS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Tông màu</Label>
        <Select name="placeholderTone" defaultValue={defaultValues?.placeholderTone || "coral"}>
          {PLACEHOLDER_TONES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
