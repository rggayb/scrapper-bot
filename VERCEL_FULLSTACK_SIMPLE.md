# 🚀 Deploy Full-Stack di Vercel (Test Timeout)

Panduan simple untuk deploy **semua di Vercel** dan test apakah Puppeteer timeout atau tidak.

## ⚠️ Catatan Penting

**Vercel Serverless Functions punya timeout:**
- **Free tier**: 10 detik maksimal
- **Pro tier**: 60 detik maksimal

Puppeteer biasanya butuh **lebih dari 10 detik**, jadi mungkin akan timeout. Tapi kita test dulu! 🧪

---

## 🎯 Step 1: Deploy ke Vercel (5 menit)

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
- **Project Name**: `chatgpt-scraper` (atau nama lain)
- **Framework Preset**: `Other` (karena kita pakai custom setup)
- **Root Directory**: `/` (root, jangan ubah)
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/build`
- **Install Command**: `cd frontend && npm install`

**Environment Variables:**
- Klik **"Environment Variables"**
- **Key**: `REACT_APP_API_URL`
- **Value**: `https://your-app.vercel.app` (akan auto-update setelah deploy)
- Klik **"Add"**

### 1.4 Deploy

1. Klik **"Deploy"**
2. Tunggu build selesai (~5-10 menit)
3. Setelah selesai, akan muncul URL
4. **Copy URL** (contoh: `https://chatgpt-scraper.vercel.app`)

**✅ Deploy selesai!**

---

## 🧪 Step 2: Test Aplikasi

1. Buka URL Vercel di browser
2. Test dengan **1-2 questions** dulu (jangan banyak-banyak)
3. Cek apakah:
   - ✅ Berhasil scrape ChatGPT?
   - ⚠️ Timeout error?
   - ⚠️ Error lain?

### Jika Timeout:

**Gejala**: Error "Function execution exceeded 10 seconds"

**Artinya**: Puppeteer butuh >10 detik, Vercel free tier tidak cukup.

**Solusi**: 
- Upgrade ke Pro ($20/month) untuk 60 detik timeout
- Atau pakai alternatif: Vercel + Glitch/Replit

### Jika Berhasil:

**Artinya**: Puppeteer bisa selesai <10 detik! 🎉

**Lanjutkan**: Test dengan lebih banyak questions.

---

## 📝 Notes

1. **Vercel akan auto-deploy** setiap push ke GitHub
2. **Environment variables** bisa di-update di Settings
3. **Logs** bisa dilihat di Vercel dashboard → Deployments → Logs

---

## 🐛 Troubleshooting

### Build Error

**Solusi**:
- Pastikan `package.json` ada di root
- Pastikan `frontend/package.json` ada
- Check build logs di Vercel

### API tidak jalan

**Solusi**:
- Pastikan `api/index.js` ada
- Pastikan routes di `backend/routes/` ada
- Check function logs di Vercel

### Timeout Error

**Solusi**:
- Ini expected untuk Puppeteer
- Consider upgrade ke Pro atau pakai alternatif

---

## 🎯 Next Steps

**Jika timeout:**
- Pakai **Vercel + Glitch** (lihat `SETUP_GLITCH.md`)
- Atau **Vercel + Replit** (lihat `SETUP_REPLIT.md`)

**Jika berhasil:**
- Lanjutkan pakai Vercel full-stack! 🎉

---

**Test sekarang dan lihat hasilnya!** 🚀

