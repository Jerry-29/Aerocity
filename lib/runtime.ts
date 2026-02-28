export function getApiBaseUrl() {
  const direct = process.env.BACKEND_API_URL?.trim();
  if (direct) return direct.replace(/\/+$/, "");
  const pub = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (pub) return pub.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  const port = process.env.PORT || "3000";
  return `http://localhost:${port}`;
}
