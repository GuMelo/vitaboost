/* ==========================================================================
   VitaBoost+ — upsell.js
   Regra de negócio: após o vídeo terminar (ou após um tempo mínimo),
   o restante da oferta é revelado dinamicamente via JS.
   ========================================================================== */

(function () {
  "use strict";

  const IFRAME_ID = "offer-video";
  const MIN_WAIT_MS = 20000;   // libera o link "pular" após 20s
  const FALLBACK_MS = 25000;

  let revealed = false;

  function reveal() {
    if (revealed) return;
    revealed = true;

    let content = document.getElementById("reveal-content");
    let hint = document.querySelector("[data-video-hint]");
    let skipLink = document.querySelector("[data-skip-link]");

    if (content) {
      content.classList.add("is-revealed");
      content.removeAttribute("aria-hidden");
      content.removeAttribute("inert");
      let heading = content.querySelector("h2, h3");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
        content.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    if (hint) hint.hidden = true;
    if (skipLink) skipLink.hidden = true;
  }

  function enableSkipLinkLater() {
    let skipLink = document.querySelector("[data-skip-link]");
    if (!skipLink) return;
    skipLink.disabled = true;
    window.setTimeout(function () {
      skipLink.disabled = false;
      skipLink.textContent = "Já assisti, mostrar oferta agora!";
      skipLink.className = "btn btn--primary";
    }, MIN_WAIT_MS);
    skipLink.addEventListener("click", function (e) {
      e.preventDefault();
      if (!skipLink.disabled) reveal();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    enableSkipLinkLater();
    window.setTimeout(reveal, FALLBACK_MS);
  });
})();
