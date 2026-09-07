IMAGES FOLDER — CROWN JEWEL SCHOOL WEBSITE

This folder currently only contains a placeholder favicon
(favicon-placeholder.svg), which uses a simple crown line-icon
as a stand-in for the school's official logo.

All photographs across the website (hero images, gallery, news,
staff photos, etc.) are currently drawn as on-page placeholder
boxes directly in the HTML/CSS — no image files are needed for
the site to run as-is.

WHEN YOU HAVE OFFICIAL ASSETS:

1. Logo
   - Add the official logo file here, e.g. images/logo.png
   - In css/style.css and js/script.js, the crown icon is used as
     an inline SVG (search for "CROWN_SVG" logic if regenerating
     pages, or the <svg> markup inside .brand-mark in each HTML
     file). Replace the .brand-mark / footer-brand markup with:
       <img src="images/logo.png" alt="Crown Jewel School logo">
   - Replace images/favicon-placeholder.svg with a favicon derived
     from the real logo (e.g. images/favicon.png or .ico), and
     update the <link rel="icon" ...> tag in the <head> of every
     HTML page.

2. Photography (hero, welcome section, gallery, news, principal, etc.)
   - Add photo files here, e.g. images/hero-1.jpg, images/gallery/...
   - Each ".image-placeholder" or ".hero-bg-placeholder" element in
     the HTML can be replaced with an <img> tag or a CSS
     background-image pointing to the new file.
   - Keep file sizes optimized (compressed JPG/WebP) for fast loading.

Do not substitute stock photography as if it depicts Crown Jewel
School. Use only official, approved photographs.
