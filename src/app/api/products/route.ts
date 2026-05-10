import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/session";
import { apiJsonError } from "@/lib/api-errors";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(8000),
  priceCents: z.number().int().min(50).max(5_000_000),
  imagePath: z.string().trim().min(1).max(500),
});

export async function GET() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const jar = await cookies();
  if (
    !verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value)
  ) {
    return apiJsonError("UNAUTHORIZED", 401);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiJsonError("INVALID_JSON", 400);
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return apiJsonError("INVALID_PAYLOAD", 400);
  }

  const p = await prisma.product.create({
    data: parsed.data,
  });
  return NextResponse.json(p, { status: 201 });
}
