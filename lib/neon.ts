import { neon } from "@neondatabase/serverless";

function sanitize(url: string) {
  try {
    const u = new URL(url);
    u.searchParams.delete("channel_binding");
    return u.toString();
  } catch {
    return url;
  }
}

function isNeon(url: string) {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") return false;
    return /\.neon\.tech$/.test(host);
  } catch {
    return false;
  }
}

export const sql = (() => {
  const url = process.env.DATABASE_URL;
  if (!url) return null as any;
  if (!isNeon(url)) return null as any;
  return neon(sanitize(url));
})();
