# 🆓 Deploy GRATIS Tanpa Kartu Kredit

Alternatif deployment yang **100% gratis** dan **TIDAK perlu kartu kredit**!

## 🎯 Recommended: Vercel (Frontend) + Koyeb/Cyclic (Backend)

### ✅ Kenapa kombinasi ini?
- ✅ **Vercel**: Gratis, no card, CDN global, sangat cepat
- ✅ **Koyeb/Cyclic**: Gratis, no card, support long-running process
- ✅ **Simple**: Setup mudah, auto-deploy dari GitHub

---

## 🚀 Opsi 1: Vercel + Koyeb (Recommended)

### Step 1: Deploy Frontend ke Vercel (Gratis, No Card)

1. **Login ke Vercel**: [https://vercel.com](https://vercel.com)
   - Bisa login dengan GitHub (gratis, no card)

2. **New Project** → **Import Git Repository**
   - Pilih repo `scrapper-bot`

3. **Configure**:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `build` (auto)
   - **Install Command**: `npm install` (auto)

4. **Environment Variables** → Add:
   ```
   REACT_APP_API_URL=https://your-backend-url.koyeb.app
   ```
   (Update nanti setelah backend deploy)

5. **Deploy** → Tunggu selesai (~2 menit)

6. **Copy URL frontend** (contoh: `https://scrapper-bot.vercel.app`)

### Step 2: Deploy Backend ke Koyeb (Gratis, No Card)

1. **Login ke Koyeb**: [https://www.koyeb.com](https://www.koyeb.com)
   - Sign up dengan GitHub (gratis, no card)

2. **Create App** → **GitHub**
   - Pilih repo `scrapper-bot`

3. **Configure**:
   - **Name**: `chatgpt-scraper-api`
   - **Type**: `Web Service`
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`
   - **Port**: `10000`

4. **Environment Variables** → Add:
   ```
   NODE_ENV=production
   PORT=10000
   CLIENT_URL=https://your-frontend.vercel.app
   ```
   (Update dengan URL Vercel dari Step 1)

5. **Deploy** → Tunggu selesai (~5 menit)

6. **Copy URL backend** (contoh: `https://chatgpt-scraper-api-xxxxx.koyeb.app`)

### Step 3: Update Environment Variables

1. **Vercel**: Update `REACT_APP_API_URL` dengan URL Koyeb backend
2. **Koyeb**: Update `CLIENT_URL` dengan URL Vercel frontend
3. **Redeploy** kedua service

### ✅ Selesai!

---

## 🚀 Opsi 2: Vercel + Cyclic.sh

### Backend di Cyclic.sh (Gratis, No Card)

1. **Login ke Cyclic**: [https://www.cyclic.sh](https://www.cyclic.sh)
   - Sign up dengan GitHub (gratis, no card)

2. **New App** → **Connect GitHub**
   - Pilih repo `scrapper-bot`

3. **Configure**:
   - **Root Directory**: `/` (root)
   - **Start Command**: `npm start`
   - Cyclic akan auto-detect Node.js

4. **Environment Variables**:
   ```
   NODE_ENV=production
   CLIENT_URL=https://your-frontend.vercel.app
   ```

5. **Deploy** → Auto-deploy dari GitHub

6. **Copy URL backend** (contoh: `https://scrapper-bot.cyclic.app`)

**Frontend tetap di Vercel** seperti di Opsi 1.

---

## 🚀 Opsi 3: Netlify (Frontend) + Koyeb (Backend)

### Frontend di Netlify (Gratis, No Card)

1. **Login ke Netlify**: [https://app.netlify.com](https://app.netlify.com)
   - Sign up dengan GitHub (gratis, no card)

2. **Add new site** → **Import an existing project**
   - Connect GitHub → Pilih repo `scrapper-bot`

3. **Configure**:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/build`

4. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.koyeb.app
   ```

5. **Deploy site** → Tunggu selesai

6. **Copy URL frontend** (contoh: `https://scrapper-bot.netlify.app`)

**Backend di Koyeb** seperti di Opsi 1 Step 2.

---

## 🚀 Opsi 4: Replit (Full Stack - Experimental)

**Replit** menyediakan free tier tanpa kartu kredit, tapi setup lebih kompleks.

1. **Login ke Replit**: [https://replit.com](https://replit.com)
2. **Create Repl** → **Import from GitHub**
3. Setup environment variables
4. Deploy

**Note**: Replit lebih untuk development, kurang ideal untuk production.

---

## 📊 Perbandingan Platform (No Card Required)

| Platform | Free Tier | No Card? | Puppeteer? | Sleep? |
|----------|-----------|----------|------------|--------|
| **Vercel** | ✅ Ya | ✅ Ya | ❌ No | ❌ No |
| **Netlify** | ✅ Ya | ✅ Ya | ❌ No | ❌ No |
| **Koyeb** | ✅ Ya | ✅ Ya | ✅ Mungkin | ⚠️ Mungkin |
| **Cyclic** | ✅ Ya | ✅ Ya | ✅ Mungkin | ⚠️ Mungkin |
| **Render** | ✅ Ya | ❌ No | ✅ Mungkin | ✅ Ya |
| **Railway** | ⚠️ $1/bulan | ✅ Ya | ✅ Ya | ❌ No |

---

## 🎯 Rekomendasi Final

**Untuk 100% Gratis + No Card:**

1. **Vercel (Frontend) + Koyeb (Backend)** ⭐ **Paling Recommended**
   - Simple setup
   - No card required
   - Frontend sangat cepat
   - Backend support long-running

2. **Vercel (Frontend) + Cyclic (Backend)**
   - Alternatif jika Koyeb tidak work
   - Setup mirip

3. **Netlify (Frontend) + Koyeb (Backend)**
   - Jika prefer Netlify

---

## ⚠️ Catatan Penting

### Puppeteer di Free Tier

**Masalah**: Puppeteer butuh Chrome dependencies yang besar.

**Solusi**:
1. **Test dulu** - Mungkin work di Koyeb/Cyclic free tier
2. **Jika tidak work**:
   - Gunakan Browserless.io (ada free tier)
   - Atau refactor untuk tidak pakai Puppeteer

### Service Sleep

- Koyeb/Cyclic mungkin sleep setelah tidak aktif
- Vercel/Netlify tidak sleep (static site)

**Solusi**: Setup UptimeRobot untuk ping backend setiap 5 menit

---

## 📝 Quick Start (Vercel + Koyeb)

### 1. Frontend (Vercel) - 2 menit
```
1. Login Vercel (GitHub)
2. New Project → Import scrapper-bot
3. Root: frontend
4. Deploy
```

### 2. Backend (Koyeb) - 5 menit
```
1. Login Koyeb (GitHub)
2. Create App → GitHub → scrapper-bot
3. Type: Web Service
4. Run: npm start
5. Add env vars
6. Deploy
```

### 3. Update URLs - 1 menit
```
1. Vercel: Update REACT_APP_API_URL
2. Koyeb: Update CLIENT_URL
3. Redeploy
```

**Total: ~8 menit, 100% gratis, no card!** 🚀

---

## 🆘 Troubleshooting

### Koyeb tidak bisa deploy
- Cek build command: `npm install`
- Cek start command: `npm start`
- Pastikan `package.json` ada di root

### Vercel build error
- Pastikan root directory: `frontend`
- Pastikan build command: `npm run build`
- Check environment variables

### CORS error
- Pastikan `CLIENT_URL` di backend = URL frontend yang benar
- Include `https://` di URL

---

Selamat deploy! 🎉

