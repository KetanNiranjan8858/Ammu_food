const nodemailer = require("nodemailer");

async function sendInquiryEmail(inquiry) {
  const targetEmail = process.env.NOTIFICATION_EMAIL || "ketansinghniranjan24@gmail.com";
  const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER;
  const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    return {
      sent: false,
      reason: "SMTP not configured. Add GMAIL_APP_PASSWORD in backend/.env to enable live email delivery.",
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const cleanPhone = inquiry.phone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone}?text=${encodeURIComponent(
    `Hello ${inquiry.name}, thank you for contacting Ammu Foods regarding ${inquiry.product}.`
  )}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFDF9; border: 1px solid #D4AF37; border-radius: 8px; overflow: hidden;">
      <div style="background: #881337; color: #FFF; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">AMMU FOODS</h1>
        <p style="margin: 5px 0 0; color: #FDD835; font-size: 14px;">🌟 New Saffron Product Inquiry Received!</p>
      </div>
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #E5D5C5;">
            <td style="padding: 10px 0; color: #666; font-weight: bold; width: 140px;">Customer Name:</td>
            <td style="padding: 10px 0; color: #222; font-size: 16px;"><strong>${inquiry.name}</strong></td>
          </tr>
          <tr style="border-bottom: 1px solid #E5D5C5;">
            <td style="padding: 10px 0; color: #666; font-weight: bold;">Phone Number:</td>
            <td style="padding: 10px 0; color: #222; font-size: 16px;"><a href="tel:${inquiry.phone}" style="color: #B33010; text-decoration: none;">${inquiry.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #E5D5C5;">
            <td style="padding: 10px 0; color: #666; font-weight: bold;">Email:</td>
            <td style="padding: 10px 0; color: #222;">${inquiry.email || "Not provided"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5D5C5;">
            <td style="padding: 10px 0; color: #666; font-weight: bold;">Product:</td>
            <td style="padding: 10px 0; color: #B33010; font-weight: bold;">${inquiry.product}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5D5C5;">
            <td style="padding: 10px 0; color: #666; font-weight: bold;">Quantity:</td>
            <td style="padding: 10px 0; color: #222;">${inquiry.quantity}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E5D5C5;">
            <td style="padding: 10px 0; color: #666; font-weight: bold;">Inquiry Category:</td>
            <td style="padding: 10px 0; color: #222;">${inquiry.inquiryType}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #666; font-weight: bold; vertical-align: top;">Notes / City:</td>
            <td style="padding: 12px 0; color: #222; background: #F8F4EE; padding: 10px; border-radius: 4px;">${inquiry.message || "No custom message provided."}</td>
          </tr>
        </table>

        <div style="margin-top: 25px; text-align: center;">
          <a href="${whatsappUrl}" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Reply Customer on WhatsApp</a>
        </div>
      </div>
      <div style="background: #F4EBE1; color: #777; padding: 12px; text-align: center; font-size: 12px;">
        Inquiry ID: ${inquiry.id} &bull; Received on ${new Date().toLocaleString()} &bull; Ammu Foods Backend
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Ammu Foods Inquiries" <${smtpUser}>`,
    to: targetEmail,
    subject: `🔴 [Ammu Foods Inquiry] ${inquiry.name} - ${inquiry.product} (${inquiry.quantity})`,
    html,
  });

  return { sent: true, recipient: targetEmail };
}

module.exports = { sendInquiryEmail };

