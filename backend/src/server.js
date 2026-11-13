require("dotenv").config();
const express = require("express");
const cors = require("cors");
const inquiriesRouter = require("./routes/inquiries");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
}));
app.use(express.json());

// Routes
app.use("/api/inquiries", inquiriesRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Ammu Foods Backend API",
    time: new Date().toISOString(),
    recipient: process.env.NOTIFICATION_EMAIL || "ketansinghniranjan24@gmail.com",
    phone: process.env.OWNER_PHONE || "7303817365",
  });
});

app.listen(PORT, () => {
  console.log(`🌾 Ammu Foods Backend running on http://localhost:${PORT}`);
  console.log(`📩 Inquiries will notify: ${process.env.NOTIFICATION_EMAIL || "ketansinghniranjan24@gmail.com"}`);
  console.log(`📱 WhatsApp dispatch: ${process.env.OWNER_PHONE || "7303817365"}`);
});

