import { test, expect, request } from "@playwright/test";

const baseURL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Pricing integrity", () => {
  test("tickets API returns customer base prices and family package is 3500", async () => {
    const api = await request.newContext();
    const res = await api.get(`${baseURL}/api/tickets`);
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.success).toBeTruthy();
    const items: any[] = json.data;
    const family = items.find((t) => t.slug === "family-package");
    expect(family).toBeTruthy();
    // customer price should be reflected; allow string or number
    const base = Number(family.customerPrice ?? family.price);
    expect(base).toBe(3500);
  });

  test("offers API applies only lower offer than base", async () => {
    const api = await request.newContext();
    const [ticketsRes, offersRes] = await Promise.all([
      api.get(`${baseURL}/api/tickets`),
      api.get(`${baseURL}/api/offers`),
    ]);
    expect(ticketsRes.ok()).toBeTruthy();
    const tickets = (await ticketsRes.json()).data as any[];
    const family = tickets.find((t) => t.slug === "family-package");
    const base = Number(family.customerPrice ?? family.price);

    if (offersRes.ok()) {
      const offers = (await offersRes.json()).data as any[];
      const offerPrices =
        offers?.[0]?.offerPrices?.filter((p: any) => p.ticketId === family.id) ||
        [];
      for (const p of offerPrices) {
        expect(Number(p.offerPrice)).toBeLessThanOrEqual(base);
      }
    }
  });
});
