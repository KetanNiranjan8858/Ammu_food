const express = require("express");
const fs = require("fs");
const path = require("path");
const { sendInquiryEmail } = require("../services/emailService");

const router = express.Router();
const DATA_FILE = path.join(__dirname, "..", "data", "inquiries.json");

function readInquiries() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]", "utf8");
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading inquiries file:", err);
    return [];
  }
}

function writeInquiries(list) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing inquiries file:", err);
  }
}

// POST /api/inquiries - Record a new inquiry & send email notification
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, product, quantity, inquiryType, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and Phone number are required." });
    }

    const record = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name,
      phone,
      email: email || "Not provided",
      product: product || "Ammu Pure Kashmiri Saffron (1g)",
      quantity: quantity || "1 Unit",
      inquiryType: inquiryType || "Retail Purchase",
      message: message || "Interested in Ammu Foods Saffron.",
      createdAt: new Date().toISOString(),
      status: "new",
    };

    // Save record
    const list = readInquiries();
    list.unshift(record);
    writeInquiries(list);

    // Send email
    let emailStatus = { sent: false, note: "No credentials" };
    try {
      emailStatus = await sendInquiryEmail(record);
    } catch (mailErr) {
      console.error("Failed to send email:", mailErr.message);
      emailStatus = { sent: false, note: mailErr.message };
    }

    const ownerPhone = process.env.OWNER_PHONE || "7303817365";
    const whatsappUrl = `https://wa.me/91${ownerPhone}?text=${encodeURIComponent(
      `Hello Ammu Foods! My name is ${name}. I want to inquire about ${record.product} (${record.quantity}).`
    )}`;

    return res.status(201).json({
      success: true,
      record,
      emailStatus,
      whatsappUrl,
      message: "Thank you! Your inquiry has been received. Our team will contact you shortly.",
    });
  } catch (err) {
    console.error("Error handling inquiry:", err);
    return res.status(500).json({ error: "Internal server error occurred." });
  }
});

// GET /api/inquiries - List recorded inquiries
router.get("/", (req, res) => {
  const list = readInquiries();
  return res.json({ inquiries: list, count: list.length });
});

module.exports = router;

