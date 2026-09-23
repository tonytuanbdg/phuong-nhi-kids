import "dotenv/config";
import type { Gender } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const categories = [
  {
    name: "Quần áo bé gái",
    slug: "be-gai",
    description: "Áo thun, bộ đồ, áo sơ mi cho bé gái từ 1 đến 16 tuổi.",
    gender: "GIRL" as Gender,
    placeholderKind: "ao-thun",
    placeholderTone: "pink",
    sortOrder: 1,
  },
  {
    name: "Quần áo bé trai",
    slug: "be-trai",
    description: "Áo thun, sơ mi, quần jean cho bé trai năng động.",
    gender: "BOY" as Gender,
    placeholderKind: "so-mi",
    placeholderTone: "sky",
    sortOrder: 2,
  },
  {
    name: "Váy đầm bé gái",
    slug: "vay-dam",
    description: "Váy đầm dự tiệc, đầm xòe công chúa cho bé gái.",
    gender: "GIRL" as Gender,
    placeholderKind: "dam",
    placeholderTone: "pink",
    sortOrder: 3,
  },
  {
    name: "Phụ kiện",
    slug: "phu-kien",
    description: "Nón, tất, phụ kiện tóc xinh xắn cho bé.",
    gender: null,
    placeholderKind: "phu-kien",
    placeholderTone: "sun",
    sortOrder: 4,
  },
];

type SeedProduct = {
  name: string;
  categorySlug: string;
  gender: Gender;
  ageMinMonths: number;
  ageMaxMonths: number;
  basePrice: number;
  compareAtPrice?: number;
  description: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  placeholderKind: string;
  placeholderTone: string;
  sizes: string[];
  colors: string[];
};

const products: SeedProduct[] = [
  {
    name: "Đầm xòe công chúa hoa nhí",
    categorySlug: "vay-dam",
    gender: "GIRL",
    ageMinMonths: 24,
    ageMaxMonths: 84,
    basePrice: 285000,
    compareAtPrice: 350000,
    description:
      "Đầm xòe chất liệu voan mềm mại, họa tiết hoa nhí dễ thương, phù hợp cho bé đi tiệc, dự sinh nhật hoặc dạo phố cuối tuần.",
    isFeatured: true,
    isNewArrival: true,
    placeholderKind: "dam",
    placeholderTone: "pink",
    sizes: ["90cm", "100cm", "110cm", "120cm"],
    colors: ["Hồng", "Vàng"],
  },
  {
    name: "Đầm suông thêu hoa Free Style",
    categorySlug: "vay-dam",
    gender: "GIRL",
    ageMinMonths: 36,
    ageMaxMonths: 120,
    basePrice: 269000,
    description:
      "Đầm suông vải cotton thoáng mát, thêu hoa tinh tế, kiểu dáng rộng rãi thoải mái cho bé vui chơi cả ngày.",
    placeholderKind: "dam",
    placeholderTone: "coral",
    sizes: ["100cm", "110cm", "120cm", "130cm"],
    colors: ["Trắng", "Hồng phấn"],
  },
  {
    name: "Set váy thun đính huy hiệu 3D",
    categorySlug: "vay-dam",
    gender: "GIRL",
    ageMinMonths: 24,
    ageMaxMonths: 96,
    basePrice: 325000,
    description:
      "Set váy thun co giãn tốt, phối huy hiệu 3D ngộ nghĩnh, dễ phối đồ đi học hoặc đi chơi.",
    isNewArrival: true,
    placeholderKind: "dam",
    placeholderTone: "mint",
    sizes: ["90cm", "100cm", "110cm"],
    colors: ["Xanh mint", "Hồng"],
  },
  {
    name: "Áo sơ mi bé gái phong cách Hip Hop",
    categorySlug: "be-gai",
    gender: "GIRL",
    ageMinMonths: 60,
    ageMaxMonths: 156,
    basePrice: 259000,
    description:
      "Áo sơ mi form rộng phong cách trẻ trung, chất vải kate mềm mịn, thấm hút mồ hôi tốt.",
    placeholderKind: "so-mi",
    placeholderTone: "sun",
    sizes: ["110cm", "120cm", "130cm", "140cm"],
    colors: ["Trắng", "Xanh sky"],
  },
  {
    name: "Bộ đồ thun bé gái Veco Sweet Girl",
    categorySlug: "be-gai",
    gender: "GIRL",
    ageMinMonths: 24,
    ageMaxMonths: 84,
    basePrice: 245000,
    description:
      "Bộ đồ thun 2 món áo và quần legging, chất liệu cotton 4 chiều co giãn, mềm mại an toàn cho da bé.",
    isFeatured: true,
    placeholderKind: "bo-do",
    placeholderTone: "pink",
    sizes: ["90cm", "100cm", "110cm"],
    colors: ["Hồng", "Tím pastel"],
  },
  {
    name: "Áo khoác kaki bé gái phối nón",
    categorySlug: "be-gai",
    gender: "GIRL",
    ageMinMonths: 36,
    ageMaxMonths: 120,
    basePrice: 339000,
    description:
      "Áo khoác kaki dáng suông có mũ, giữ ấm tốt, phù hợp mặc đi học vào mùa se lạnh.",
    placeholderKind: "ao-khoac",
    placeholderTone: "sun",
    sizes: ["100cm", "110cm", "120cm", "130cm"],
    colors: ["Vàng bơ", "Be"],
  },
  {
    name: "Áo dài cách tân bé gái đón Tết",
    categorySlug: "be-gai",
    gender: "GIRL",
    ageMinMonths: 24,
    ageMaxMonths: 144,
    basePrice: 359000,
    compareAtPrice: 420000,
    description:
      "Áo dài cách tân thêu hoa văn truyền thống, vải lụa mềm rũ đẹp, thích hợp mặc Tết và các dịp lễ.",
    isFeatured: true,
    placeholderKind: "so-mi",
    placeholderTone: "pink",
    sizes: ["100cm", "110cm", "120cm", "130cm", "140cm"],
    colors: ["Đỏ", "Hồng sen"],
  },
  {
    name: "Áo thun bé trai in hình khủng long",
    categorySlug: "be-trai",
    gender: "BOY",
    ageMinMonths: 24,
    ageMaxMonths: 96,
    basePrice: 149000,
    description:
      "Áo thun cotton in hình khủng long ngộ nghĩnh, form rộng thoải mái cho bé chạy nhảy.",
    isNewArrival: true,
    placeholderKind: "ao-thun",
    placeholderTone: "mint",
    sizes: ["90cm", "100cm", "110cm", "120cm"],
    colors: ["Xanh mint", "Xám"],
  },
  {
    name: "Bộ đồ thun bé trai Sporty Boys",
    categorySlug: "be-trai",
    gender: "BOY",
    ageMinMonths: 36,
    ageMaxMonths: 144,
    basePrice: 329000,
    description:
      "Bộ đồ thể thao 2 món phối màu năng động, vải thun lạnh co giãn 4 chiều, thấm hút mồ hôi.",
    isFeatured: true,
    placeholderKind: "bo-do",
    placeholderTone: "sky",
    sizes: ["100cm", "110cm", "120cm", "130cm"],
    colors: ["Xanh navy", "Đen"],
  },
  {
    name: "Quần jean bé trai phối thêu Para",
    categorySlug: "be-trai",
    gender: "BOY",
    ageMinMonths: 48,
    ageMaxMonths: 156,
    basePrice: 289000,
    description:
      "Quần jean form regular, chất vải denim co giãn nhẹ, phối họa tiết thêu cá tính.",
    placeholderKind: "quan",
    placeholderTone: "sky",
    sizes: ["110cm", "120cm", "130cm", "140cm"],
    colors: ["Xanh denim"],
  },
  {
    name: "Áo dài bé trai cách tân họa tiết rồng",
    categorySlug: "be-trai",
    gender: "BOY",
    ageMinMonths: 24,
    ageMaxMonths: 144,
    basePrice: 349000,
    description:
      "Áo dài nam cách tân, họa tiết rồng thêu tinh xảo, phù hợp mặc Tết và các dịp lễ trang trọng.",
    placeholderKind: "so-mi",
    placeholderTone: "sun",
    sizes: ["100cm", "110cm", "120cm", "130cm"],
    colors: ["Xanh rêu", "Đỏ đô"],
  },
  {
    name: "Đồ bộ thun bé trai in chữ Nicety",
    categorySlug: "be-trai",
    gender: "BOY",
    ageMinMonths: 24,
    ageMaxMonths: 96,
    basePrice: 259000,
    description:
      "Bộ đồ thun in chữ phong cách sang chảnh, chất liệu cotton co giãn thoải mái vận động.",
    isNewArrival: true,
    placeholderKind: "bo-do",
    placeholderTone: "coral",
    sizes: ["90cm", "100cm", "110cm"],
    colors: ["Trắng", "Xám"],
  },
  {
    name: "Nón vành bèo bé gái",
    categorySlug: "phu-kien",
    gender: "GIRL",
    ageMinMonths: 12,
    ageMaxMonths: 72,
    basePrice: 89000,
    description: "Nón vành bèo chống nắng, chất liệu cotton thoáng mát cho bé.",
    placeholderKind: "phu-kien",
    placeholderTone: "pink",
    sizes: ["Free size"],
    colors: ["Hồng", "Trắng"],
  },
  {
    name: "Set tất họa tiết hoạt hình (5 đôi)",
    categorySlug: "phu-kien",
    gender: "UNISEX",
    ageMinMonths: 12,
    ageMaxMonths: 96,
    basePrice: 79000,
    description: "Set 5 đôi tất cotton co giãn, họa tiết hoạt hình đáng yêu.",
    placeholderKind: "phu-kien",
    placeholderTone: "sun",
    sizes: ["S", "M", "L"],
    colors: ["Phối màu"],
  },
];

async function main() {
  console.log("Đang tạo tài khoản admin...");
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@phuongnhikids.vn";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "PhuongNhi@123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: "Chủ shop PHUONG NHI KIDS",
      role: "OWNER",
    },
  });

  console.log("Đang tạo danh mục...");
  const categoryMap = new Map<string, string>();
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap.set(cat.slug, created.id);
  }

  console.log("Đang tạo sản phẩm...");
  for (const p of products) {
    const slug = slugify(p.name);
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) continue;

    const variants = p.sizes.flatMap((size) =>
      p.colors.map((color) => ({
        size,
        color,
        stock: 15 + Math.floor(Math.random() * 20),
        sku: `${slug}-${slugify(size)}-${slugify(color)}`,
      }))
    );

    await prisma.product.create({
      data: {
        name: p.name,
        slug,
        description: p.description,
        categoryId,
        gender: p.gender,
        ageMinMonths: p.ageMinMonths,
        ageMaxMonths: p.ageMaxMonths,
        basePrice: p.basePrice,
        compareAtPrice: p.compareAtPrice,
        isFeatured: p.isFeatured ?? false,
        isNewArrival: p.isNewArrival ?? false,
        placeholderKind: p.placeholderKind,
        placeholderTone: p.placeholderTone,
        variants: { create: variants },
      },
    });
  }

  console.log("Hoàn tất seed dữ liệu!");
  console.log(`Đăng nhập admin: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
