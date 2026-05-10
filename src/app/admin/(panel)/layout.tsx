import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/session";
import { AdminPanelBar } from "../AdminPanelBar";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <>
      <AdminPanelBar />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</div>
    </>
  );
}
