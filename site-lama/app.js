// app.js — Karthula (Kebakaran Hutan dan Lahan)
// Fitur: mobile menu, smooth scroll, accordion.

document.addEventListener("DOMContentLoaded", () => {

  // 1. Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      // Tambahkan gaya visual untuk menu tertutup di mobile
      mainNav.classList.toggle("closed", !isOpen);
    });

    // Tutup menu saat klik link (hanya di mobile)
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        // Hanya tutup jika menu sebelumnya terbuka
        if (mainNav.classList.contains("open")) {
          mainNav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
          mainNav.classList.remove("closed");
        }
      });
    });
  }

  // 2. Smooth scroll untuk anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // 3. Accordion (Mitos vs Fakta)
  const accHeaders = document.querySelectorAll(".acc-header");

  accHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      // Tutup item yang lain jika sudah terbuka
      const parentItem = header.parentElement;
      const isOpen = parentItem.classList.contains("open");

      // Tutup semua item accordion
      document.querySelectorAll(".acc-item").forEach((item) => {
        item.classList.remove("open");
      });

      // Buka item yang diklik (toggle)
      if (isOpen) {
        parentItem.classList.remove("open");
      } else {
        parentItem.classList.add("open");
      }
    });
  });
});
