import { neon, neonConfig } from "@neondatabase/serverless";

neonConfig.fetchConnectionCache = true;

function sanitize(url: string) {
  try {
    const u = new URL(url);
    u.searchParams.delete("channel_binding");
    return u.toString();
  } catch {
    return url;
  }
}

export const sql = (() => {
  const url = process.env.DATABASE_URL;
  if (!url) return null as any;
  return neon(sanitize(url));
})();
