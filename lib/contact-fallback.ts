import fs from "fs/promises";
import path from "path";

type ContactMsg = {
  id: number;
  name: string;
  email: string | null;
  mobile: string;
  whatsapp: string;
  message: string;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED";
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "contact-messages.json");

async function ensureFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

async function readAll(): Promise<ContactMsg[]> {
  await ensureFile();
  const raw = await fs.readFile(dataFile, "utf8");
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

async function writeAll(items: ContactMsg[]) {
  await ensureFile();
  await fs.writeFile(dataFile, JSON.stringify(items), "utf8");
}

export async function appendContactMessage(input: Omit<ContactMsg, "id" | "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();
  const base: ContactMsg = {
    id: Date.now(),
    createdAt: now,
    updatedAt: now,
    ...input,
  };
  const all = await readAll();
  all.unshift(base);
  await writeAll(all);
  return base;
}

export async function listContactMessages(params: { status?: string; page: number; pageSize: number }) {
  const all = await readAll();
  let items = all;
  if (params.status) {
    items = items.filter((x) => x.status === params.status);
  }
  items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const total = items.length;
  const start = (params.page - 1) * params.pageSize;
  const pageItems = items.slice(start, start + params.pageSize);
  return { items: pageItems, total };
}

export async function updateContactMessage(id: number, data: Partial<Pick<ContactMsg, "status" | "notes">>) {
  const all = await readAll();
  const idx = all.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  const updated = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
  all[idx] = updated;
  await writeAll(all);
  return updated;
}

export async function removeContactMessage(id: number) {
  const all = await readAll();
  const idx = all.findIndex((x) => x.id === id);
  if (idx === -1) return false;
  all.splice(idx, 1);
  await writeAll(all);
  return true;
}
