import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

const allowedOrigins = new Set([
  "https://mytesttype.com",
  "https://www.mytesttype.com",
  "http://localhost:4173",
  "http://localhost:4175",
  "http://localhost:4176",
  "http://localhost:4179",
  "http://localhost:4180",
  "http://localhost:4182",
]);

app.use(cors({
  origin(origin, callback) {
    // Server-to-server health checks and same-origin tools may omit Origin.
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed"));
  },
}));

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMITS = { share: 30, ai: 8, other: 60 };

app.use("/api", (req, res, next) => {
  if (req.method !== "POST") return next();
  const forwarded = req.headers["x-forwarded-for"];
  const clientIp = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0])?.trim() || req.ip || "unknown";
  const kind = req.path.startsWith("/share-results") ? "share" : req.path.includes("generate") || req.path.includes("analy") ? "ai" : "other";
  const key = `${kind}:${clientIp}`;
  const now = Date.now();
  const current = rateBuckets.get(key);
  const bucket = !current || current.resetAt <= now ? { count: 0, resetAt: now + WINDOW_MS } : current;
  bucket.count += 1;
  rateBuckets.set(key, bucket);
  if (bucket.count > LIMITS[kind]) {
    res.status(429).json({ error: "요청이 많습니다. 잠시 후 다시 시도해 주세요." });
    return;
  }
  if (rateBuckets.size > 10_000) {
    for (const [bucketKey, value] of rateBuckets) if (value.resetAt <= now) rateBuckets.delete(bucketKey);
  }
  next();
});

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use("/api", router);

export default app;
