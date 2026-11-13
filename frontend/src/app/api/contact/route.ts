import { NextRequest, NextResponse } from "next/server";
import { saveInquiry, getAllInquiries, updateInquiryStatus, deleteInquiry } from "@/lib/inquiryStore";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

function getSmtpCredentials() {
  let smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || "";
  let smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "";

  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const [key, ...vals] = trimmed.split("=");
        const val = vals.join("=").trim().replace(/^['"]|['"]$/g, "");
        if ((key.trim() === "GMAIL_USER" || key.trim() === "SMTP_USER") && val) {
          smtpUser = val;
        }
        if ((key.trim() === "GMAIL_APP_PASSWORD" || key.trim() === "SMTP_PASS") && val) {
          smtpPass = val;
        }
      }
    }
  } catch (e) {
    // ignore
  }

  return {
    smtpUser: smtpUser.trim(),
    smtpPass: smtpPass.trim().replace(/\s+/g, ""),
  };
}

function getRegisteredNotificationEmail() {
  let target = process.env.NOTIFICATION_EMAIL || "ketansinghniranjan24@gmail.com";
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed.startsWith("NOTIFICATION_EMAIL=")) {
          const val = trimmed.split("=")[1]?.trim();
          if (val) target = val;
        }
      }
    }
  } catch (e) {}
  return target;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, product, quantity, inquiryType, inquiryTopic, topic, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const resolvedTopic = inquiryTopic || topic || inquiryType || product || "General Inquiry";

    // 1. Save to internal database / inquiry store
    const savedRecord = saveInquiry({
      name,
      phone,
      email: email || "Not provided",
      product: product || resolvedTopic,
      quantity: quantity || "1 Unit",
      inquiryType: resolvedTopic,
      topic: resolvedTopic,
      message: message || "No detailed explanation provided.",
    });

    // 2. Attempt sending email if SMTP credentials are provided
    let emailSent = false;
    let emailNote = "Saved to inquiry records.";

    const { smtpUser, smtpPass } = getSmtpCredentials();

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 1px solid #D4AF37; border-radius: 8px; overflow: hidden;">
            <div style="background: #881337; color: #FFF; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">AMMU FOODS</h1>
              <p style="margin: 5px 0 0; color: #FDD835; font-size: 14px;">🌟 New Saffron Product Inquiry Received!</p>
            </div>
            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #E5D5C5;">
                  <td style="padding: 10px 0; color: #666; font-weight: bold; width: 140px;">Customer Name:</td>
                  <td style="padding: 10px 0; color: #222; font-size: 16px;"><strong>${name}</strong></td>
                </tr>
                <tr style="border-bottom: 1px solid #E5D5C5;">
                  <td style="padding: 10px 0; color: #666; font-weight: bold;">Phone Number:</td>
                  <td style="padding: 10px 0; color: #222; font-size: 16px;"><a href="tel:${phone}" style="color: #B33010; text-decoration: none;">${phone}</a> &nbsp;|&nbsp; <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">WhatsApp</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #E5D5C5;">
                  <td style="padding: 10px 0; color: #666; font-weight: bold;">Email:</td>
                  <td style="padding: 10px 0; color: #222;"><a href="mailto:${email}" style="color: #B33010;">${email || "N/A"}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #E5D5C5;">
                  <td style="padding: 10px 0; color: #666; font-weight: bold;">Inquiry Topic:</td>
                  <td style="padding: 10px 0; color: #B33010; font-weight: bold;">${resolvedTopic}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #666; font-weight: bold; vertical-align: top;">Detailed Explanation:</td>
                  <td style="padding: 12px 0; color: #222; background: #F8F4EE; padding: 10px; border-radius: 4px;">${message || "No detailed explanation provided (optional)."}</td>
                </tr>
              </table>

              <div style="margin-top: 25px; text-align: center;">
                <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(name)},%20thank%20you%20for%20contacting%20Ammu%20Foods%20regarding%20${encodeURIComponent(resolvedTopic)}." style="background: #25D366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Reply via WhatsApp</a>
              </div>
            </div>
            <div style="background: #F4EBE1; color: #777; padding: 12px; text-align: center; font-size: 12px;">
              Inquiry ID: ${savedRecord.id} &bull; Received on ${new Date().toLocaleString()} &bull; Ammu Foods
            </div>
          </div>
        `;

        const targetEmail = getRegisteredNotificationEmail();

        await transporter.sendMail({
          from: `"Ammu Foods Inquiries" <${smtpUser}>`,
          to: targetEmail,
          subject: `🔴 [Ammu Foods Inquiry] ${name} - Topic: ${resolvedTopic}`,
          html: htmlContent,
        });

        emailSent = true;
        emailNote = "Email dispatched successfully to " + targetEmail;
      } catch (mailErr) {
        console.error("Failed to send email via SMTP:", mailErr);
        emailNote = "Logged inquiry, but SMTP send failed. Check credentials.";
      }
    } else {
      emailNote = "Saved inquiry. To enable live Gmail delivery, add GMAIL_APP_PASSWORD in .env.local.";
    }

    return NextResponse.json({
      success: true,
      record: savedRecord,
      emailSent,
      note: emailNote,
      message: "Thank you! Your inquiry has been received. Our team will contact you shortly.",
    });
  } catch (err: any) {
    console.error("Inquiry API Error:", err);
    return NextResponse.json(
      { error: "Internal server error occurred while processing inquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const records = getAllInquiries();
  return NextResponse.json({ inquiries: records });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Inquiry ID and new status are required." },
        { status: 400 }
      );
    }

    const updated = updateInquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { error: "Inquiry not found or could not be updated." },
        { status: 404 }
      );
    }

    const records = getAllInquiries();
    return NextResponse.json({ success: true, inquiries: records });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update inquiry status." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch (e) {}
    }

    if (!id) {
      return NextResponse.json(
        { error: "Inquiry ID is required for deletion." },
        { status: 400 }
      );
    }

    const deleted = deleteInquiry(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Inquiry not found." },
        { status: 404 }
      );
    }

    const records = getAllInquiries();
    return NextResponse.json({ success: true, inquiries: records });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete inquiry." },
      { status: 500 }
    );
  }
}


