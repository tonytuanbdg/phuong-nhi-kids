import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hướng dẫn chọn size",
  description: "Bảng size quần áo trẻ em PHUONG NHI KIDS theo tuổi và chiều cao.",
};

const sizeTable = [
  { size: "1-2 tuổi", height: "80-90cm", weight: "10-13kg" },
  { size: "3-4 tuổi", height: "91-104cm", weight: "14-17kg" },
  { size: "5-6 tuổi", height: "105-116cm", weight: "18-21kg" },
  { size: "7-8 tuổi", height: "117-128cm", weight: "22-27kg" },
  { size: "9-10 tuổi", height: "129-140cm", weight: "28-33kg" },
  { size: "11-12 tuổi", height: "141-152cm", weight: "34-40kg" },
  { size: "13-16 tuổi", height: "153-165cm", weight: "41-55kg" },
];

export default function SizeGuidePage() {
  return (
    <div className="container-shop py-14">
      <h1 className="font-heading text-3xl font-bold">Hướng dẫn chọn size</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Bảng size dưới đây mang tính tham khảo. Nếu bé đang trong giai đoạn
        phát triển nhanh hoặc có số đo đặc biệt, ba mẹ nên chọn size lớn hơn
        một chút hoặc liên hệ shop để được tư vấn chi tiết.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Chiều cao</th>
              <th className="px-4 py-3">Cân nặng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sizeTable.map((row) => (
              <tr key={row.size}>
                <td className="px-4 py-3 font-semibold">{row.size}</td>
                <td className="px-4 py-3">{row.height}</td>
                <td className="px-4 py-3">{row.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
