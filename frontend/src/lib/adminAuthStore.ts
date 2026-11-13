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

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password.trim()).digest("hex");
}

function ensureAuthFile(): AuthData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const defaultHash = hashPassword("AmmuKesar@2026");

  const defaultData: AuthData = {
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

  if (!fs.existsSync(AUTH_FILE)) {
    fs.writeFileSync(AUTH_FILE, JSON.stringify(defaultData, null, 2), "utf8");
    return defaultData;
  }

  try {
    const raw = fs.readFileSync(AUTH_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed.users || !Array.isArray(parsed.users)) {
      fs.writeFileSync(AUTH_FILE, JSON.stringify(defaultData, null, 2), "utf8");
      return defaultData;
    }
    if (!parsed.sessions) parsed.sessions = {};
    if (!parsed.resetOtps) parsed.resetOtps = {};
    return parsed;
  } catch (err) {
    console.error("Failed to read admin-auth.json, resetting defaults:", err);
    fs.writeFileSync(AUTH_FILE, JSON.stringify(defaultData, null, 2), "utf8");
    return defaultData;
  }
}

function saveAuthData(data: AuthData) {
  try {
    fs.writeFileSync(AUTH_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to save admin-auth.json:", err);
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
  const token = `adm_token_${crypto.randomBytes(24).toString("hex")}`;
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  data.sessions[token] = {
    userId: user.id,
    email: user.email,
    expiresAt: Date.now() + sevenDays,
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

// 2. Verify Session Token
export function verifySessionToken(token: string): AdminUser | null {
  if (!token) return null;
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
export function verifyOtpAndResetPassword(
  emailInput: string,
  otpInput: string,
  newPasswordInput: string
): { success: boolean; error?: string } {
  const data = ensureAuthFile();
  cleanExpired(data);

  const cleanEmail = emailInput.trim().toLowerCase();
  const cleanOtp = otpInput.trim();

  if (!newPasswordInput || newPasswordInput.trim().length < 6) {
    return {
      success: false,
      error: "New password must be at least 6 characters in length.",
    };
  }

  const resetEntry = data.resetOtps[cleanEmail];
  if (!resetEntry) {
    return {
      success: false,
      error: "No active password reset request found or the OTP has expired. Please request a new code.",
    };
  }

  if (resetEntry.expiresAt < Date.now()) {
    delete data.resetOtps[cleanEmail];
    saveAuthData(data);
    return {
      success: false,
      error: "Your verification OTP has expired (valid for 15 minutes). Please generate a new code.",
    };
  }

  if (resetEntry.otp !== cleanOtp) {
    return {
      success: false,
      error: "Incorrect verification code. Please check your email and try again.",
    };
  }

  // Find user and update password hash
  const userIndex = data.users.findIndex(
    (u) => u.email.toLowerCase() === cleanEmail
  );

  if (userIndex === -1) {
    return { success: false, error: "User account not found." };
  }

  data.users[userIndex].passwordHash = hashPassword(newPasswordInput);

  // Clear OTP and invalidate previous sessions for safety
  delete data.resetOtps[cleanEmail];
  for (const token in data.sessions) {
    if (data.sessions[token].email.toLowerCase() === cleanEmail) {
      delete data.sessions[token];
    }
  }

  saveAuthData(data);

  return { success: true };
}

// 6. Verify Administrator Password
export function verifyAdminPassword(
  emailOrUserId: string,
  passwordInput: string
): boolean {
  if (!emailOrUserId || !passwordInput) return false;
  const data = ensureAuthFile();
  const inputHash = hashPassword(passwordInput);
  const clean = emailOrUserId.trim().toLowerCase();
  const user = data.users.find(
    (u) => u.email.toLowerCase() === clean || u.id === emailOrUserId
  );
  if (!user) return false;
  return user.passwordHash === inputHash;
}


