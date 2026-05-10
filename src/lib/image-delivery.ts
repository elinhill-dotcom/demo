/**
 * Next/Image: local paths and bundled examples stay unoptimized; remote HTTPS (Supabase) uses optimizer + remotePatterns.
 */
export function shouldUnoptimizeImageSrc(src: string): boolean {
  if (src.startsWith("https://") || src.startsWith("http://")) {
    return false;
  }
  return (
    src.startsWith("/uploads") ||
    src.startsWith("/examples") ||
    src === "/placeholder-cheese.svg"
  );
}
