import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/session";
import { apiJsonError } from "@/lib/api-errors";
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function extFromType(type: string): string | null {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return null;
}

export async function POST(request: Request) {
  const jar = await cookies();
  if (
    !verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value)
  ) {
    return apiJsonError("UNAUTHORIZED", 401);
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return apiJsonError("UPLOAD_PARSE_FAILED", 400);
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return apiJsonError("NO_UPLOAD_FILE", 400);
  }

  if (!ALLOWED.has(file.type)) {
    return apiJsonError("UPLOAD_MEDIA_INVALID", 400);
  }

  if (file.size > MAX_BYTES) {
    return apiJsonError("UPLOAD_FILE_TOO_LARGE", 400);
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = extFromType(file.type);
  if (!ext) return apiJsonError("UPLOAD_TYPE_UNKNOWN", 400);

  const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
  const dir = join(process.cwd(), "public", "uploads", "products");
  await mkdir(dir, { recursive: true });
  const diskPath = join(dir, name);
  await writeFile(diskPath, buf);

  return NextResponse.json({ path: `/uploads/products/${name}` });
}
