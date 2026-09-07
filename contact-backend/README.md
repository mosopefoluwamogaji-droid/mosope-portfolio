# Portfolio Contact Backend

A tiny, single-purpose Node/Express service. Its only job: receive the
portfolio's contact form submission and relay it to your inbox via
Brevo's HTTPS API (not raw SMTP — see the comment at the top of
`server.js` for why that matters).

## Setup

1. **Get a Brevo API key.** Sign up (or log in) at [app.brevo.com](https://app.brevo.com),
   go to Settings → SMTP & API → API Keys, and generate one.
2. **Verify a sender email** in Brevo (Settings → Senders) — this has to
   be an email address you control; Brevo will send a verification link.
3. **Deploy this folder** as its own Node web service — same pattern as
   the Crown Jewel backend: push it to its own GitHub repo (or a
   subfolder Render can point at), create a new Web Service on Render,
   set the build command to `npm install` and start command to `npm start`.
4. **Set these environment variables on Render** (never commit a real `.env`):
   - `BREVO_API_KEY` — from step 1
   - `BREVO_SENDER_EMAIL` — the address you verified in step 2
   - `RECEIVING_EMAIL` — where you want messages delivered (e.g. `mosopemogaji@gmail.com`)
   - `CORS_ORIGIN` — your deployed portfolio site's exact URL

5. **Update the frontend.** In the portfolio's `script.js`, find:
   ```js
   const CONTACT_API_URL = 'https://your-portfolio-contact-backend.onrender.com/api/contact';
   ```
   and replace the placeholder URL with your actual deployed backend's URL
   (Render gives you this once the service is live) plus `/api/contact`.

## Testing it's working

Once deployed, visiting `https://your-backend-url.onrender.com/api/health`
in a browser should return `{"status":"ok"}`. If that works but the
contact form itself doesn't, check the Render service logs — Brevo
errors are logged there with the actual reason (e.g. unverified sender,
invalid API key).

## Rate limiting

Built in: 5 submissions per 15 minutes per visitor IP, to stop the form
being used for spam. Adjust `contactLimiter` in `server.js` if that's
too strict or too loose for your needs.
