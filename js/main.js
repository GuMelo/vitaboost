/* ==========================================================================
   VitaBoost+ — main.js
   Comportamentos compartilhados entre as 3 páginas do funil.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* 1. Menu mobile                                                      */
  /* ------------------------------------------------------------------ */
  function initNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 2. Estrelas de avaliação (renderizadas via DOM, não hardcoded)      */
  /* ------------------------------------------------------------------ */
  var STAR_PATH =
    "M12 2.5l2.9 6.06 6.6.79-4.86 4.65 1.24 6.6L12 17.6l-5.88 3 1.24-6.6L2.5 9.35l6.6-.79z";

  function buildStar(filled) {
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    var path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", STAR_PATH);
    path.setAttribute("fill", filled ? "currentColor" : "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.5");
    svg.appendChild(path);
    return svg;
  }

  function renderStars() {
    document.querySelectorAll("[data-stars]").forEach(function (el) {
      const value = Math.round(Number(el.getAttribute("data-stars")) || 0);
      const wrap = document.createElement("span");
      wrap.className = "stars";
      wrap.setAttribute("role", "img");
      wrap.setAttribute("aria-label", value + " de 5 estrelas");
      for (var i = 1; i <= 5; i++) {
        wrap.appendChild(buildStar(i <= value));
      }
      el.replaceWith(wrap);
    });
  }

  /* ------------------------------------------------------------------ */
  /* 3. Avatares por iniciais (sem fotos externas)                       */
  /* ------------------------------------------------------------------ */
  function hashString(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function initials(name) {
    var parts = name.trim().split(/\s+/);
    var first = parts[0] ? parts[0][0] : "";
    var last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  function renderAvatars() {
    document.querySelectorAll("[data-avatar]").forEach(function (el) {
      var name = el.getAttribute("data-avatar");
      el.classList.add("avatar-initials");
      el.style.background = "#68d477";
      el.textContent = initials(name);
      el.setAttribute("aria-hidden", "true");
    });
  }

  /* ------------------------------------------------------------------ */
  /* 4. Carrossel de imagens (botões + autoplay)                        */
  /* ------------------------------------------------------------------ */
  function initCarousel(root) {
    var track = root.querySelector("[data-carousel-track]");
    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-carousel-slide]"));
    var prevBtn = root.querySelector("[data-carousel-prev]");
    var nextBtn = root.querySelector("[data-carousel-next]");
    var dotsWrap = root.querySelector("[data-carousel-dots]");
    if (!track || slides.length === 0) return;

    var index = 0;
    var autoplayMs = 4000;
    var timer = null;

    var dots = slides.map(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "Ir para o slide " + (i + 1));
      dot.addEventListener("click", function () { goTo(i); restart(); });
      dotsWrap && dotsWrap.appendChild(dot);
      return dot;
    });

    function render() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-current", String(i === index));
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      render();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function restart() {
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(next, autoplayMs);
    }

    nextBtn && nextBtn.addEventListener("click", function () { next(); restart(); });
    prevBtn && prevBtn.addEventListener("click", function () { prev(); restart(); });

    root.addEventListener("mouseenter", function () { if (timer) window.clearInterval(timer); });
    root.addEventListener("mouseleave", restart);

    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { next(); restart(); }
      if (e.key === "ArrowLeft") { prev(); restart(); }
    });

    /* swipe touch */
    var touchStartX = null;
    track.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) { delta < 0 ? next() : prev(); restart(); }
      touchStartX = null;
    }, { passive: true });

    render();
    restart();
  }

  function initAllCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(initCarousel);
  }

  /* ------------------------------------------------------------------ */
  /* 5. Reveal ao rolar (IntersectionObserver)                           */
  /* ------------------------------------------------------------------ */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* 6. CTA sticky mobile — aparece após o hero                          */
  /* ------------------------------------------------------------------ */
  function initStickyCta() {
    const bar = document.querySelector("[data-sticky-cta]");
    const hero = document.querySelector(".hero, .upsell-hero, .thanks-hero");
    if (!bar || !hero) return;

    const thresholdY = hero.offsetTop + hero.offsetHeight;
    let ticking = false;

    function update() {
      bar.classList.toggle("is-visible", window.scrollY > thresholdY);
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ------------------------------------------------------------------ */
  /* 7. Número de pedido (página de agradecimento)                       */
  /* ------------------------------------------------------------------ */
  function initOrderId() {
    const el = document.querySelector("[data-order-id]");
    if (!el) return;
    const random = Math.floor(10000 + Math.random() * 89999);
    el.textContent = "#VITA-" + random;
  }

  /* ------------------------------------------------------------------ */
  /* 8. Rodapé — ano atual                                               */
  /* ------------------------------------------------------------------ */
  function initFooterYear() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    renderStars();
    renderAvatars();
    initAllCarousels();
    initReveal();
    initStickyCta();
    initOrderId();
    initFooterYear();
  });
})();
