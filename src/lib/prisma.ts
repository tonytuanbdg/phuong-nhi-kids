import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// DATABASE_URL dung dinh dang "mysql://" chuan (de tuong thich voi Prisma CLI,
// vd: "prisma db push"). Driver mariadb chi chap nhan chuoi ket noi bat dau
// bang "mariadb://", nen o day ta tu parse URL thanh object config thay vi
// truyen thang chuoi cho adapter.
function parseDatabaseUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ""),
  };
}

function createPrismaClient() {
  const adapter = new PrismaMariaDb(parseDatabaseUrl(process.env.DATABASE_URL!));
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
