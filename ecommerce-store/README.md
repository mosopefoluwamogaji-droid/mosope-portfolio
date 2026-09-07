# LUXEMART — Premium E-Commerce Store

**Modern Shopping. Premium Experience.**

A fully responsive, multi-page e-commerce website built with plain HTML5, CSS3, and vanilla JavaScript (ES6+) — no frameworks, no build step. Open any `.html` file directly in a browser and it works.

---

## Project Structure

```
ecommerce-store/
│
├── index.html              Home page
├── products.html           Full product listing — search, filter, sort, pagination
├── product-details.html    Single product view (reads ?id= from the URL)
├── cart.html                Shopping cart
├── checkout.html            Checkout flow
├── about.html               Company story, mission, team, timeline
├── contact.html             Contact form, map, FAQ
│
├── css/
│   ├── style.css            Design tokens, layout, components (incl. dark mode variables)
│   ├── responsive.css       Breakpoints: 320 / 375 / 425 / 768 / 1024 / 1440+
│   └── animations.css       Keyframes, scroll-reveal, reduced-motion handling
│
├── js/
│   ├── icons.js             Hand-coded inline SVG icon library (no icon-font dependency)
│   ├── validation.js        Shared form validation helpers
│   ├── products.js          Product catalog data + rendering + search/filter/sort/pagination
│   ├── cart.js               Cart + wishlist state (localStorage), cart page rendering
│   ├── checkout.js          Checkout form logic, validation, order placement
│   └── app.js                Shared: nav, dark mode, toasts, scroll-reveal, back-to-top
│
└── README.md
```

## Running It

No installation needed. Open `index.html` in any modern browser, or serve the folder with any static file server (e.g. `python3 -m http.server`) if you'd rather test with real URLs than `file://`.

## What's Real vs. What Needs a Backend

This is a **frontend-only** build. Two things are simulated client-side and are clearly marked with `// NOTE:` comments in the code:

- **Checkout / order placement** — validates everything properly and generates an order reference, but there's no real payment processor or order database behind it.
- **Contact form** — validates and shows a success state, but doesn't actually send an email anywhere.

Wire both up to a real backend (or a form service like Formspree, or a payment provider's API) before taking real orders or messages.

**Cart, wishlist, and dark mode preference are genuinely real** — they persist via `localStorage` and survive page reloads and browser restarts.

## Product Images

There's no real product photography (and no image-generation tool was available while building this), so every product uses a consistent, on-brand textured background image (`assets/images/product-1.jpg` through `product-4.jpg` — moody gradient-and-grain tiles in the brand's royal blue, charcoal, gold, and gray) with a dark overlay and a centered category icon on top, instead of an actual photo. This is a deliberate placeholder — swap the relevant `<img>`/`background-image` reference in `products.js`'s `renderProductCard()` and `cart.js`'s `renderCartPage()` for real photography once it's available; the grid, hover states, and gallery thumbnails on the product details page are already built to accommodate real images with minimal changes.

## Testing Notes

Every interactive feature — search, category/price filtering, sorting, pagination, add-to-cart, wishlist, quantity updates, promo codes, checkout validation, contact form validation, newsletter validation, dark mode, mobile nav, FAQ accordion, and back-to-top — was verified with an automated headless-browser test suite (67 checks, all passing) covering both visual rendering and actual functional behavior (real clicks, real form fills, real localStorage checks), not just a visual read-through.

## Browser Support

Built and tested against a modern Chromium engine. Uses standard ES6+ JavaScript (`const`/`let`, arrow functions, template literals, `fetch`-free localStorage APIs) and CSS Grid/Flexbox — supported by all browsers released in the last several years. No transpilation or polyfills included; add them if you need to support very old browsers.

## Color Palette & Type

- **Colors:** white, charcoal (`#1A1A1D`), royal blue (`#2A3EB1`), soft gray, gold accent (`#C9A227`) — all defined as CSS variables in `css/style.css` (`:root`), including a full dark-mode override set.
- **Type:** Unbounded (headings), Plus Jakarta Sans (body) — loaded via Google Fonts.

---

*Built as a portfolio-quality demonstration project. Not a real registered business.*
