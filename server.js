require('dotenv').config();

const express   = require('express');
const cors      = require('cors');
const connectDB = require('./src/config/db');

const app = express();

// ── Middleware ───────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Database ─────────────────────────────
connectDB();

// ── Routes ───────────────────────────────
app.use('/api/auth', require('./src/modules/auth/auth.routes'));

// ── Health Check ─────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '💊 PharmaTrack API — Running',
    time:    new Date().toISOString(),
  });
});

// ── 404 ──────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route مش موجود: ${req.originalUrl}`,
  });
});

// ── Global Error Handler ─────────────────
app.use((err, req, res, next) => {
  console.error('❌', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ── Start ────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
  console.log(`📋 Mode: ${process.env.NODE_ENV}`);
});