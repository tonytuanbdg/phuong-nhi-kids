"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const genderOptions = [
  { value: "", label: "Tất cả" },
  { value: "GIRL", label: "Bé gái" },
  { value: "BOY", label: "Bé trai" },
  { value: "UNISEX", label: "Unisex" },
];

const sortOptions = [
  { value: "moi-nhat", label: "Mới nhất" },
  { value: "gia-tang", label: "Giá tăng dần" },
  { value: "gia-giam", label: "Giá giảm dần" },
];

export function CategoryFilters({
  currentGender,
  currentSort,
}: {
  currentGender?: string;
  currentSort?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("trang");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">
          Giới tính
        </h3>
        <div className="flex flex-col gap-1.5">
          {genderOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("gioi_tinh", opt.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-left text-sm font-medium transition-colors",
                (currentGender || "") === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-muted"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide">
          Sắp xếp
        </h3>
        <div className="flex flex-col gap-1.5">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("sap_xep", opt.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-left text-sm font-medium transition-colors",
                (currentSort || "moi-nhat") === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-muted"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
