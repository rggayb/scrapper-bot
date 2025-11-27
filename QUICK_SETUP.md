# ⚡ Quick Setup - Vercel + Koyeb

**Panduan super simple** untuk deploy aplikasi Anda!

## 🎯 Yang Perlu Dilakukan

Saya sudah buat panduan lengkap di **`SETUP_VERCEL_KOYEB.md`** dengan step-by-step detail.

Tapi kalau mau **quick version**, ikuti ini:

---

## 📝 Step 1: Deploy Frontend (Vercel) - 3 menit

1. Buka **https://vercel.com** → Login dengan GitHub
2. **New Project** → Pilih repo `scrapper-bot`
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Create React App (auto)
4. **Environment Variables**:
   - `REACT_APP_API_URL` = `https://placeholder.koyeb.app` (update nanti)
5. **Deploy** → Copy URL frontend

---

## 📝 Step 2: Deploy Backend (Koyeb) - 5 menit

1. Buka **https://www.koyeb.com** → Login dengan GitHub
2. **Create App** → GitHub → Pilih repo `scrapper-bot`
3. Configure:
   - **Type**: Web Service
   - **Build**: `npm install`
   - **Run**: `npm start`
   - **Port**: `10000`
4. **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `CLIENT_URL` = URL Vercel frontend (dari Step 1)
5. **Deploy** → Copy URL backend

---

## 📝 Step 3: Update URLs - 1 menit

1. **Vercel**: Update `REACT_APP_API_URL` = URL backend Koyeb
2. **Redeploy** Vercel

---

## ✅ Selesai!

Buka URL Vercel dan test aplikasi!

---

## ⚠️ Catatan Penting

**Backend files perlu dibuat dulu!** 

Saya lihat backend folder tidak ada di repository. Perlu saya buat ulang backend files dulu sebelum deploy, atau Anda punya backup?

Kalau perlu saya buat ulang, saya bisa buat sekarang! 🚀

