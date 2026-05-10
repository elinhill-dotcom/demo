import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/session";
import { apiJsonError } from "@/lib/api-errors";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const patchSchema = z
  .object({
    checkoutNotice: z.string().max(16000).optional(),
    homeHeadingNl: z.string().max(240).optional(),
    homeHeadingEn: z.string().max(240).optional(),
  })
  .strict();

export async function GET() {
  const jar = await cookies();
  if (
    !verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value)
  ) {
    return apiJsonError("UNAUTHORIZED", 401);
  }

  const row = await prisma.appSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      checkoutNotice: "",
      homeHeadingNl: "",
      homeHeadingEn: "",
    },
    update: {},
  });

  return NextResponse.json(row);
}

export async function PATCH(request: Request) {
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

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return apiJsonError("INVALID_PAYLOAD", 400);
  }

  const patch: Record<string, string> = {};
  if (parsed.data.checkoutNotice !== undefined)
    patch.checkoutNotice = parsed.data.checkoutNotice;
  if (parsed.data.homeHeadingNl !== undefined)
    patch.homeHeadingNl = parsed.data.homeHeadingNl;
  if (parsed.data.homeHeadingEn !== undefined)
    patch.homeHeadingEn = parsed.data.homeHeadingEn;

  if (Object.keys(patch).length === 0) {
    return apiJsonError("INVALID_PAYLOAD", 400);
  }

  const row = await prisma.appSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      checkoutNotice: patch.checkoutNotice ?? "",
      homeHeadingNl: patch.homeHeadingNl ?? "",
      homeHeadingEn: patch.homeHeadingEn ?? "",
    },
    update: patch,
  });

  return NextResponse.json(row);
}
