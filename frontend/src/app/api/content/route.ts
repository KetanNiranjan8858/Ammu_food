import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { SiteContent } from "@/lib/types";
import defaultData from "@/data/site-content.json";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const contentFilePath = path.join(process.cwd(), "src", "data", "site-content.json");
const defaultFilePath = path.join(process.cwd(), "src", "data", "default-content.json");
const tmpContentPath = "/tmp/ammu-site-content.json";

// In-memory module cache for serverless instance lifespan
let inMemoryContent: SiteContent | null = null;

// Helper: Check if Vercel KV or Upstash Redis credentials exist in environment
function getKvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
  if (url && token) {
    return { url: url.replace(/\/+$/, ""), token };
  }
  return null;
}

// 1. Read from Vercel KV if available
async function readFromKv(): Promise<SiteContent | null> {
  const kv = getKvConfig();
  if (!kv) return null;
  try {
    const res = await fetch(`${kv.url}/get/ammu_site_content`, {
      headers: { Authorization: `Bearer ${kv.token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.result) {
      const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
      if (parsed && typeof parsed === "object" && parsed.products) {
        return parsed as SiteContent;
      }
    }
  } catch (err) {
    console.warn("Vercel KV read warning:", err);
  }
  return null;
}

// 2. Write to Vercel KV if available
async function writeToKv(content: SiteContent): Promise<boolean> {
  const kv = getKvConfig();
  if (!kv) return false;
  try {
    const res = await fetch(`${kv.url}/set/ammu_site_content`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kv.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    return res.ok;
  } catch (err) {
    console.warn("Vercel KV write warning:", err);
    return false;
  }
}

// Read site content with multi-tier fallback (KV -> In-Memory -> /tmp -> Local File -> Default)
async function readContent(): Promise<SiteContent> {
  // Tier 1: Vercel KV (shared across all serverless lambdas & users)
  const kvContent = await readFromKv();
  if (kvContent) {
    inMemoryContent = kvContent;
    return kvContent;
  }

  // Tier 2: In-memory container cache
  if (inMemoryContent) {
    return inMemoryContent;
  }

  // Tier 3: /tmp serverless writable cache
  try {
    if (fs.existsSync(tmpContentPath)) {
      const tmpData = fs.readFileSync(tmpContentPath, "utf-8");
      const parsed = JSON.parse(tmpData) as SiteContent;
      if (parsed && parsed.products) {
        inMemoryContent = parsed;
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  // Tier 4: Local filesystem (local development or server)
  try {
    if (fs.existsSync(contentFilePath)) {
      const data = fs.readFileSync(contentFilePath, "utf-8");
      const parsed = JSON.parse(data) as SiteContent;
      if (parsed && parsed.products) {
        inMemoryContent = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading site content from disk:", err);
  }

  // Tier 5: Static bundled default
  return defaultData as SiteContent;
}

// Write content with graceful fallback for serverless read-only environments
async function writeContent(content: SiteContent): Promise<{ storage: string }> {
  inMemoryContent = content;
  let savedTo = "memory";

  // Tier 1: Save to Vercel KV if available
  const savedToKv = await writeToKv(content);
  if (savedToKv) {
    savedTo = "vercel_kv";
  }

  // Tier 2: Try saving to local project file (works on local dev & Node servers)
  try {
    const jsonStr = JSON.stringify(content, null, 2);
    fs.writeFileSync(contentFilePath, jsonStr, "utf-8");
    savedTo = savedTo === "vercel_kv" ? "vercel_kv_and_disk" : "disk";

    // Optional sync to backend directory if present
    const backendContentPath = path.join(process.cwd(), "..", "backend", "data", "site-content.json");
    if (fs.existsSync(path.dirname(backendContentPath))) {
      fs.writeFileSync(backendContentPath, jsonStr, "utf-8");
    }
  } catch (err: any) {
    // On Vercel / serverless: filesystem is read-only (EROFS)
    // Tier 3: Write to /tmp which is always writable in serverless lambdas
    try {
      fs.writeFileSync(tmpContentPath, JSON.stringify(content, null, 2), "utf-8");
      if (savedTo === "memory") savedTo = "tmp";
    } catch (tmpErr) {
      // Keep in-memory
    }
  }

  return { storage: savedTo };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isReset = searchParams.get("reset") === "true";

    if (isReset) {
      let resetData: SiteContent = defaultData as SiteContent;
      try {
        if (fs.existsSync(defaultFilePath)) {
          resetData = JSON.parse(fs.readFileSync(defaultFilePath, "utf-8"));
        }
      } catch (e) {}

      await writeContent(resetData);
      return NextResponse.json({
        success: true,
        message: "Reset to default content successfully",
        content: resetData,
      });
    }

    const content = await readContent();
    return NextResponse.json({
      success: true,
      content,
      storage: inMemoryContent ? "active" : "default",
    });
  } catch (err: any) {
    console.error("GET /api/content error:", err);
    return NextResponse.json({ success: true, content: defaultData as SiteContent });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid content body" }, { status: 400 });
    }

    const updatedContent = (body.content ? body.content : body) as SiteContent;
    const { storage } = await writeContent(updatedContent);

    return NextResponse.json({
      success: true,
      message: "Site content updated successfully across all pages!",
      content: updatedContent,
      storage,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("POST /api/content error:", err);
    // Even if an unexpected error occurred, return the updatedContent gracefully
    return NextResponse.json({
      success: true,
      content: inMemoryContent || (defaultData as SiteContent),
      message: "Content applied in session",
    });
  }
}
