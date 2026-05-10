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
    nextOrderAt: z.string().trim().optional(),
    countdownEnabled: z.boolean().optional(),
    countdownTextNl: z.string().max(800).optional(),
    countdownTextEn: z.string().max(800).optional(),
    headerTaglineNl: z.string().max(240).optional(),
    headerTaglineEn: z.string().max(240).optional(),
    headerTitleNl: z.string().max(240).optional(),
    headerTitleEn: z.string().max(240).optional(),
    homeIntroTextNl: z.string().max(2000).optional(),
    homeIntroTextEn: z.string().max(2000).optional(),
    homeEmptyTextNl: z.string().max(800).optional(),
    homeEmptyTextEn: z.string().max(800).optional(),
    footerNoteNl: z.string().max(400).optional(),
    footerNoteEn: z.string().max(400).optional(),
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
      nextOrderAt: null,
      countdownEnabled: false,
      countdownTextNl: "",
      countdownTextEn: "",
      headerTaglineNl: "",
      headerTaglineEn: "",
      headerTitleNl: "",
      headerTitleEn: "",
      homeIntroTextNl: "",
      homeIntroTextEn: "",
      homeEmptyTextNl: "",
      homeEmptyTextEn: "",
      footerNoteNl: "",
      footerNoteEn: "",
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

  const patch: Record<string, unknown> = {};
  if (parsed.data.checkoutNotice !== undefined)
    patch.checkoutNotice = parsed.data.checkoutNotice;
  if (parsed.data.homeHeadingNl !== undefined)
    patch.homeHeadingNl = parsed.data.homeHeadingNl;
  if (parsed.data.homeHeadingEn !== undefined)
    patch.homeHeadingEn = parsed.data.homeHeadingEn;
  if (parsed.data.countdownEnabled !== undefined)
    patch.countdownEnabled = parsed.data.countdownEnabled;
  if (parsed.data.countdownTextNl !== undefined)
    patch.countdownTextNl = parsed.data.countdownTextNl;
  if (parsed.data.countdownTextEn !== undefined)
    patch.countdownTextEn = parsed.data.countdownTextEn;
  if (parsed.data.headerTaglineNl !== undefined)
    patch.headerTaglineNl = parsed.data.headerTaglineNl;
  if (parsed.data.headerTaglineEn !== undefined)
    patch.headerTaglineEn = parsed.data.headerTaglineEn;
  if (parsed.data.headerTitleNl !== undefined)
    patch.headerTitleNl = parsed.data.headerTitleNl;
  if (parsed.data.headerTitleEn !== undefined)
    patch.headerTitleEn = parsed.data.headerTitleEn;
  if (parsed.data.homeIntroTextNl !== undefined)
    patch.homeIntroTextNl = parsed.data.homeIntroTextNl;
  if (parsed.data.homeIntroTextEn !== undefined)
    patch.homeIntroTextEn = parsed.data.homeIntroTextEn;
  if (parsed.data.homeEmptyTextNl !== undefined)
    patch.homeEmptyTextNl = parsed.data.homeEmptyTextNl;
  if (parsed.data.homeEmptyTextEn !== undefined)
    patch.homeEmptyTextEn = parsed.data.homeEmptyTextEn;
  if (parsed.data.footerNoteNl !== undefined)
    patch.footerNoteNl = parsed.data.footerNoteNl;
  if (parsed.data.footerNoteEn !== undefined)
    patch.footerNoteEn = parsed.data.footerNoteEn;

  if (parsed.data.nextOrderAt !== undefined) {
    const v = parsed.data.nextOrderAt.trim();
    if (v.length === 0) {
      patch.nextOrderAt = null;
    } else {
      const dt = new Date(v);
      if (Number.isNaN(dt.getTime())) {
        return apiJsonError("INVALID_PAYLOAD", 400);
      }
      patch.nextOrderAt = dt;
    }
  }

  if (Object.keys(patch).length === 0) {
    return apiJsonError("INVALID_PAYLOAD", 400);
  }

  const row = await prisma.appSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      checkoutNotice: typeof patch.checkoutNotice === "string" ? patch.checkoutNotice : "",
      homeHeadingNl: typeof patch.homeHeadingNl === "string" ? patch.homeHeadingNl : "",
      homeHeadingEn: typeof patch.homeHeadingEn === "string" ? patch.homeHeadingEn : "",
      nextOrderAt: (patch.nextOrderAt as Date | null | undefined) ?? null,
      countdownEnabled:
        typeof patch.countdownEnabled === "boolean" ? patch.countdownEnabled : false,
      countdownTextNl: typeof patch.countdownTextNl === "string" ? patch.countdownTextNl : "",
      countdownTextEn: typeof patch.countdownTextEn === "string" ? patch.countdownTextEn : "",
      headerTaglineNl:
        typeof patch.headerTaglineNl === "string" ? patch.headerTaglineNl : "",
      headerTaglineEn:
        typeof patch.headerTaglineEn === "string" ? patch.headerTaglineEn : "",
      headerTitleNl:
        typeof patch.headerTitleNl === "string" ? patch.headerTitleNl : "",
      headerTitleEn:
        typeof patch.headerTitleEn === "string" ? patch.headerTitleEn : "",
      homeIntroTextNl:
        typeof patch.homeIntroTextNl === "string" ? patch.homeIntroTextNl : "",
      homeIntroTextEn:
        typeof patch.homeIntroTextEn === "string" ? patch.homeIntroTextEn : "",
      homeEmptyTextNl:
        typeof patch.homeEmptyTextNl === "string" ? patch.homeEmptyTextNl : "",
      homeEmptyTextEn:
        typeof patch.homeEmptyTextEn === "string" ? patch.homeEmptyTextEn : "",
      footerNoteNl:
        typeof patch.footerNoteNl === "string" ? patch.footerNoteNl : "",
      footerNoteEn:
        typeof patch.footerNoteEn === "string" ? patch.footerNoteEn : "",
    },
    update: patch,
  });

  return NextResponse.json(row);
}
