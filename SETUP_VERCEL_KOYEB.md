# 🚀 Setup Vercel + Koyeb - Step by Step

Panduan lengkap setup aplikasi di **Vercel (Frontend) + Koyeb (Backend)**.

## 📋 Prerequisites

- ✅ Code sudah di GitHub: `https://github.com/rggayb/scrapper-bot`
- ✅ Akun GitHub (sudah punya)
- ✅ 10 menit waktu

---

## 🎯 Step 1: Deploy Frontend ke Vercel (5 menit)

### 1.1 Login ke Vercel

1. Buka browser, kunjungi: **https://vercel.com**
2. Klik **"Sign Up"** atau **"Log In"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel untuk akses GitHub (gratis, no card)

### 1.2 Create New Project

1. Setelah login, klik **"Add New..."** → **"Project"**
2. Atau klik **"New Project"** di dashboard

### 1.3 Import Repository

1. Di halaman "Import Git Repository":
   - Cari atau ketik: `rggayb/scrapper-bot`
   - Klik repository **scrapper-bot**

2. Klik **"Import"**

### 1.4 Configure Project

Di halaman "Configure Project", isi:

**Project Settings:**
- **Project Name**: `chatgpt-scraper-frontend` (atau nama lain)
- **Framework Preset**: Pilih **"Create React App"** (auto-detect)
- **Root Directory**: Klik **"Edit"** → ketik: `frontend`
- **Build Command**: `npm run build` (auto, jangan diubah)
- **Output Directory**: `build` (auto, jangan diubah)
- **Install Command**: `npm install` (auto, jangan diubah)

**Environment Variables:**
- Klik **"Environment Variables"**
- Klik **"Add"**
- **Key**: `REACT_APP_API_URL`
- **Value**: `https://placeholder.koyeb.app` (update nanti setelah backend deploy)
- Klik **"Add"**

### 1.5 Deploy

1. Scroll ke bawah, klik **"Deploy"**
2. Tunggu build selesai (~2-3 menit)
3. Setelah selesai, akan muncul **"Congratulations!"**
4. **Copy URL frontend** (contoh: `https://chatgpt-scraper-frontend.vercel.app`)
5. **Simpan URL ini** - akan dipakai nanti!

**✅ Frontend selesai!**

---

## 🎯 Step 2: Deploy Backend ke Koyeb (5 menit)

### 2.1 Login ke Koyeb

1. Buka browser baru/tab baru, kunjungi: **https://www.koyeb.com**
2. Klik **"Sign Up"** atau **"Get Started"**
3. Pilih **"Continue with GitHub"**
4. Authorize Koyeb untuk akses GitHub (gratis, no card)

### 2.2 Create App

1. Setelah login, di dashboard klik **"Create App"**
2. Atau klik tombol **"Create App"** di pojok kanan atas

### 2.3 Connect GitHub

1. Di halaman "Create App", pilih tab **"GitHub"**
2. Jika belum connect, klik **"Connect GitHub"** dan authorize
3. Setelah connect, cari repository: `scrapper-bot`
4. Klik repository **scrapper-bot**

### 2.4 Configure Backend

Di halaman "Configure your service", isi:

**Service Settings:**
- **Name**: `chatgpt-scraper-api` (atau nama lain)
- **Type**: Pilih **"Web Service"** (bukan Static Site)
- **Region**: Pilih yang terdekat (misal: `Singapore` untuk Indonesia)

**Build & Run Settings:**
- **Build Command**: `npm install`
- **Run Command**: `npm start`
- **Port**: `10000` (atau biarkan default, tapi pastikan backend menggunakan PORT dari env)

**Environment Variables:**
Klik **"Environment Variables"** → **"Add Variable"**, tambahkan:

1. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`
   - Klik **"Add"**

2. **PORT**
   - Key: `PORT`
   - Value: `10000`
   - Klik **"Add"`

3. **CLIENT_URL**
   - Key: `CLIENT_URL`
   - Value: `https://your-frontend.vercel.app` (gunakan URL Vercel dari Step 1.5)
   - Klik **"Add"**

### 2.5 Deploy

1. Scroll ke bawah, klik **"Deploy"**
2. Tunggu build dan deploy selesai (~5-10 menit)
3. Setelah selesai, akan muncul URL backend
4. **Copy URL backend** (contoh: `https://chatgpt-scraper-api-xxxxx.koyeb.app`)
5. **Simpan URL ini** - akan dipakai nanti!

**✅ Backend selesai!**

---

## 🎯 Step 3: Update Environment Variables (2 menit)

### 3.1 Update Vercel (Frontend)

1. Kembali ke **Vercel Dashboard**
2. Klik project **chatgpt-scraper-frontend**
3. Klik tab **"Settings"**
4. Klik **"Environment Variables"** di sidebar kiri
5. Cari `REACT_APP_API_URL`, klik **"Edit"** (icon pensil)
6. Update **Value** dengan URL backend dari Koyeb (Step 2.5)
   - Contoh: `https://chatgpt-scraper-api-xxxxx.koyeb.app`
7. Klik **"Save"**
8. Klik tab **"Deployments"**
9. Klik **"..."** (three dots) di deployment terbaru → **"Redeploy"**
10. Tunggu redeploy selesai (~2 menit)

### 3.2 Update Koyeb (Backend)

1. Kembali ke **Koyeb Dashboard**
2. Klik app **chatgpt-scraper-api**
3. Klik tab **"Variables"**
4. Cari `CLIENT_URL`, klik **"Edit"**
5. Update **Value** dengan URL frontend dari Vercel (Step 1.5)
   - Contoh: `https://chatgpt-scraper-frontend.vercel.app`
6. Klik **"Save"**
7. Koyeb akan **auto-redeploy** (tunggu ~2 menit)

**✅ Environment variables updated!**

---

## ✅ Step 4: Test Aplikasi

1. Buka URL frontend di browser (dari Step 1.5)
2. Test fitur:
   - ✅ Manual question entry
   - ✅ File upload (CSV/Excel)
   - ✅ Real-time progress
   - ✅ Download CSV results

**Jika semua work → 🎉 SELESAI!**

---

## 🐛 Troubleshooting

### Frontend tidak connect ke backend

**Gejala**: Error "Failed to start processing" atau CORS error

**Solusi**:
1. Pastikan `REACT_APP_API_URL` di Vercel = URL backend Koyeb (dengan `https://`)
2. Pastikan `CLIENT_URL` di Koyeb = URL frontend Vercel (dengan `https://`)
3. Redeploy kedua service setelah update env vars

### Backend tidak jalan di Koyeb

**Gejala**: Build success tapi service tidak running

**Solusi**:
1. Cek **Logs** di Koyeb dashboard
2. Pastikan `PORT` env var = `10000` (atau sesuai yang digunakan backend)
3. Pastikan `Run Command` = `npm start`
4. Pastikan `package.json` ada script `start`

### Puppeteer tidak jalan

**Gejala**: Error saat scraping ChatGPT

**Solusi**:
1. Koyeb free tier mungkin tidak support Puppeteer
2. Cek logs di Koyeb untuk error details
3. Alternatif: Upgrade ke paid plan atau gunakan Browserless.io

### CORS Error

**Gejala**: Browser console error "CORS policy"

**Solusi**:
1. Pastikan `CLIENT_URL` di backend = URL frontend yang **exact** (dengan `https://`, tanpa trailing slash)
2. Redeploy backend setelah update `CLIENT_URL`

---

## 📝 Checklist Final

- [ ] Frontend deployed di Vercel
- [ ] Backend deployed di Koyeb
- [ ] `REACT_APP_API_URL` di Vercel = URL backend Koyeb
- [ ] `CLIENT_URL` di Koyeb = URL frontend Vercel
- [ ] Kedua service sudah redeploy setelah update env vars
- [ ] Test aplikasi berhasil

---

## 🎉 Success!

Aplikasi Anda sekarang live di:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.koyeb.app`

**100% Gratis, No Credit Card Required!** 🚀

---

## 📞 Butuh Bantuan?

Jika ada error atau stuck di step manapun, screenshot error dan saya bantu troubleshoot!

