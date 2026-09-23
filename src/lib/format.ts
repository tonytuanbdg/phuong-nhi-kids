export function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ageLabel(minMonths: number, maxMonths: number): string {
  const toYears = (m: number) => Math.round((m / 12) * 10) / 10;
  const min = toYears(minMonths);
  const max = toYears(maxMonths);
  if (min < 1 && max <= 3) {
    return `${minMonths}-${maxMonths} tháng`;
  }
  return `${min}-${max} tuổi`;
}

export function genderLabel(gender: "BOY" | "GIRL" | "UNISEX"): string {
  switch (gender) {
    case "BOY":
      return "Bé trai";
    case "GIRL":
      return "Bé gái";
    default:
      return "Unisex";
  }
}

export function orderStatusLabel(
  status: "PENDING" | "CONFIRMED" | "SHIPPING" | "COMPLETED" | "CANCELLED"
): string {
  switch (status) {
    case "PENDING":
      return "Chờ xác nhận";
    case "CONFIRMED":
      return "Đã xác nhận";
    case "SHIPPING":
      return "Đang giao";
    case "COMPLETED":
      return "Hoàn tất";
    case "CANCELLED":
      return "Đã hủy";
  }
}

export function generateOrderCode(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PNK${y}${m}${d}${rand}`;
}
