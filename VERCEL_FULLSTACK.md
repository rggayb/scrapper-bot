# 🚀 Deploy Full-Stack di Vercel

Panduan deploy **backend + frontend** semua di Vercel (100% gratis, no card)!

## ⚠️ Kenapa Biasanya Dipisah?

### Masalah dengan Vercel Serverless Functions:

1. **Timeout Limit**:
   - Free tier: **10 detik** maksimal
   - Pro tier: **60 detik** maksimal
   - Puppeteer biasanya butuh **lebih dari 10 detik** untuk scrape ChatGPT

2. **Serverless = Stateless**:
   - Setiap request = function baru
   - Tidak bisa maintain long-running connection
   - Socket.IO butuh persistent connection

3. **Cold Start**:
   - Function pertama kali dipanggil akan lambat
   - Puppeteer perlu launch browser setiap kali

### Tapi... Bisa Dicoba! 🎯

Kita bisa deploy full-stack di Vercel dengan **workaround**:
- Background jobs untuk Puppeteer
- Polling instead of WebSocket
- Optimize Puppeteer untuk lebih cepat

---

## 🚀 Deploy Full-Stack di Vercel

### Step 1: Setup Vercel Configuration

Buat file `vercel.json` di root project:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/build/$1"
    }
  ],
  "functions": {
    "backend/server.js": {
      "maxDuration": 60
    }
  }
}
```

### Step 2: Refactor Backend untuk Vercel

Vercel menggunakan serverless functions, jadi perlu refactor:

**Buat file `api/index.js`** (Vercel serverless function):

```javascript
const express = require('express');
const app = express();

// Import routes
const processRoutes = require('../backend/routes/process');
const statusRoutes = require('../backend/routes/status');
const downloadRoutes = require('../backend/routes/download');

app.use(express.json());
app.use('/api/process', processRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/download', downloadRoutes);

module.exports = app;
```

### Step 3: Deploy ke Vercel

1. **Login ke Vercel**: [https://vercel.com](https://vercel.com)
2. **New Project** → **Import Git Repository**
3. **Pilih repo** `scrapper-bot`
4. **Configure**:
   - **Framework Preset**: `Other`
   - **Root Directory**: `/` (root)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/build`
5. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-app.vercel.app
   ```
6. **Deploy** → Selesai!

---

## ⚠️ Limitations & Workarounds

### Problem 1: Puppeteer Timeout

**Masalah**: Puppeteer butuh >10 detik, tapi Vercel free tier hanya 10 detik.

**Solusi**:
1. **Optimize Puppeteer**:
   - Reuse browser instance (jika mungkin)
   - Skip unnecessary steps
   - Use headless mode

2. **Background Jobs**:
   - Process di background
   - Return job ID immediately
   - Poll status via API

3. **Upgrade ke Pro** ($20/month):
   - 60 detik timeout
   - Lebih cocok untuk Puppeteer

### Problem 2: Socket.IO

**Masalah**: Socket.IO butuh persistent connection, serverless tidak support.

**Solusi**:
- **Gunakan polling** instead of WebSocket
- Frontend poll status setiap 2-3 detik
- Sudah ada di code (polling backup)

### Problem 3: File Uploads

**Masalah**: Serverless functions tidak bisa store files permanently.

**Solusi**:
- **Process file immediately** (parse & delete)
- Atau gunakan **external storage** (S3, dll)

---

## 🎯 Recommended Approach

### Opsi A: Full-Stack Vercel (Simple, tapi ada limitations)

**Pros**:
- ✅ Semua di satu tempat
- ✅ Gratis, no card
- ✅ Auto-deploy dari GitHub
- ✅ CDN global

**Cons**:
- ⚠️ Puppeteer mungkin timeout (10 detik limit)
- ⚠️ No WebSocket (pakai polling)
- ⚠️ File storage terbatas

**Cocok untuk**: Testing, prototype, atau jika Puppeteer bisa di-optimize <10 detik

### Opsi B: Vercel (Frontend) + Koyeb (Backend) - Recommended

**Pros**:
- ✅ Frontend cepat (CDN)
- ✅ Backend no timeout limit
- ✅ Support WebSocket
- ✅ Support long-running Puppeteer
- ✅ Gratis, no card

**Cons**:
- ⚠️ Perlu manage 2 services
- ⚠️ Perlu update 2 environment variables

**Cocok untuk**: Production, aplikasi yang butuh Puppeteer

---

## 🧪 Test Full-Stack Vercel

Mau coba full-stack di Vercel? Ikuti langkah:

1. **Refactor backend** untuk serverless (lihat Step 2)
2. **Deploy ke Vercel**
3. **Test Puppeteer** - cek apakah timeout
4. **Jika timeout** → gunakan Opsi B (Vercel + Koyeb)

---

## 📝 Quick Decision Guide

**Gunakan Full-Stack Vercel jika:**
- ✅ Puppeteer bisa <10 detik
- ✅ Tidak butuh WebSocket real-time
- ✅ Simple setup (satu platform)

**Gunakan Vercel + Koyeb jika:**
- ✅ Puppeteer butuh >10 detik
- ✅ Butuh WebSocket real-time
- ✅ Production-ready
- ✅ Tidak masalah manage 2 services

---

## 🚀 Rekomendasi Final

**Untuk aplikasi ini (Puppeteer scraping):**

**Vercel + Koyeb** lebih recommended karena:
1. Puppeteer biasanya butuh >10 detik
2. WebSocket untuk real-time updates lebih baik
3. No timeout worries
4. Masih gratis, no card

**Tapi** kalau mau coba full-stack Vercel dulu, silakan! Bisa test apakah Puppeteer bisa <10 detik.

---

Mau saya bantu setup full-stack Vercel atau tetap pakai Vercel + Koyeb? 🤔

