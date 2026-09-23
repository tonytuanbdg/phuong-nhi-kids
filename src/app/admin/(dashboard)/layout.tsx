import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminSessionProvider } from "@/components/admin/session-provider";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <AdminSessionProvider>
      <div className="flex min-h-full flex-1 bg-muted/30">
        <AdminSidebar />
        <div className="flex-1 overflow-x-hidden p-6 lg:p-8">{children}</div>
      </div>
    </AdminSessionProvider>
  );
}
