import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
} from "@/lib/session";
import { apiJsonError } from "@/lib/api-errors";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return apiJsonError("INVALID_JSON", 400);
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return apiJsonError("INVALID_LOGIN_REQUEST", 400);
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || parsed.data.password !== expected) {
    return apiJsonError("INCORRECT_PASSWORD", 401);
  }

  const token = createAdminSessionToken();
  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
