# ✅ Deployment Checklist - Vercel + Koyeb

Checklist untuk memastikan semua siap untuk deployment!

## ✅ Code Readiness

### Backend Files
- [x] `backend/server.js` - Express server dengan Socket.IO
- [x] `backend/routes/process.js` - Handle questions (manual/file)
- [x] `backend/routes/status.js` - Check job status
- [x] `backend/routes/download.js` - Download CSV results
- [x] `backend/services/chatgptScraper.js` - Puppeteer scraping
- [x] `backend/services/questionProcessor.js` - Process questions
- [x] `backend/services/fileParser.js` - Parse CSV/Excel
- [x] `backend/services/csvGenerator.js` - Generate CSV
- [x] `backend/services/jobStore.js` - In-memory job storage
- [x] `backend/services/utils.js` - Utilities

### Frontend Files
- [x] `frontend/src/App.js` - Main app component
- [x] `frontend/src/components/QuestionInput.js` - Input component
- [x] `frontend/src/components/ProgressDashboard.js` - Progress component
- [x] `frontend/src/components/ResultsTable.js` - Results component
- [x] `frontend/package.json` - Frontend dependencies

### Config Files
- [x] `package.json` - Root dependencies dengan `npm start` script
- [x] `.gitignore` - Git ignore rules
- [x] `vercel.json` - Vercel config (untuk full-stack test)

### Environment Variables
- [x] Backend menggunakan `process.env.PORT` (default 5000)
- [x] Backend menggunakan `process.env.CLIENT_URL` untuk CORS
- [x] Frontend menggunakan `process.env.REACT_APP_API_URL`

---

## 🚀 Deployment Steps

### Step 1: Deploy Frontend (Vercel)

1. **Login**: https://vercel.com → GitHub
2. **New Project** → Import `scrapper-bot`
3. **Configure**:
   - Root Directory: `frontend`
   - Framework: Create React App
   - Build: `npm run build` (auto)
   - Output: `build` (auto)
4. **Environment Variables**:
   - `REACT_APP_API_URL` = `https://placeholder.koyeb.app` (update nanti)
5. **Deploy** → Copy URL frontend

### Step 2: Deploy Backend (Koyeb)

1. **Login**: https://www.koyeb.com → GitHub
2. **Create App** → GitHub → `scrapper-bot`
3. **Configure**:
   - Type: **Web Service**
   - Build Command: `npm install`
   - Run Command: `npm start`
   - Port: `10000` (atau biarkan default, Koyeb akan set otomatis)
4. **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (atau biarkan Koyeb set otomatis)
   - `CLIENT_URL` = URL Vercel frontend (dari Step 1)
5. **Deploy** → Copy URL backend

### Step 3: Update Environment Variables

1. **Vercel**: Update `REACT_APP_API_URL` = URL Koyeb backend
2. **Redeploy** Vercel
3. **Koyeb**: Update `CLIENT_URL` = URL Vercel frontend (jika belum)
4. **Auto-redeploy** Koyeb

---

## ✅ Post-Deployment Checklist

- [ ] Frontend accessible di Vercel URL
- [ ] Backend accessible di Koyeb URL
- [ ] Health check: `https://backend-url/api/health` returns `{"status":"ok"}`
- [ ] Frontend bisa connect ke backend (no CORS error)
- [ ] Manual question entry works
- [ ] File upload works
- [ ] Real-time progress updates (via polling)
- [ ] Download CSV works

---

## 🐛 Common Issues

### Issue: CORS Error

**Solution**:
- Pastikan `CLIENT_URL` di Koyeb = exact URL Vercel frontend (dengan `https://`)
- Pastikan tidak ada trailing slash
- Redeploy backend setelah update

### Issue: Backend tidak jalan

**Solution**:
- Cek logs di Koyeb dashboard
- Pastikan `PORT` env var sudah set (atau biarkan Koyeb set otomatis)
- Pastikan `npm start` script ada di package.json

### Issue: Puppeteer tidak jalan

**Solution**:
- Koyeb free tier mungkin tidak support Puppeteer
- Cek logs untuk error details
- Consider upgrade atau gunakan Browserless.io

---

## 📝 Quick Reference

**Frontend URL**: `https://your-frontend.vercel.app`
**Backend URL**: `https://your-backend.koyeb.app`

**Environment Variables**:

**Vercel**:
```
REACT_APP_API_URL=https://your-backend.koyeb.app
```

**Koyeb**:
```
NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-frontend.vercel.app
```

---

## 🎉 Ready to Deploy!

Semua code sudah siap! Ikuti panduan di `SETUP_VERCEL_KOYEB.md` untuk deploy! 🚀

