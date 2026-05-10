"use server";

import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteOrder(formData: FormData) {
  const jar = await cookies();
  if (
    !verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value)
  ) {
    redirect("/admin/login");
  }

  const id = formData.get("id");
  if (typeof id !== "string" || id.length === 0) return;

  try {
    await prisma.order.delete({ where: { id } });
  } catch {
    return;
  }
  revalidatePath("/admin");
}
