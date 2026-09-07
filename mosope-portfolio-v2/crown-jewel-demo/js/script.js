/* =========================================================
   CROWN JEWEL SCHOOL — SITE SCRIPT
   Handles: mobile nav, scroll reveals, gallery filter + lightbox,
   and frontend-only form submissions (ready to be wired to a backend).
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Mobile navigation ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Gallery filtering ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        const category = btn.getAttribute("data-filter");

        galleryItems.forEach(function (item) {
          const matches = category === "all" || item.getAttribute("data-category") === category;
          item.hidden = !matches;
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.querySelector(".lightbox");
  const lightboxContent = document.querySelector(".lightbox-inner .image-placeholder");
  const lightboxClose = document.querySelector(".lightbox-close");

  if (lightbox && lightboxContent) {
    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        const label = item.querySelector(".image-placeholder").textContent.trim();
        lightboxContent.textContent = label;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
      });
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.addEventListener("keypress", function (e) {
        if (e.key === "Enter" || e.key === " ") item.click();
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* ---------- Frontend-only form handling ----------
     NOTE: These forms do not currently send data anywhere.
     To connect a backend later:
       1. Replace the preventDefault() handler below with a fetch()
          POST request to your API endpoint.
       2. Keep the same field "name" attributes so the payload
          structure doesn't need to change on the frontend.
       3. Handle the server response to show real success/error states
          instead of the static message below.
  --------------------------------------------------------- */
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const successBox = form.parentElement.querySelector(".form-success");
      if (successBox) {
        successBox.classList.add("visible");
        successBox.setAttribute("role", "status");
      }
      form.reset();

      if (successBox) {
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

});
