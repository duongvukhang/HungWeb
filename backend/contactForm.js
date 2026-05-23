const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const rateLimit = require("express-rate-limit");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const contactLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 5,
  message: { error: 'ban da gui qua nhieu yeu cau, vui long thu lai sau 30 phut' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, async (req, res) => {
  const { full_name, phone, email, subject, message } = req.body;

  if (!full_name?.trim() || !phone?.trim() || !subject?.trim()) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  const phoneNumber = parsePhoneNumberFromString(phone.trim());
  if (!phoneNumber || !phoneNumber.isValid()) {
    return res.status(400).json({
      error: 'Số điện thoại không hợp lệ.',
    });
  }

  const MAX_DETAIL_CHARS = 3000;
  const detail = message ? message.trim().substring(0, MAX_DETAIL_CHARS) : null;

  try {
    const query = `
      INSERT INTO "contactForm" (name, phone_number, email, consulting_content, consulting_detail)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at;
    `;
    const values = [full_name.trim(), phone.trim(), email?.trim() || null, subject.trim(), detail];
    const result = await pool.query(query, values);
    res.status(201).json({ success: true, id: result.rows[0].id, created_at: result.rows[0].created_at });
  } catch (error) {
    console.error('Database insert error:', error.message);
    res.status(500).json({ error: 'Không thể lưu thông tin. Vui lòng thử lại sau.' });
  }
});

module.exports = router;