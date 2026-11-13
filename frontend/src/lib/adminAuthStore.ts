import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  passwordHash?: string;
}

interface AuthData {
  users: Array<{
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    role: string;
  }>;
  sessions: Record<string, { userId: string; email: string; expiresAt: number }>;
  resetOtps: Record<string, { otp: string; expiresAt: number }>;
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const AUTH_FILE = path.join(DATA_DIR, "admin-auth.json");
const JWT_SECRET = process.env.ADMIN_SESSION_SECRET || "ammu_foods_secure_session_secret_2026";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password.trim()).digest("hex");
}

function getDefaultAuthData(): AuthData {
  const defaultHash = hashPassword("AmmuKesar@2026");
  return {
    users: [
      {
        id: "admin-1",
        email: "ketansinghniranjan24@gmail.com",
        name: "Ketan Singh (Owner)",
        passwordHash: defaultHash,
        role: "superadmin",
      },
      {
        id: "admin-2",
        email: "admin@ammufoods.com",
        name: "Ammu Master Admin",
        passwordHash: defaultHash,
        role: "admin",
      },
    ],
    sessions: {},
    resetOtps: {},
  };
}

// In-memory fallback for serverless read-only filesystem
let inMemoryAuthData: AuthData = getDefaultAuthData();

function ensureAuthFile(): AuthData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch (e) {}
    }

    if (!fs.existsSync(AUTH_FILE)) {
      try {
        fs.writeFileSync(AUTH_FILE, JSON.stringify(inMemoryAuthData, null, 2), "utf8");
      } catch (e) {}
      return inMemoryAuthData;
    }

    const raw = fs.readFileSync(AUTH_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed.users || !Array.isArray(parsed.users)) {
      return inMemoryAuthData;
    }
    if (!parsed.sessions) parsed.sessions = {};
    if (!parsed.resetOtps) parsed.resetOtps = {};
    inMemoryAuthData = parsed;
    return parsed;
  } catch (err) {
    return inMemoryAuthData;
  }
}

function saveAuthData(data: AuthData) {
  inMemoryAuthData = data;
  try {
    fs.writeFileSync(AUTH_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    // Graceful on serverless read-only filesystem
  }
}

// Clean up expired sessions and OTPs
function cleanExpired(data: AuthData) {
  const now = Date.now();
  for (const token in data.sessions) {
    if (data.sessions[token].expiresAt < now) {
      delete data.sessions[token];
    }
  }
  for (const email in data.resetOtps) {
    if (data.resetOtps[email].expiresAt < now) {
      delete data.resetOtps[email];
    }
  }
}

// Create a stateless signed token for serverless resilience
function createSignedToken(payload: { userId: string; email: string; name: string; role: string; expiresAt: number }): string {
  const dataStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(dataStr).digest("base64url");
  return `adm_sess_${dataStr}.${signature}`;
}

// Verify a stateless signed token
function verifySignedToken(token: string): AdminUser | null {
  if (!token.startsWith("adm_sess_")) return null;
  const parts = token.slice("adm_sess_".length).split(".");
  if (parts.length !== 2) return null;

  const [dataStr, signature] = parts;
  const expectedSignature = crypto.createHmac("sha256", JWT_SECRET).update(dataStr).digest("base64url");
  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(Buffer.from(dataStr, "base64url").toString("utf8"));
    if (!payload || !payload.expiresAt || payload.expiresAt < Date.now()) {
      return null;
    }
    return {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  } catch (e) {
    return null;
  }
}

// 1. Authenticate Admin with email + password
export function authenticateAdmin(
  emailInput: string,
  passwordInput: string
): { user: AdminUser; token: string } | { error: string } {
  const data = ensureAuthFile();
  cleanExpired(data);

  const cleanEmail = emailInput.trim().toLowerCase();
  const inputHash = hashPassword(passwordInput);

  const user = data.users.find(
    (u) => u.email.toLowerCase() === cleanEmail
  );

  if (!user || user.passwordHash !== inputHash) {
    return { error: "Invalid email address or password. Please verify credentials." };
  }

  // Create session token valid for 7 days
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const expiresAt = Date.now() + sevenDays;

  // Stateless signed token (works across any Vercel serverless lambda container)
  const token = createSignedToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    expiresAt,
  });

  data.sessions[token] = {
    userId: user.id,
    email: user.email,
    expiresAt,
  };

  saveAuthData(data);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
}

// 2. Verify Session Token (checks stateless signature first, then file session)
export function verifySessionToken(token: string): AdminUser | null {
  if (!token) return null;

  // Fast-path: Check stateless signed token
  const signedUser = verifySignedToken(token);
  if (signedUser) return signedUser;

  // Fallback: Check file sessions
  const data = ensureAuthFile();
  cleanExpired(data);

  const session = data.sessions[token];
  if (!session) return null;

  if (session.expiresAt < Date.now()) {
    delete data.sessions[token];
    saveAuthData(data);
    return null;
  }

  const user = data.users.find((u) => u.id === session.userId);
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

// 3. Logout Session
export function logoutSession(token: string): boolean {
  if (!token) return true;
  const data = ensureAuthFile();
  if (data.sessions[token]) {
    delete data.sessions[token];
    saveAuthData(data);
  }
  return true;
}

// 4. Generate 6-Digit Password Reset OTP
export function generatePasswordResetOtp(emailInput: string): {
  success: boolean;
  otp?: string;
  error?: string;
} {
  const data = ensureAuthFile();
  cleanExpired(data);

  const cleanEmail = emailInput.trim().toLowerCase();
  const user = data.users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return {
      success: false,
      error: "No administrator account is registered under this email address.",
    };
  }

  // Generate 6-digit numeric OTP valid for 15 minutes
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const fifteenMinutes = 15 * 60 * 1000;

  data.resetOtps[cleanEmail] = {
    otp,
    expiresAt: Date.now() + fifteenMinutes,
  };

  saveAuthData(data);

  return {
    success: true,
    otp,
  };
}

// 5. Verify OTP and Update Admin Password
export function resetAdminPasswordWithOtp(
  emailInput: string,
  otpInput: string,
  newPasswordInput: string
): { success: boolean; error?: string } {
  const data = ensureAuthFile();
  cleanExpired(data);

  const cleanEmail = emailInput.trim().toLowerCase();
  const otpRecord = data.resetOtps[cleanEmail];

  if (!otpRecord) {
    return {
      success: false,
      error: "No active password reset request found for this email, or the OTP has expired.",
    };
  }

  if (otpRecord.otp !== otpInput.trim()) {
    return {
      success: false,
      error: "Invalid 6-digit OTP code. Please verify the code entered.",
    };
  }

  const user = data.users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    return {
      success: false,
      error: "Admin user not found.",
    };
  }

  if (!newPasswordInput || newPasswordInput.trim().length < 8) {
    return {
      success: false,
      error: "New password must be at least 8 characters long.",
    };
  }

  // Set new password
  user.passwordHash = hashPassword(newPasswordInput);
  delete data.resetOtps[cleanEmail];
  data.sessions = {}; // Invalidate old sessions

  saveAuthData(data);

  return { success: true };
}

export const verifyOtpAndResetPassword = resetAdminPasswordWithOtp;

// 6. Verify Administrator Password Directly
export function verifyAdminPassword(
  emailInput: string,
  passwordInput: string
): boolean {
  const data = ensureAuthFile();
  const cleanEmail = emailInput.trim().toLowerCase();
  const inputHash = hashPassword(passwordInput);

  const user = data.users.find(
    (u) => u.email.toLowerCase() === cleanEmail
  );

  return Boolean(user && user.passwordHash === inputHash);
}
