# 🚀 Setup Vercel + Cyclic.sh (100% Gratis, No Card!)

Panduan lengkap deploy dengan **Cyclic.sh** - benar-benar **GRATIS tanpa kartu kredit**!

## ✅ Kenapa Cyclic.sh?

- ✅ **Gratis selamanya** (no credit card required!)
- ✅ **Auto-deploy** dari GitHub
- ✅ **Support long-running** processes (perfect untuk Puppeteer)
- ✅ **No sleep** (unlike Render)
- ✅ **Simple setup** (mirip Heroku)

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
- **Value**: `https://placeholder.cyclic.app` (update nanti)
- Klik **"Add"**

### 1.4 Deploy

1. Klik **"Deploy"**
2. Tunggu selesai (~2-3 menit)
3. **Copy URL frontend** (contoh: `https://chatgpt-scraper-frontend.vercel.app`)
4. **Simpan URL ini!**

**✅ Frontend selesai!**

---

## 🎯 Step 2: Deploy Backend ke Cyclic (5 menit)

### 2.1 Sign Up Cyclic

1. Buka: **https://www.cyclic.sh**
2. Klik **"Get Started"** atau **"Sign Up"**
3. Pilih **"Sign up with GitHub"**
4. Authorize Cyclic (gratis, **NO CARD REQUIRED!**)

### 2.2 Create New App

1. Setelah login, klik **"Create App"** atau **"New App"**
2. Pilih **"Connect GitHub"**
3. Jika belum connect, klik **"Connect GitHub"** dan authorize
4. Setelah connect, cari repo: `scrapper-bot`
5. Klik repo **scrapper-bot**

### 2.3 Configure App

Cyclic akan **auto-detect** Node.js dari `package.json`!

**App Settings:**
- **App Name**: `chatgpt-scraper-api` (atau biarkan auto)
- **Region**: Pilih yang terdekat (atau default)

**Environment Variables:**
Klik **"Environment Variables"** → **"Add Variable"**:

1. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`
   - Klik **"Add"**

2. **PORT**
   - Key: `PORT`
   - Value: `10000` (atau biarkan default, Cyclic akan set otomatis)
   - Klik **"Add"**

3. **CLIENT_URL**
   - Key: `CLIENT_URL`
   - Value: `https://your-frontend.vercel.app` (gunakan URL Vercel dari Step 1.4)
   - Klik **"Add"**

**Note**: Cyclic akan auto-detect:
- **Start Command**: `npm start` (dari package.json)
- **Build**: Auto dari package.json

### 2.4 Deploy

1. Klik **"Deploy"** atau **"Create App"**
2. Tunggu build dan deploy selesai (~5-10 menit)
3. Setelah selesai, akan muncul URL backend
4. **Copy URL backend** (contoh: `https://chatgpt-scraper-api.cyclic.app`)
5. **Simpan URL ini!**

**✅ Backend selesai!**

---

## 🎯 Step 3: Update Environment Variables (2 menit)

### 3.1 Update Vercel (Frontend)

1. Kembali ke **Vercel Dashboard**
2. Klik project **chatgpt-scraper-frontend**
3. Klik tab **"Settings"**
4. Klik **"Environment Variables"**
5. Cari `REACT_APP_API_URL`, klik **"Edit"** (icon pensil)
6. Update **Value** dengan URL Cyclic backend (dari Step 2.4)
   - Contoh: `https://chatgpt-scraper-api.cyclic.app`
7. Klik **"Save"**
8. Klik tab **"Deployments"**
9. Klik **"..."** (three dots) di deployment terbaru → **"Redeploy"**
10. Tunggu redeploy selesai (~2 menit)

### 3.2 Update Cyclic (Backend)

1. Kembali ke **Cyclic Dashboard**
2. Klik app **chatgpt-scraper-api**
3. Klik tab **"Environment"** atau **"Variables"**
4. Cari `CLIENT_URL`, klik **"Edit"**
5. Update **Value** dengan URL Vercel frontend (dari Step 1.4)
   - Contoh: `https://chatgpt-scraper-frontend.vercel.app`
6. Klik **"Save"**
7. Cyclic akan **auto-redeploy** (tunggu ~2 menit)

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

## 🐛 Troubleshooting

### Cyclic tidak bisa deploy

**Gejala**: Build error atau deploy failed

**Solusi**:
1. Cek **Logs** di Cyclic dashboard
2. Pastikan `package.json` ada di root project
3. Pastikan `npm start` script ada di package.json
4. Pastikan `backend/server.js` ada

### Frontend tidak connect ke backend

**Gejala**: Error "Failed to start processing" atau CORS error

**Solusi**:
1. Pastikan `REACT_APP_API_URL` di Vercel = URL Cyclic backend (dengan `https://`)
2. Pastikan `CLIENT_URL` di Cyclic = URL Vercel frontend (dengan `https://`)
3. Redeploy kedua service setelah update env vars

### Puppeteer tidak jalan di Cyclic

**Gejala**: Error saat scraping ChatGPT

**Solusi**:
1. Cyclic free tier mungkin tidak support Puppeteer (butuh Chrome dependencies)
2. Cek logs di Cyclic untuk error details
3. Alternatif:
   - Gunakan Browserless.io (ada free tier)
   - Atau upgrade ke paid plan

### CORS Error

**Gejala**: Browser console error "CORS policy"

**Solusi**:
1. Pastikan `CLIENT_URL` di backend = URL frontend yang **exact** (dengan `https://`, tanpa trailing slash)
2. Redeploy backend setelah update `CLIENT_URL`

---

## 📝 Checklist Final

- [ ] Frontend deployed di Vercel
- [ ] Backend deployed di Cyclic
- [ ] `REACT_APP_API_URL` di Vercel = URL backend Cyclic
- [ ] `CLIENT_URL` di Cyclic = URL frontend Vercel
- [ ] Kedua service sudah redeploy setelah update env vars
- [ ] Test aplikasi berhasil

---

## 🎉 Success!

Aplikasi Anda sekarang live di:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.cyclic.app`

**100% Gratis, No Credit Card Required!** 🚀

---

## 📞 Butuh Bantuan?

Jika ada error atau stuck di step manapun, screenshot error dan saya bantu troubleshoot!

---

## 🔄 Update Deployment

Setelah update code:

```bash
git add .
git commit -m "Update code"
git push
```

Vercel dan Cyclic akan **auto-deploy**! 🚀

