import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách đổi trả",
  description: "Chính sách đổi trả sản phẩm tại PHUONG NHI KIDS.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="container-shop py-14">
      <h1 className="font-heading text-3xl font-bold">Chính sách đổi trả</h1>
      <div className="prose-sm mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          PHUONG NHI KIDS hỗ trợ đổi sản phẩm trong vòng <strong>7 ngày</strong>{" "}
          kể từ ngày nhận hàng nếu sản phẩm không vừa size hoặc lỗi từ nhà sản
          xuất.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Sản phẩm còn nguyên tem mác, chưa qua sử dụng hoặc giặt ủi.</li>
          <li>Giữ hóa đơn/tin nhắn xác nhận đơn hàng khi đổi trả.</li>
          <li>Khách hàng chịu phí vận chuyển đổi trả trong trường hợp đổi size theo yêu cầu cá nhân.</li>
          <li>Miễn phí đổi trả nếu lỗi thuộc về shop (giao sai mẫu, sai size, lỗi vải).</li>
        </ul>
        <p>
          Vui lòng liên hệ hotline hoặc Zalo của shop tại trang{" "}
          <a href="/lien-he" className="font-semibold text-primary hover:underline">
            Liên hệ
          </a>{" "}
          để được hướng dẫn đổi trả nhanh nhất.
        </p>
      </div>
    </div>
  );
}
