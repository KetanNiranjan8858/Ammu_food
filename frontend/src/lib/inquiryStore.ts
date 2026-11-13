import fs from "fs";
import path from "path";

export interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  quantity?: string;
  inquiryType?: string;
  topic?: string;
  message?: string;
  createdAt: string;
  status: "new" | "reviewed" | "contacted" | "completed";
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const INQUIRY_FILE = path.join(DATA_DIR, "inquiries.json");
const TMP_INQUIRY_FILE = "/tmp/ammu-inquiries.json";

// In-memory fallback
let inMemoryInquiries: InquiryRecord[] = [];

function ensureFileExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch (e) {}
    }
    if (!fs.existsSync(INQUIRY_FILE)) {
      try {
        fs.writeFileSync(INQUIRY_FILE, JSON.stringify([], null, 2), "utf8");
      } catch (e) {}
    }
  } catch (err) {}
}

export function getAllInquiries(): InquiryRecord[] {
  try {
    ensureFileExists();
    if (fs.existsSync(INQUIRY_FILE)) {
      const data = fs.readFileSync(INQUIRY_FILE, "utf8");
      const parsed = JSON.parse(data || "[]");
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {}

  // Serverless /tmp fallback
  try {
    if (fs.existsSync(TMP_INQUIRY_FILE)) {
      const tmpData = fs.readFileSync(TMP_INQUIRY_FILE, "utf8");
      const parsed = JSON.parse(tmpData || "[]");
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}

  return inMemoryInquiries;
}

export function saveInquiry(inquiry: Omit<InquiryRecord, "id" | "createdAt" | "status">): InquiryRecord {
  const all = getAllInquiries();
  const record: InquiryRecord = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    ...inquiry,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  all.unshift(record);
  inMemoryInquiries = all;

  // Try local file
  try {
    ensureFileExists();
    fs.writeFileSync(INQUIRY_FILE, JSON.stringify(all, null, 2), "utf8");
  } catch (err) {
    // Try serverless /tmp
    try {
      fs.writeFileSync(TMP_INQUIRY_FILE, JSON.stringify(all, null, 2), "utf8");
    } catch (tmpErr) {}
  }

  return record;
}

export function updateInquiryStatus(
  id: string,
  status: "new" | "reviewed" | "contacted" | "completed"
): boolean {
  try {
    const all = getAllInquiries();
    const target = all.find((i) => i.id === id);
    if (!target) return false;
    target.status = status;
    inMemoryInquiries = all;

    try {
      ensureFileExists();
      fs.writeFileSync(INQUIRY_FILE, JSON.stringify(all, null, 2), "utf8");
    } catch (err) {
      try {
        fs.writeFileSync(TMP_INQUIRY_FILE, JSON.stringify(all, null, 2), "utf8");
      } catch (tmpErr) {}
    }
    return true;
  } catch (err) {
    return false;
  }
}

export function deleteInquiry(id: string): boolean {
  try {
    const all = getAllInquiries();
    const filtered = all.filter((i) => i.id !== id);
    inMemoryInquiries = filtered;

    try {
      ensureFileExists();
      fs.writeFileSync(INQUIRY_FILE, JSON.stringify(filtered, null, 2), "utf8");
    } catch (err) {
      try {
        fs.writeFileSync(TMP_INQUIRY_FILE, JSON.stringify(filtered, null, 2), "utf8");
      } catch (tmpErr) {}
    }
    return true;
  } catch (err) {
    return false;
  }
}

export function clearAllInquiries(): boolean {
  inMemoryInquiries = [];
  try {
    ensureFileExists();
    fs.writeFileSync(INQUIRY_FILE, JSON.stringify([], null, 2), "utf8");
  } catch (err) {
    try {
      fs.writeFileSync(TMP_INQUIRY_FILE, JSON.stringify([], null, 2), "utf8");
    } catch (tmpErr) {}
  }
  return true;
}
