import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiJsonError } from "@/lib/api-errors";
import { LOCALE_COOKIE, type ShopLocale } from "@/i18n/shop-locale";
import { z } from "zod";

const bodySchema = z.object({
  locale: z.enum(["nl", "en"]),
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
    return apiJsonError("INVALID_LOCALE", 400);
  }

  const locale: ShopLocale = parsed.data.locale;
  const jar = await cookies();
  jar.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: false,
  });

  return NextResponse.json({ ok: true, locale });
}
