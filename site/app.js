(function () {
  "use strict";

  // ---------- Mobile menu ----------
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.getElementById("navLinks");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") === "true";
      navLinks.classList.toggle("open", !open);
      menuBtn.setAttribute("aria-expanded", String(!open));
      if (!open) document.addEventListener("click", onOutside, true);
    });

    navLinks.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (link) closeMenu();
    });

    function onOutside(e) {
      if (!navLinks.contains(e.target)) closeMenu();
      document.removeEventListener("click", onOutside, true);
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  // ---------- Theme toggle ----------
  var THEME_KEY = "kartula-theme";
  var themeBtn = document.getElementById("themeBtn");

  function getTheme() {
    return (
      (sessionStorage.getItem(THEME_KEY) || document.documentElement.getAttribute("data-theme")) || "dark"
    );
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeBtn.setAttribute("aria-pressed", theme === "light");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = getTheme() === "dark" ? "light" : "dark";
      sessionStorage.setItem(THEME_KEY, next);
      setTheme(next);
    });
    setTheme(getTheme());
  }

  // ---------- Scroll progress bar ----------
  var progressBar = document.querySelector(".progress-bar");

  function updateProgress() {
    if (!progressBar) return;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (scrollTop / max) * 100 : 0;
    progressBar.style.width = pct + "%";
  }

  // ---------- Scrollspy (highlight active nav link) ----------
  function updateActiveNav() {
    var sections = document.querySelectorAll("main section[id]");
    var links = document.querySelectorAll(".nav-links a");
    var current = "isi";
    if (!sections.length) return;
    var top = window.scrollY || document.documentElement.scrollTop;
    var offset = top + 120;
    sections.forEach(function (section) {
      var id = section.getAttribute("id");
      var topPos = section.offsetTop - 60;
      if (topPos <= offset) current = id;
    });
    links.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  // ---------- Back to top ----------
  var backToTop = document.getElementById("backToTop");

  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------- Reveal on scroll ----------
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el, i) {
      setTimeout(function () { el.classList.add("reveal--in"); }, i * 70);
    });
  }

  // ---------- Accordion ----------
  var accItems = Array.prototype.slice.call(document.querySelectorAll(".acc-item"));
  accItems.forEach(function (item) {
    var head = item.querySelector(".acc-head");
    if (!head) return;
    head.addEventListener("click", function () {
      var open = item.getAttribute("aria-expanded") === "true";
      accItems.forEach(function (i) { i.setAttribute("aria-expanded", "false"); });
      item.setAttribute("aria-expanded", String(!open));
    });
  });

  // ---------- Scroll-driven updates ----------
  if (progressBar) {
    window.addEventListener("scroll", function () {
      updateProgress();
      updateActiveNav();
      toggleBackToTop();
    }, { passive: true });
    updateProgress();
    updateActiveNav();
    toggleBackToTop();
  }
})();
