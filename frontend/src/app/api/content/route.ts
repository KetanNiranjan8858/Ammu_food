import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { SiteContent } from "@/lib/types";
import defaultData from "@/data/site-content.json";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const contentFilePath = path.join(process.cwd(), "src", "data", "site-content.json");
const defaultFilePath = path.join(process.cwd(), "src", "data", "default-content.json");
const backendContentDir = path.join(process.cwd(), "..", "backend", "data");
const backendContentPath = path.join(backendContentDir, "site-content.json");

function readContent(): SiteContent {
  try {
    if (fs.existsSync(contentFilePath)) {
      const data = fs.readFileSync(contentFilePath, "utf-8");
      return JSON.parse(data) as SiteContent;
    }
  } catch (err) {
    console.error("Error reading site content from disk:", err);
  }
  return defaultData as SiteContent;
}

function writeContent(content: SiteContent) {
  const jsonStr = JSON.stringify(content, null, 2);
  fs.writeFileSync(contentFilePath, jsonStr, "utf-8");

  // Also sync to backend folder if available
  try {
    if (!fs.existsSync(backendContentDir)) {
      fs.mkdirSync(backendContentDir, { recursive: true });
    }
    fs.writeFileSync(backendContentPath, jsonStr, "utf-8");
  } catch (err) {
    // optional sync
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isReset = searchParams.get("reset") === "true";

    if (isReset) {
      if (fs.existsSync(defaultFilePath)) {
        const defaultRaw = fs.readFileSync(defaultFilePath, "utf-8");
        const defaultJson = JSON.parse(defaultRaw);
        writeContent(defaultJson);
        return NextResponse.json({ success: true, message: "Reset to default content successfully", content: defaultJson });
      }
    }

    const content = readContent();
    return NextResponse.json({ success: true, content });
  } catch (err: any) {
    console.error("GET /api/content error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid content body" }, { status: 400 });
    }

    const updatedContent = body.content ? body.content : body;
    writeContent(updatedContent);

    return NextResponse.json({
      success: true,
      message: "Site content updated successfully across all pages!",
      content: updatedContent,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("POST /api/content error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

