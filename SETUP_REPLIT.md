# 🚀 Setup Vercel + Replit (100% Gratis, No Card!)

Panduan deploy dengan **Replit** - benar-benar **GRATIS tanpa kartu kredit**!

## ✅ Kenapa Replit?

- ✅ **Gratis selamanya** (no credit card required!)
- ✅ **Auto-deploy** dari GitHub
- ✅ **Support long-running** processes
- ✅ **Browser-based** (semua di browser)
- ⚠️ Service sleep setelah tidak aktif (tapi bisa di-refresh)

---

## 🎯 Step 1: Deploy Frontend ke Vercel (3 menit)

### 1.1 Login ke Vercel

1. Buka: **https://vercel.com**
2. Klik **"Sign Up"** atau **"Log In"**
3. Pilih **"Continue with GitHub"**
4. Authorize (gratis, no card)

### 1.2 Create Project

1. Klik **"Add New..."** → **"Project"**
2. Cari repo: `rggayb/scrapper-bot`
3. Klik **"Import"**

### 1.3 Configure

**Project Settings:**
- **Project Name**: `chatgpt-scraper-frontend`
- **Framework Preset**: `Create React App` (auto)
- **Root Directory**: Klik **"Edit"** → ketik: `frontend`
- **Build Command**: `npm run build` (auto)
- **Output Directory**: `build` (auto)

**Environment Variables:**
- Klik **"Environment Variables"**
- **Key**: `REACT_APP_API_URL`
- **Value**: `https://placeholder.repl.co` (update nanti)
- Klik **"Add"**

### 1.4 Deploy

1. Klik **"Deploy"**
2. Tunggu selesai (~2-3 menit)
3. **Copy URL frontend** (contoh: `https://chatgpt-scraper-frontend.vercel.app`)
4. **Simpan URL ini!**

**✅ Frontend selesai!**

---

## 🎯 Step 2: Deploy Backend ke Replit (5 menit)

### 2.1 Sign Up Replit

1. Buka: **https://replit.com**
2. Klik **"Sign Up"** atau **"Log In"**
3. Pilih **"Continue with GitHub"**
4. Authorize Replit (gratis, **NO CARD REQUIRED!**)

### 2.2 Create Repl

1. Setelah login, klik **"Create Repl"** atau **"+"** di sidebar
2. Pilih **"Import from GitHub"**
3. Jika belum connect, klik **"Connect GitHub"** dan authorize
4. Cari repo: `rggayb/scrapper-bot`
5. Klik repo **scrapper-bot**
6. Klik **"Import"**

### 2.3 Configure Repl

**Repl Settings:**
- **Name**: `chatgpt-scraper-api` (atau biarkan auto)
- **Language**: Node.js (auto-detect)

**Edit Files:**
1. Pastikan file `package.json` ada di root
2. Pastikan `backend/server.js` ada

**Environment Variables (.env):**
1. Klik **"Secrets"** tab (di sidebar kiri)
2. Atau buat file `.env` di root
3. Tambahkan:
   ```
   NODE_ENV=production
   PORT=3000
   CLIENT_URL=https://your-frontend.vercel.app
   ```
   (Update CLIENT_URL dengan URL Vercel dari Step 1.4)

**Note**: Replit akan auto-detect:
- **Start Command**: `npm start` (dari package.json)
- **Port**: Auto (biasanya 3000)

### 2.4 Run & Deploy

1. Klik **"Run"** button (green play button)
2. Replit akan install dependencies dan start server
3. Tunggu selesai (~5 menit)
4. Setelah running, akan muncul URL di top bar
5. **Copy URL backend** (contoh: `https://chatgpt-scraper-api.repl.co`)
6. **Simpan URL ini!**

**✅ Backend selesai!**

---

## 🎯 Step 3: Update Environment Variables (2 menit)

### 3.1 Update Vercel (Frontend)

1. Kembali ke **Vercel Dashboard**
2. Klik project **chatgpt-scraper-frontend**
3. Klik tab **"Settings"**
4. Klik **"Environment Variables"**
5. Cari `REACT_APP_API_URL`, klik **"Edit"**
6. Update **Value** dengan URL Replit backend (dari Step 2.4)
   - Contoh: `https://chatgpt-scraper-api.repl.co`
7. Klik **"Save"**
8. Klik tab **"Deployments"**
9. Klik **"..."** → **"Redeploy"**
10. Tunggu redeploy selesai (~2 menit)

### 3.2 Update Replit (Backend)

1. Kembali ke **Replit**
2. Klik repl **chatgpt-scraper-api**
3. Klik **"Secrets"** tab atau edit `.env` file
4. Update `CLIENT_URL` dengan URL Vercel frontend (dari Step 1.4)
   - Contoh: `https://chatgpt-scraper-frontend.vercel.app`
5. **Save** (Ctrl+S atau Cmd+S)
6. Klik **"Run"** lagi untuk restart

**✅ Environment variables updated!**

---

## ✅ Step 4: Test Aplikasi

1. Buka URL frontend di browser (dari Step 1.4)
2. Test fitur:
   - ✅ Manual question entry
   - ✅ File upload (CSV/Excel)
   - ✅ Real-time progress
   - ✅ Download CSV results

**Jika semua work → 🎉 SELESAI!**

---

## ⚠️ Catatan Penting: Replit Sleep

**Masalah**: Replit free tier akan **sleep setelah tidak aktif**.

**Solusi**:
1. **UptimeRobot** (gratis): Setup ping setiap 5 menit
   - Sign up: [https://uptimerobot.com](https://uptimerobot.com)
   - Add monitor → URL Replit backend
   - Interval: 5 minutes

2. **Atau refresh** manual sebelum pakai

---

## 🐛 Troubleshooting

### Replit tidak bisa import dari GitHub

**Solusi**:
1. Pastikan GitHub repo sudah public
2. Pastikan sudah authorize Replit untuk akses GitHub
3. Coba refresh page dan import lagi

### Replit tidak jalan

**Solusi**:
1. Cek **Console** di Replit (bottom panel)
2. Pastikan `package.json` ada di root
3. Pastikan `npm start` script ada
4. Pastikan `backend/server.js` ada
5. Klik **"Run"** button

### Frontend tidak connect ke backend

**Solusi**:
1. Pastikan `REACT_APP_API_URL` di Vercel = URL Replit backend
2. Pastikan `CLIENT_URL` di Replit = URL Vercel frontend
3. Pastikan Replit repl tidak sleep (klik "Run" dulu)

### Puppeteer tidak jalan di Replit

**Solusi**:
1. Replit free tier mungkin tidak support Puppeteer
2. Cek console di Replit untuk error details
3. Alternatif: Gunakan Browserless.io

---

## 📝 Checklist Final

- [ ] Frontend deployed di Vercel
- [ ] Backend deployed di Replit
- [ ] `REACT_APP_API_URL` di Vercel = URL backend Replit
- [ ] `CLIENT_URL` di Replit = URL frontend Vercel
- [ ] Setup UptimeRobot untuk prevent sleep (opsional)
- [ ] Test aplikasi berhasil

---

## 🎉 Success!

Aplikasi Anda sekarang live di:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.repl.co`

**100% Gratis, No Credit Card Required!** 🚀

---

**Mau saya bantu setup Replit sekarang?** Ikuti langkah di atas! 🚀

