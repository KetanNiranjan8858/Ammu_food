# 🌾 Ammu Foods - Node.js Backend API

Standalone Node.js / Express backend service for Ammu Foods. Handles customer inquiry ingestion, persistent JSON logging, and email dispatch to `ketansinghniranjan24@gmail.com`.

---

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   # or with live reloading:
   npm run dev
   ```

The backend runs on **http://localhost:5000**.

---

## 📡 API Endpoints

- **GET `/api/health`**  
  Checks API status and active contact settings.

- **POST `/api/inquiries`**  
  Accepts customer inquiries:
  ```json
  {
    "name": "Ketan Singh",
    "phone": "7303817365",
    "email": "customer@example.com",
    "product": "AMMu Gold Kashmiri Kesar (1g Tin)",
    "quantity": "2 Packs",
    "inquiryType": "Retail Purchase",
    "message": "Delivery to Delhi"
  }
  ```
  Returns:
  - Saves the lead in `src/data/inquiries.json`
  - Sends email to `ketansinghniranjan24@gmail.com`
  - Prepares direct WhatsApp message link

- **GET `/api/inquiries`**  
  Returns all received inquiries for the owner dashboard.

---

## ✉️ Setting Up Gmail Delivery

Add your Google App Password to `.env`:
```env
GMAIL_USER=ketansinghniranjan24@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
NOTIFICATION_EMAIL=ketansinghniranjan24@gmail.com
```

