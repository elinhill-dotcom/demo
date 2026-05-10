import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/session";
import { apiJsonError } from "@/lib/api-errors";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  customerName: z.string().trim().min(2).max(200),
  phone: z
    .string()
    .trim()
    .max(32)
    .regex(/^[\d+\s()./\-]+$/)
    .refine((s) => s.replace(/\D/g, "").length >= 8),
  address: z.string().trim().min(4).max(2000),
  email: z.string().trim().email().max(200),
  marketingOptIn: z.boolean(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(999),
      }),
    )
    .min(1),
});

export async function GET() {
  const jar = await cookies();
  if (
    !verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value)
  ) {
    return apiJsonError("UNAUTHORIZED", 401);
  }

  const orders = await prisma.order.findMany({
    include: {
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return apiJsonError("INVALID_JSON", 400);
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return apiJsonError("VALIDATION_FAILED", 400);
  }

  const { customerName, phone, address, email, marketingOptIn, items } =
    parsed.data;
  const ids = [...new Set(items.map((i) => i.productId))];
  const products = await prisma.product.findMany({
    where: { id: { in: ids }, active: true },
  });
  const byId = new Map(products.map((p) => [p.id, p]));

  for (const line of items) {
    if (!byId.get(line.productId))
      return apiJsonError("PRODUCT_UNAVAILABLE", 400);
  }

  const order = await prisma.$transaction(async (tx) => {
    const o = await tx.order.create({
      data: {
        customerName,
        phone: phone.trim(),
        address,
        email,
        marketingOptIn,
      },
    });
    for (const line of items) {
      const p = byId.get(line.productId)!;
      await tx.orderItem.create({
        data: {
          orderId: o.id,
          productId: p.id,
          productName: p.name,
          quantity: line.quantity,
          priceCents: p.priceCents,
        },
      });
    }
    return tx.order.findUniqueOrThrow({
      where: { id: o.id },
      include: { items: true },
    });
  });

  return NextResponse.json(order, { status: 201 });
}
