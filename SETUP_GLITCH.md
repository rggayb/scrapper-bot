# 🚀 Setup Vercel + Glitch (100% Gratis, No Card!)

Panduan deploy dengan **Glitch** - benar-benar **GRATIS tanpa kartu kredit**!

## ✅ Kenapa Glitch?

- ✅ **Gratis selamanya** (no credit card required!)
- ✅ **Auto-deploy** dari GitHub
- ✅ **Support long-running** processes
- ✅ **Simple setup** (browser-based)
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
- **Value**: `https://placeholder.glitch.me` (update nanti)
- Klik **"Add"**

### 1.4 Deploy

1. Klik **"Deploy"**
2. Tunggu selesai (~2-3 menit)
3. **Copy URL frontend** (contoh: `https://chatgpt-scraper-frontend.vercel.app`)
4. **Simpan URL ini!**

**✅ Frontend selesai!**

---

## 🎯 Step 2: Deploy Backend ke Glitch (5 menit)

### 2.1 Sign Up Glitch

1. Buka: **https://glitch.com**
2. Klik **"Sign In"** atau **"Get Started"**
3. Pilih **"Sign in with GitHub"**
4. Authorize Glitch (gratis, **NO CARD REQUIRED!**)

### 2.2 Create New Project

1. Setelah login, klik **"New Project"**
2. Pilih **"Import from GitHub"**
3. Jika belum connect, klik **"Connect GitHub"** dan authorize
4. Cari repo: `rggayb/scrapper-bot`
5. Klik repo **scrapper-bot**
6. Klik **"Import"**

### 2.3 Configure Project

**Project Settings:**
- **Project Name**: `chatgpt-scraper-api` (atau biarkan auto)
- Glitch akan auto-detect Node.js

**Edit Files:**
1. Klik **"Files"** di sidebar kiri
2. Pastikan file `package.json` ada di root
3. Pastikan `backend/server.js` ada

**Environment Variables (.env):**
1. Klik **".env"** di sidebar (atau buat baru jika tidak ada)
2. Tambahkan:
   ```
   NODE_ENV=production
   PORT=3000
   CLIENT_URL=https://your-frontend.vercel.app
   ```
   (Update CLIENT_URL dengan URL Vercel dari Step 1.4)

**Note**: Glitch akan auto-detect:
- **Start Command**: `npm start` (dari package.json)
- **Port**: Auto (biasanya 3000)

### 2.4 Deploy

1. Glitch akan **auto-deploy** setelah import
2. Tunggu build selesai (~5 menit)
3. Setelah selesai, akan muncul URL di top bar
4. **Copy URL backend** (contoh: `https://chatgpt-scraper-api.glitch.me`)
5. **Simpan URL ini!**

**✅ Backend selesai!**

---

## 🎯 Step 3: Update Environment Variables (2 menit)

### 3.1 Update Vercel (Frontend)

1. Kembali ke **Vercel Dashboard**
2. Klik project **chatgpt-scraper-frontend**
3. Klik tab **"Settings"**
4. Klik **"Environment Variables"**
5. Cari `REACT_APP_API_URL`, klik **"Edit"**
6. Update **Value** dengan URL Glitch backend (dari Step 2.4)
   - Contoh: `https://chatgpt-scraper-api.glitch.me`
7. Klik **"Save"**
8. Klik tab **"Deployments"**
9. Klik **"..."** → **"Redeploy"**
10. Tunggu redeploy selesai (~2 menit)

### 3.2 Update Glitch (Backend)

1. Kembali ke **Glitch Dashboard**
2. Klik project **chatgpt-scraper-api**
3. Klik **".env"** di sidebar
4. Update `CLIENT_URL` dengan URL Vercel frontend (dari Step 1.4)
   - Contoh: `https://chatgpt-scraper-frontend.vercel.app`
5. **Save** (Ctrl+S atau Cmd+S)
6. Glitch akan **auto-reload** (tunggu ~30 detik)

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

## ⚠️ Catatan Penting: Glitch Sleep

**Masalah**: Glitch free tier akan **sleep setelah 5 menit** tidak aktif.

**Solusi**:
1. **UptimeRobot** (gratis): Setup ping setiap 5 menit
   - Sign up: [https://uptimerobot.com](https://uptimerobot.com)
   - Add monitor → URL Glitch backend
   - Interval: 5 minutes
   - Type: HTTP(s)

2. **Atau refresh** manual sebelum pakai

---

## 🐛 Troubleshooting

### Glitch tidak bisa import dari GitHub

**Solusi**:
1. Pastikan GitHub repo sudah public
2. Pastikan sudah authorize Glitch untuk akses GitHub
3. Coba refresh page dan import lagi

### Glitch project tidak jalan

**Solusi**:
1. Cek **Logs** di Glitch (klik "Logs" di sidebar)
2. Pastikan `package.json` ada di root
3. Pastikan `npm start` script ada
4. Pastikan `backend/server.js` ada

### Frontend tidak connect ke backend

**Solusi**:
1. Pastikan `REACT_APP_API_URL` di Vercel = URL Glitch backend
2. Pastikan `CLIENT_URL` di Glitch = URL Vercel frontend
3. Pastikan Glitch project tidak sleep (refresh dulu)

### Puppeteer tidak jalan di Glitch

**Solusi**:
1. Glitch free tier mungkin tidak support Puppeteer
2. Cek logs di Glitch untuk error details
3. Alternatif: Gunakan Browserless.io

---

## 📝 Checklist Final

- [ ] Frontend deployed di Vercel
- [ ] Backend deployed di Glitch
- [ ] `REACT_APP_API_URL` di Vercel = URL backend Glitch
- [ ] `CLIENT_URL` di Glitch = URL frontend Vercel
- [ ] Setup UptimeRobot untuk prevent sleep (opsional)
- [ ] Test aplikasi berhasil

---

## 🎉 Success!

Aplikasi Anda sekarang live di:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.glitch.me`

**100% Gratis, No Credit Card Required!** 🚀

---

## 🔄 Update Deployment

Setelah update code:

```bash
git add .
git commit -m "Update code"
git push
```

**Vercel** akan auto-deploy.

**Glitch**: Klik **"Tools"** → **"Sync GitHub"** untuk sync manual, atau setup auto-sync.

---

**Mau saya bantu setup Glitch sekarang?** Ikuti langkah di atas! 🚀

