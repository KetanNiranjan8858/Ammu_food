import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const files = formData.getAll("file") as (File | string)[];

      if (!files || files.length === 0) {
        return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
      }

      const uploadedUrls: string[] = [];
      for (const item of files) {
        if (!item || typeof item === "string") continue;
        const file = item as File;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mimeType = file.type || "image/png";

        const cleanName = (file.name || "upload.png").replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanName}`;
        const filePath = path.join(uploadsDir, fileName);

        try {
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          fs.writeFileSync(filePath, buffer);
          uploadedUrls.push(`/uploads/${fileName}`);
        } catch (fsErr) {
          // Vercel serverless read-only filesystem fallback: return base64 Data URI
          const base64Url = `data:${mimeType};base64,${buffer.toString("base64")}`;
          uploadedUrls.push(base64Url);
        }
      }

      return NextResponse.json({
        success: true,
        urls: uploadedUrls,
        url: uploadedUrls[0] || "",
      });
    } else {
      // JSON base64 upload
      const body = await req.json();
      const { fileData, fileName: origName = "image.png" } = body;

      if (!fileData) {
        return NextResponse.json({ error: "No file data provided" }, { status: 400 });
      }

      const cleanName = origName.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanName}`;
      const filePath = path.join(uploadsDir, fileName);

      try {
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const base64Data = fileData.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        fs.writeFileSync(filePath, buffer);
        return NextResponse.json({
          success: true,
          url: `/uploads/${fileName}`,
          urls: [`/uploads/${fileName}`],
        });
      } catch (fsErr) {
        // Return fileData base64 URL directly on serverless read-only filesystem
        return NextResponse.json({
          success: true,
          url: fileData,
          urls: [fileData],
        });
      }
    }
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
