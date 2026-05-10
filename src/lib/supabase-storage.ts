import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";

export const PRODUCT_IMAGES_BUCKET = "product-images";

let storageClient: SupabaseClient | null | undefined;

function getSupabaseStorageClient(): SupabaseClient | null {
  if (storageClient !== undefined) return storageClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    storageClient = null;
    return null;
  }
  storageClient = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return storageClient;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseStorageClient() !== null;
}

/**
 * Object path inside the bucket, e.g. `products/123-abc.jpg`, from a public object URL.
 */
export function storagePathFromProductImagePublicUrl(
  publicUrl: string,
): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  const marker = "/storage/v1/object/public/product-images/";
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  const tail = publicUrl.slice(idx + marker.length).split("?")[0];
  try {
    return decodeURIComponent(tail);
  } catch {
    return tail;
  }
}

export async function uploadProductImage(options: {
  buffer: Buffer;
  contentType: string;
  ext: string;
}): Promise<{ publicUrl: string } | { errorMessage: string }> {
  const supabase = getSupabaseStorageClient();
  if (!supabase) {
    return { errorMessage: "Supabase is not configured." };
  }

  const objectPath = `products/${Date.now()}-${randomBytes(6).toString("hex")}.${options.ext}`;

  const { data, error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(objectPath, options.buffer, {
      contentType: options.contentType,
      upsert: false,
    });

  if (error) {
    return {
      errorMessage:
        (typeof error.message === "string" && error.message.length > 0
          ? error.message
          : String(error)) || "Storage upload failed.",
    };
  }

  const { data: pub } = supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .getPublicUrl(data.path);

  return { publicUrl: pub.publicUrl };
}

export async function deleteProductImageByPublicUrl(
  publicUrl: string,
): Promise<void> {
  const path = storagePathFromProductImagePublicUrl(publicUrl);
  if (!path) return;
  const supabase = getSupabaseStorageClient();
  if (!supabase) return;
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .remove([path]);
  if (error) {
    console.error("[supabase-storage] remove failed", error.message);
  }
}
