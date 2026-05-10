import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/session";
import { apiJsonError } from "@/lib/api-errors";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const jar = await cookies();
  if (
    !verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value)
  ) {
    return apiJsonError("UNAUTHORIZED", 401);
  }

  const { id } = await ctx.params;

  try {
    await prisma.order.delete({ where: { id } });
  } catch {
    return apiJsonError("NOT_FOUND", 404);
  }

  return NextResponse.json({ ok: true });
}
