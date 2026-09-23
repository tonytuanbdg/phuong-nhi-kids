# PHUONG NHI KIDS — Website thời trang trẻ em

Website thương mại điện tử cho shop thời trang trẻ em **PHUONG NHI KIDS**, xây dựng bằng **Next.js 16** (App Router, Node.js server), **Prisma ORM** + **MySQL**, có giỏ hàng, đặt hàng COD, và trang quản trị (admin) đầy đủ để tự quản lý sản phẩm/đơn hàng.

## Công nghệ sử dụng

- **Next.js 16** (React 19, Turbopack) — server-rendered, SEO tốt
- **Prisma 7** + **MySQL** (qua driver adapter `@prisma/adapter-mariadb`, tương thích chuẩn MySQL)
- **NextAuth v5** — đăng nhập trang quản trị bằng email/mật khẩu
- **Tailwind CSS v4** — thiết kế token hoá (màu sắc, font trong `src/app/globals.css`)
- **Zustand** — giỏ hàng phía client, lưu tạm ở `localStorage`
- **React Hook Form + Zod** — validate form thanh toán
- Font: **Baloo 2** (tiêu đề) + **Be Vietnam Pro** (nội dung) — hỗ trợ tiếng Việt đầy đủ

## Cấu trúc thư mục chính

```
prisma/schema.prisma        Schema database (Category, Product, Order, AdminUser, ...)
prisma/seed.ts               Dữ liệu mẫu (danh mục, sản phẩm, tài khoản admin)
prisma7.config.ts            Cấu hình Prisma CLI (đọc DATABASE_URL từ .env)
src/app/(shop)/              Toàn bộ trang khách hàng (trang chủ, danh mục, sản phẩm, giỏ hàng, thanh toán...)
src/app/admin/               Trang quản trị (bảo vệ bằng đăng nhập)
src/actions/                 Server Actions (đặt hàng, CRUD sản phẩm/danh mục/đơn hàng)
src/lib/                     Prisma client, cấu hình auth, các hàm dùng chung
src/components/site/         Component giao diện khách hàng
src/components/admin/        Component giao diện quản trị
src/proxy.ts                 Bảo vệ route /admin (yêu cầu đăng nhập)
```

Ảnh sản phẩm hiện đang dùng **minh hoạ SVG placeholder** theo màu thương hiệu (component `PlaceholderArt`). Khi có ảnh sản phẩm thật, xem mục [Thay ảnh thật](#thay-ảnh-sản-phẩm-thật) bên dưới.

## 1. Chạy thử trên máy (local)

### Yêu cầu
- Node.js ≥ 20.9
- MySQL server (có thể cài XAMPP/Laragon trên Windows, hoặc dùng MySQL của Hostinger nếu đã có)

### Các bước

```bash
npm install
cp .env.example .env
```

Mở `.env` và điền `DATABASE_URL` trỏ tới MySQL của bạn (lưu ý dùng tiền tố `mariadb://` thay vì `mysql://` — driver này tương thích hoàn toàn với MySQL):

```
DATABASE_URL="mariadb://root:matkhau@localhost:3306/phuong_nhi_kids"
```

Tạo bảng và nạp dữ liệu mẫu:

```bash
npm run db:push
npm run db:seed
```

Chạy server phát triển:

```bash
npm run dev
```

Mở http://localhost:3000 — trang khách hàng. Trang quản trị: http://localhost:3000/admin

**Tài khoản admin mặc định (sau khi seed):**
- Email: `admin@phuongnhikids.vn`
- Mật khẩu: `PhuongNhi@123`

> Đổi `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` trong `.env` trước khi chạy seed nếu muốn tài khoản khác. **Nhớ đổi mật khẩu admin trước khi đưa website thật ra công chúng.**

## 2. Đưa code lên GitHub

```bash
git init
git add .
git commit -m "Khoi tao website PHUONG NHI KIDS"
git branch -M main
git remote add origin <URL_REPO_GITHUB_CUA_BAN>
git push -u origin main
```

## 3. Deploy lên Hostinger

Hostinger hỗ trợ chạy ứng dụng Node.js qua **hPanel → Advanced → Node.js** (gói Business trở lên hoặc VPS). Các bước:

### 3.1. Tạo database MySQL trên Hostinger
1. Vào **hPanel → Databases → MySQL Databases**
2. Tạo database mới (vd: `u123456789_phuongnhikids`) và user/mật khẩu tương ứng
3. Ghi lại: tên database, username, password, host (thường là `localhost`)

### 3.2. Tạo Node.js App
1. Vào **hPanel → Advanced → Node.js**
2. Bấm **Create Application**
   - Node.js version: **20.x** trở lên
   - Application root: thư mục chứa code (vd: `phuong-nhi-kids`)
   - Application URL: domain của bạn
   - Application startup file: `node_modules/next/dist/bin/next` (hoặc dùng script `npm start`, xem bên dưới)
3. Kết nối repo GitHub (hoặc dùng Git để pull code vào Application root qua SSH)

### 3.3. Cấu hình biến môi trường
Trong phần **Environment Variables** của Node.js App trên hPanel, thêm toàn bộ biến trong `.env.example`, ví dụ:

```
DATABASE_URL=mariadb://u123456789_dbuser:matkhau@localhost:3306/u123456789_phuongnhikids
AUTH_SECRET=<chuoi-ngau-nhien-that-dai>
NEXTAUTH_URL=https://tenmien-cua-ban.vn
NEXT_PUBLIC_SITE_URL=https://tenmien-cua-ban.vn
NEXT_PUBLIC_SHOP_NAME=PHUONG NHI KIDS
NEXT_PUBLIC_SHOP_PHONE=...
NEXT_PUBLIC_SHOP_ZALO=...
NEXT_PUBLIC_SHOP_ADDRESS=...
NEXT_PUBLIC_SHOP_FACEBOOK=...
```

Tạo `AUTH_SECRET` an toàn bằng lệnh (chạy trên máy bạn):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3.4. Cài đặt, build và khởi tạo database
Qua **SSH** hoặc **Terminal** trong hPanel, vào thư mục app rồi chạy:

```bash
npm install
npm run db:push        # tạo bảng theo schema
npm run db:seed        # nạp danh mục + sản phẩm mẫu + tài khoản admin
npm run build           # build production
```

### 3.5. Khởi động ứng dụng
- Script start: `npm start` (đã cấu hình sẵn trong `package.json`, chạy `next start`)
- Trong hPanel Node.js App, đặt **Startup file** trỏ đúng lệnh khởi động, hoặc dùng nút **Restart** sau khi build xong — hPanel sẽ tự chạy `npm start` theo cấu hình ứng dụng.
- Next.js sẽ tự lắng nghe theo biến môi trường `PORT` mà Hostinger cấp — không cần chỉnh gì thêm.

### 3.6. Trỏ tên miền + SSL
1. Nếu domain mua ngoài Hostinger: trỏ nameserver hoặc bản ghi A/CNAME về Hostinger theo hướng dẫn trong hPanel
2. Vào **hPanel → SSL** để bật SSL miễn phí (Let's Encrypt) cho domain

Tham khảo thêm hướng dẫn chính thức: https://github.com/hostinger/deploy-nextjs

## 4. Cập nhật nội dung sau khi lên site

### Thay ảnh sản phẩm thật
Hiện tại toàn bộ ảnh là minh hoạ SVG (component `src/components/site/placeholder-art.tsx`). Khi có ảnh thật:
1. Upload ảnh vào `public/images/products/` (tạo thư mục nếu chưa có)
2. Trong trang quản trị (`/admin/products/[id]`), phần quản lý ảnh sẽ cần bổ sung thêm (hiện tại MVP chưa có upload ảnh qua giao diện — có thể thêm bảng `ProductImage` đã có sẵn trong schema, chỉ cần nối thêm UI upload)
3. Hoặc đơn giản nhất: cung cấp danh sách ảnh + tên sản phẩm tương ứng, sẽ được import thẳng vào database qua script

### Đổi logo, màu thương hiệu, font
- Màu sắc: sửa các biến `--color-primary`, `--color-secondary`, `--color-accent`... trong `src/app/globals.css`
- Font: đổi `Baloo_2` / `Be_Vietnam_Pro` trong `src/app/layout.tsx` sang font thương hiệu (đảm bảo font hỗ trợ tiếng Việt — subset `vietnamese`)
- Logo: hiện đang dùng chữ "PN" trong vòng tròn (`src/components/site/site-header.tsx`, `site-footer.tsx`) — thay bằng ảnh logo thật khi có

### Quản lý sản phẩm / đơn hàng hằng ngày
Đăng nhập `/admin` để:
- Thêm/sửa/xoá sản phẩm, quản lý tồn kho theo từng size/màu
- Thêm/sửa danh mục
- Xem và cập nhật trạng thái đơn hàng (Chờ xác nhận → Đã xác nhận → Đang giao → Hoàn tất)

## 5. Ghi chú kỹ thuật quan trọng

- **Thanh toán hiện tại: COD** (thanh toán khi nhận hàng). Khi cần thêm VNPay/MoMo/ZaloPay, tích hợp thêm ở `src/actions/checkout.ts`.
- **Prisma 7** yêu cầu driver adapter thay vì đọc `DATABASE_URL` ngầm định như trước — cấu hình đã có sẵn ở `src/lib/prisma.ts`, không cần chỉnh khi đổi thông tin kết nối, chỉ cần sửa `DATABASE_URL` trong `.env`.
- Toàn bộ trang được render động (`force-dynamic`) vì dữ liệu tồn kho/giỏ hàng/đơn hàng cần luôn mới — phù hợp chạy trên Node.js server (không dùng static export).
