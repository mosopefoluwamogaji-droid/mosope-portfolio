# Mosope Mogaji — Portfolio

A cinematic, premium developer portfolio built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step.

## Structure

```
index.html      All content and structure
style.css       Design system, layout, animations, responsive breakpoints
script.js       Nav, custom cursor, magnetic buttons, scroll reveals, form validation
assets/images/  Portrait photo
```

## Running it

Open `index.html` directly in a browser. No installation needed.

## What's real vs. simulated

- **Contact form** now submits for real to a small backend (`contact-backend/`) that relays the message to your email via Brevo's API. See the setup steps below — until it's deployed and the URL is updated, submissions will fail with a clear "could not reach the server" message rather than silently pretending to work.
- **Project links** point to live demo deployments of both featured projects. Both are marked "Private repository" since neither has a public GitHub repo linked — update that note in `index.html` if you make one public.

## Setting up the contact form backend

The site itself is static, but the contact form needs *something* to actually send an email — that's what `contact-backend/` is for. It's a small, single-purpose Node service, the same pattern used for Crown Jewel School's email system, and for the same reason: it talks to Brevo over HTTPS rather than raw SMTP, since many hosts (Render included, on some plans) silently block outbound SMTP ports.

**1. Get a Brevo account and API key**
Sign up at brevo.com (free tier is enough for a portfolio's contact volume), verify a sender email address, and generate an API key under SMTP & API settings.

**2. Deploy `contact-backend/` as its own Render Web Service**
- Root directory: `contact-backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables (set these in Render's dashboard, not in code):
  - `BREVO_API_KEY`
  - `BREVO_SENDER_EMAIL`
  - `RECEIVING_EMAIL` (your own inbox, e.g. `mosopemogaji@gmail.com`)
  - `CORS_ORIGIN` (your deployed portfolio's URL, once you know it)

**3. Point the frontend at it**
In `script.js`, find `CONTACT_API_URL` near the top of `initContactForm()` and replace the placeholder with your deployed backend's real URL, e.g.:
```js
const CONTACT_API_URL = 'https://your-actual-backend.onrender.com/api/contact';
```

**4. Test it**
Submit the form on your live site once both are deployed. A successful send shows a cyan confirmation; a failure shows a distinct red message and never clears what you typed, so you can retry without losing your message.

## Design notes

- **Palette:** deep near-black base with a refined cyan accent — the same cyan used in the hero portrait's own rim-lighting treatment, so the photo and the site feel like one consistent piece rather than a photo dropped onto a template.
- **Type:** Space Grotesk (display/headings), Manrope (body), JetBrains Mono (technical labels, numbers).
- **Motion:** every animation is scroll-triggered or interaction-triggered — nothing loops or runs constantly in the background, keeping it fast and battery-friendly. `prefers-reduced-motion` is fully respected — all content is immediately visible with no animation for users who request it.
- Custom cursor and magnetic button effects are automatically skipped on touch devices (`pointer: fine` media query), since they don't make sense there.

## Extending it

- To add a third project, copy one `.project-showcase` block in `index.html` and give it a fresh mockup treatment in the CSS (see `.project-mockup-crown` / `.project-mockup-luxe` for the pattern).
- All section numbers, timeline steps, and skill categories are plain HTML — no JS-driven content generation — so they're easy to edit directly.
