# 🌾 AMMU FOODS - Complete Digital Marketing & Marketplace Platform

Authentic platform for **AMMu - Leading Dried Fruits (Pure Kashmiri Saffron)**.  
Includes separated `frontend/` and `backend/` folders for clean, independent updates and deployments.

---

## 📁 Project Architecture

```
ammu foods/
├── frontend/                     # Next.js 14, React 18, Tailwind CSS Marketing App
│   ├── public/images/            # High-res authentic product photos & nutrition facts
│   │   ├── ammu-gold-tin.webp            # AMMu Gold 1g Tin Packaging
│   │   ├── ammu-kashmir-ki-rani-jar.webp # Hexagon Glass Jar with Brass Bowls
│   │   ├── ammu-round-acrylic-jar.webp   # Crystal Jewel Acrylic Container
│   │   ├── ammu-nutrition-facts.webp     # Official Nutrition & FSSAI Pack Label
│   │   └── meesho-*.png                  # Meesho listing references
│   ├── src/
│   │   ├── app/                  # Next.js App Router (Layout & Pages)
│   │   ├── components/           # UI Showcase, Marketplace Buy Links, Purity Guide
│   │   └── lib/products.ts       # Product Catalog with Meesho, Amazon, Flipkart links
│   ├── .env.local                # Frontend environment variables
│   └── package.json
│
├── backend/                      # Standalone Node.js & Express API Server
│   ├── src/
│   │   ├── server.js             # Express server on port 5000
│   │   ├── routes/inquiries.js   # Lead ingestion & inquiry management
│   │   ├── services/emailService.js # Nodemailer email notification service
│   │   └── data/inquiries.json   # Lead database
│   ├── .env                      # Backend environment variables
│   └── package.json
│
└── package.json                  # Workspace script runner
```

---

## 🛒 Marketplace Links on Every Product

Every item in the catalog features one-click direct purchase links:
- **Meesho**: Pre-configured search and product links (`https://www.meesho.com/...`)
- **Amazon**: Direct store listing links (`https://www.amazon.in/...`)
- **Flipkart**: Direct buy links (`https://www.flipkart.com/...`)
- **WhatsApp**: Direct chat to order (`+91 7303817365`)
- **Direct Quote Form**: Pop-up quote / sample inquiry

> **To update marketplace links**: Open `frontend/src/lib/products.ts` and paste your exact listing URLs into `links.meesho`, `links.amazon`, or `links.flipkart`.

---

## 🚀 Running the Apps

### 1. Run Frontend (Marketing Landing Page):
```bash
npm run dev:frontend
```
Opens on **[http://localhost:3000](http://localhost:3000)**.

### 2. Run Backend (Inquiry & Email API):
```bash
npm run dev:backend
```
Runs on **[http://localhost:5000](http://localhost:5000)**.

---

## 📋 Regulatory & Pack Details (From Real Packaging)
- **Brand**: AMMu (Leading Dried Fruits)
- **FSSAI License No.**: `22720559000206`
- **Packaged & Marketed By**: Infinity Food Consumer
- **Facility Address**: JDA Market Veerangana Nagar Medical Jhansi - 284128, Uttar Pradesh
- **Sales & Inquiries**: `+91 7303817365` | `ketansinghniranjan24@gmail.com`
- **Customer Help Desk**: `+91 8090060273` | `ammuonline21@gmail.com`
- **Purity**: 100% Pure Saffron, Grown & Harvested in Kashmir, India (Zero added colors/preservatives).
