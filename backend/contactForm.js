const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const rateLimit = require("express-rate-limit");
const app = express();          // ← This line is missing in your snippet!
const port = 5000;
const contactLimiter = rateLimit({
  windowMs : 30 * 60 * 1000,
  max: 5,
  message: {
    error: `ban da gui qua nhieu yeu cau, vui long thu lai sau 30 phut`
  },
  standardHeaders: true,
  legacyHeaders: false,
})
// Middleware
app.use(cors());
app.use(express.json());     // or express.json() in newer Express versions
////////////////// app.use('/api/contact', contactLimiter);
// Postgres connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Optional: Log when connection is ready (good for debugging)
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL');
  release();
});

// Your route (this part is good)
app.post('/api/contact', async (req, res) => {
  const { full_name, phone, email, subject, message } = req.body;

  if (!full_name?.trim() || !phone?.trim() || !subject?.trim()) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  const phoneNumber = parsePhoneNumberFromString(phone.trim());

  if (!phoneNumber || !phoneNumber.isValid()) {
    return res.status(400).json({
      error: 'Số điện thoại không hợp lệ. Vui lòng nhập số hợp lệ (quốc tế hoặc Việt Nam).',
    });
  }

  const standardizedPhone = phoneNumber.format('E.164');
  // Limit consulting_detail (message) - truncate to ~200 words / 1200 chars
  const MAX_DETAIL_CHARS = 3000;
  const detail = message 
    ? message.trim().substring(0, MAX_DETAIL_CHARS) 
    : null;

  if (message && message.length > MAX_DETAIL_CHARS) {
    console.warn(`Message truncated from ${message.length} to ${MAX_DETAIL_CHARS} chars`);
  }

  try {
    const query = `
      INSERT INTO "contactForm" (
        name,
        phone_number,
        email,
        consulting_content,
        consulting_detail
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at;
    `;

    const values = [
      full_name.trim(),
      phone.trim(),
      email ? email.trim() : null,
      subject.trim(),
      detail
    ];

    const result = await pool.query(query, values);
    
    res.status(201).json({ 
      success: true, 
      id: result.rows[0].id,
      created_at: result.rows[0].created_at
    });
    
  } catch (error) {
    console.error('Database insert error:', error.message);
    res.status(500).json({ 
      error: 'Không thể lưu thông tin. Vui lòng thử lại sau.' 
    });
  }
});

// Optional: Add this GET route to test if data is saved
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "contactForm" ORDER BY created_at DESC LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
