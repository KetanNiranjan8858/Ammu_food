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

function ensureFileExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(INQUIRY_FILE)) {
    fs.writeFileSync(INQUIRY_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export function getAllInquiries(): InquiryRecord[] {
  try {
    ensureFileExists();
    const data = fs.readFileSync(INQUIRY_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Failed to read inquiries:", err);
    return [];
  }
}

export function saveInquiry(inquiry: Omit<InquiryRecord, "id" | "createdAt" | "status">): InquiryRecord {
  ensureFileExists();
  const all = getAllInquiries();
  const record: InquiryRecord = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    ...inquiry,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  all.unshift(record);
  fs.writeFileSync(INQUIRY_FILE, JSON.stringify(all, null, 2), "utf8");
  return record;
}

export function updateInquiryStatus(
  id: string,
  status: "new" | "reviewed" | "contacted" | "completed"
): boolean {
  try {
    ensureFileExists();
    const all = getAllInquiries();
    const index = all.findIndex((item) => item.id === id);
    if (index === -1) return false;
    all[index].status = status;
    fs.writeFileSync(INQUIRY_FILE, JSON.stringify(all, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to update inquiry status:", err);
    return false;
  }
}

export function deleteInquiry(id: string): boolean {
  try {
    ensureFileExists();
    const all = getAllInquiries();
    const filtered = all.filter((item) => item.id !== id);
    if (filtered.length === all.length) return false;
    fs.writeFileSync(INQUIRY_FILE, JSON.stringify(filtered, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to delete inquiry:", err);
    return false;
  }
}

export function clearAllInquiries(): boolean {
  try {
    ensureFileExists();
    fs.writeFileSync(INQUIRY_FILE, JSON.stringify([], null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to clear inquiries:", err);
    return false;
  }
}
