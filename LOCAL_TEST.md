# 🧪 Local Testing Guide

Panduan untuk test aplikasi di local sebelum deploy.

## ✅ Status Server

**Backend**: http://localhost:5001
**Frontend**: http://localhost:3000

## 🚀 Cara Menjalankan

### Option 1: Run Bersamaan (Recommended)

```bash
npm run dev
```

Ini akan jalankan backend dan frontend secara bersamaan.

### Option 2: Run Terpisah

**Terminal 1 - Backend:**
```bash
npm run server
# atau
PORT=5001 node backend/server.js
```

**Terminal 2 - Frontend:**
```bash
npm run client
# atau
cd frontend && npm start
```

## 🧪 Test Checklist

- [ ] Backend running di http://localhost:5001
- [ ] Frontend running di http://localhost:3000
- [ ] Health check: http://localhost:5001/api/health
- [ ] Manual question entry works
- [ ] File upload (CSV/Excel) works
- [ ] Real-time progress updates
- [ ] Download CSV results

## 🐛 Troubleshooting

### Port sudah digunakan

**Solution**:
```bash
# Kill process di port 5001
lsof -ti:5001 | xargs kill -9

# Kill process di port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies error

**Solution**:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install
```

### CORS error

**Solution**:
- Pastikan `.env` file ada dengan `CLIENT_URL=http://localhost:3000`
- Restart backend server

---

**Test sekarang dan pastikan semua work sebelum deploy!** 🚀

