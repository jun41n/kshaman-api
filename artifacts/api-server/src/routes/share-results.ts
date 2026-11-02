import { Router, type IRouter } from "express";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const router: IRouter = Router();
const MAX_IMAGE_LENGTH = 1_500_000;
const EXPIRY_MS = 30 * 24 * 60 * 60 * 1000;
const storePath = path.join(process.env.SHARE_STORE_DIR ?? "/home/ubuntu/mytesttype-data", "share-results.json");

type ShareRecord = { id: string; createdAt: string; expiresAt: string; service: "past-life" | "face" | "palm"; language: string; title: string; summary: string; cardImageDataUrl: string };

async function readRecords(): Promise<ShareRecord[]> {
  try { return (JSON.parse(await readFile(storePath, "utf8")) as ShareRecord[]).filter((record) => Date.parse(record.expiresAt) > Date.now()); }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return []; throw error; }
}
async function writeRecords(records: ShareRecord[]) { await mkdir(path.dirname(storePath), { recursive: true }); const temporary = `${storePath}.${randomUUID()}.tmp`; await writeFile(temporary, JSON.stringify(records), "utf8"); await rename(temporary, storePath); }
async function getRecord(id: string) { return (await readRecords()).find((item) => item.id === id); }
function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character); }

router.post("/share-results", async (req, res): Promise<void> => {
  const { service, language, title, summary, cardImageDataUrl } = req.body as Partial<ShareRecord>;
  if (!["past-life", "face", "palm"].includes(service ?? "") || !title || !summary || !cardImageDataUrl?.startsWith("data:image/png;base64,") || cardImageDataUrl.length > MAX_IMAGE_LENGTH) { res.status(400).json({ error: "유효한 결과 카드 데이터가 필요합니다." }); return; }
  const now = new Date();
  const record: ShareRecord = { id: randomUUID().replace(/-/g, "").slice(0, 16), createdAt: now.toISOString(), expiresAt: new Date(now.getTime() + EXPIRY_MS).toISOString(), service: service as ShareRecord["service"], language: typeof language === "string" ? language.slice(0, 12) : "ko", title: title.slice(0, 120), summary: summary.slice(0, 500), cardImageDataUrl };
  try { const records = await readRecords(); records.push(record); await writeRecords(records); res.status(201).json({ id: record.id, expiresAt: record.expiresAt }); }
  catch (error) { console.error("[share-results] failed to save", error); res.status(500).json({ error: "결과 카드를 저장하지 못했습니다." }); }
});

router.get("/share-results/:id", async (req, res): Promise<void> => {
  try { const record = await getRecord(req.params.id); if (!record) { res.status(404).json({ error: "결과 카드를 찾을 수 없거나 공유 기간이 끝났습니다." }); return; } res.json(record); }
  catch (error) { console.error("[share-results] failed to read", error); res.status(500).json({ error: "결과 카드를 불러오지 못했습니다." }); }
});

router.get("/share-results/:id/card.png", async (req, res): Promise<void> => {
  try { const record = await getRecord(req.params.id); if (!record) { res.sendStatus(404); return; } res.setHeader("Cache-Control", "public, max-age=2592000, immutable"); res.type("png").send(Buffer.from(record.cardImageDataUrl.split(",")[1], "base64")); }
  catch (error) { console.error("[share-results] failed to render card", error); res.sendStatus(500); }
});

router.get("/share/:id", async (req, res): Promise<void> => {
  try {
    const record = await getRecord(req.params.id);
    if (!record) { res.status(404).type("html").send("<title>Result card unavailable</title>"); return; }
    const origin = `${req.protocol}://${req.get("host")}`;
    const canonical = `${origin}/api/share/${encodeURIComponent(record.id)}`;
    const image = `${origin}/api/share-results/${encodeURIComponent(record.id)}/card.png`;
    res.type("html").send(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(record.title)} | MyTestType</title><meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(record.title)}"><meta property="og:description" content="${escapeHtml(record.summary)}"><meta property="og:image" content="${image}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(record.title)}"><meta name="twitter:description" content="${escapeHtml(record.summary)}"><meta name="twitter:image" content="${image}"></head><body style="margin:0;background:#e7c785;font-family:system-ui,sans-serif;color:#2a1b16"><main style="max-width:720px;margin:32px auto;padding:20px"><img src="${image}" alt="${escapeHtml(record.title)}" style="width:100%;border:1px solid #8e5a38"><h1>${escapeHtml(record.title)}</h1><p>${escapeHtml(record.summary)}</p><a href="https://mytesttype.com/">MyTestType</a></main></body></html>`);
  } catch (error) { console.error("[share-results] failed to render share page", error); res.sendStatus(500); }
});

export default router;
