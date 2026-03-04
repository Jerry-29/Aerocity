import fs from "fs/promises";
import path from "path";

export type HeroMedia = {
  id: number;
  type: "IMAGE" | "VIDEO";
  url: string;
  thumbnailUrl?: string | null;
  createdAt?: string;
};

const dataDir = path.join(process.cwd(), "data");
const heroFile = path.join(dataDir, "hero.json");

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

export async function readHero(): Promise<HeroMedia | null> {
  try {
    await ensureDir();
    const raw = await fs.readFile(heroFile, "utf8");
    const json = JSON.parse(raw);
    if (json && json.id && json.url && json.type) {
      return json as HeroMedia;
    }
    return null;
  } catch {
    return null;
  }
}

export async function writeHero(hero: HeroMedia) {
  await ensureDir();
  await fs.writeFile(heroFile, JSON.stringify(hero), "utf8");
}

export async function clearHero() {
  try {
    await fs.unlink(heroFile);
  } catch {
    // ignore
  }
}

