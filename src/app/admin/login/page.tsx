import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-muted/40 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground">
            PN
          </span>
          <h1 className="mt-3 font-heading text-xl font-bold">
            Đăng nhập quản trị
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            PHUONG NHI KIDS Admin
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
