import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/session";
import { apiJsonError } from "@/lib/api-errors";
import { unlink } from "node:fs/promises";
import { join } from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(8000).optional(),
  priceCents: z.number().int().min(50).max(5_000_000).optional(),
  imagePath: z.string().trim().min(1).max(500).optional(),
  active: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const jar = await cookies();
  if (
    !verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value)
  ) {
    return apiJsonError("UNAUTHORIZED", 401);
  }

  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiJsonError("INVALID_JSON", 400);
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return apiJsonError("INVALID_PAYLOAD", 400);
  }

  try {
    const before = await prisma.product.findUnique({ where: { id } });
    if (!before) {
      return apiJsonError("NOT_FOUND", 404);
    }
    const updated = await prisma.product.update({
      where: { id },
      data: parsed.data,
    });

    const newPath = parsed.data.imagePath;
    if (
      newPath &&
      newPath !== before.imagePath &&
      before.imagePath.startsWith("/uploads/products/") &&
      !before.imagePath.includes("..")
    ) {
      const diskPath = join(process.cwd(), "public", before.imagePath);
      unlink(diskPath).catch(() => undefined);
    }

    return NextResponse.json(updated);
  } catch {
    return apiJsonError("NOT_FOUND", 404);
  }
}

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
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return apiJsonError("NOT_FOUND", 404);
  }

  const pathSafe =
    existing.imagePath.startsWith("/uploads/products/") &&
    !existing.imagePath.includes("..");

  await prisma.orderItem.updateMany({
    where: { productId: id },
    data: { productId: null },
  });
  await prisma.product.delete({ where: { id } });

  if (pathSafe) {
    const diskPath = join(process.cwd(), "public", existing.imagePath);
    unlink(diskPath).catch(() => undefined);
  }

  return NextResponse.json({ ok: true });
}
