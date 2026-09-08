/**
 * Portfolio contact form backend — a single small service whose only job
 * is to receive the contact form submission and relay it to Mosope's
 * inbox via Brevo's HTTPS API.
 *
 * Uses Brevo's API (not raw SMTP) deliberately — many hosting platforms
 * (including Render on some plans) silently block outbound SMTP ports,
 * which caused real problems on an earlier project today. HTTPS is never
 * blocked the same way.
 *
 * Required environment variables (set these on Render, not in code):
 *   BREVO_API_KEY      = API key generated in Brevo (SMTP & API settings)
 *   BREVO_SENDER_EMAIL = the email address verified as a Sender in Brevo
 *   RECEIVING_EMAIL    = where contact form messages should be delivered
 *                        (e.g. mosopemogaji@gmail.com)
 *   CORS_ORIGIN        = the deployed portfolio site's URL, so only that
 *                        site is allowed to call this API
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json({ limit: '100kb' }));

const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
}));

// Prevent the contact form from being used to spam — 5 submissions per
// 15 minutes per IP is generous for a real visitor, tight for abuse.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' },
});

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body || {};

  // Never trust client-side validation alone — check again here.
  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please provide your name.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters.' });
  }

  const safeName = name.trim().slice(0, 200);
  const safeEmail = email.trim().slice(0, 200);
  const safeMessage = message.trim().slice(0, 5000);

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Portfolio Contact Form', email: process.env.BREVO_SENDER_EMAIL },
        to: [{ email: process.env.RECEIVING_EMAIL }],
        replyTo: { email: safeEmail, name: safeName },
        subject: `New portfolio message from ${safeName}`,
        htmlContent: `
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Brevo API error:', response.status, errText);
      return res.status(502).json({ error: 'Could not send your message right now. Please try again shortly.' });
    }

    res.json({ message: 'Message sent successfully.' });
  } catch (err) {
    console.error('Contact form send failed:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Contact backend running on port ${PORT}`));
