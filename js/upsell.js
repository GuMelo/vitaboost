/* ==========================================================================
   VitaBoost+ — upsell.js
   Regra de negócio: após o vídeo terminar (ou após um tempo mínimo),
   o restante da oferta é revelado dinamicamente via JS.
   Usa a YouTube IFrame API quando disponível, com fallback por tempo
   para garantir que o conteúdo sempre apareça (ex.: API bloqueada).
   ========================================================================== */

(function () {
  "use strict";

  var IFRAME_ID = "offer-video";
  var MIN_WAIT_MS = 15000;   // libera o link "pular" após 15s
  var FALLBACK_MS = 40000;   // garante a revelação mesmo sem o evento "ended"

  var revealed = false;

  function reveal() {
    if (revealed) return;
    revealed = true;

    var content = document.getElementById("reveal-content");
    var hint = document.querySelector("[data-video-hint]");
    var skipLink = document.querySelector("[data-skip-link]");

    if (content) {
      content.classList.add("is-revealed");
      content.removeAttribute("aria-hidden");
      content.removeAttribute("inert");
      var heading = content.querySelector("h2, h3");
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
    var skipLink = document.querySelector("[data-skip-link]");
    if (!skipLink) return;
    skipLink.disabled = true;
    window.setTimeout(function () {
      skipLink.disabled = false;
      skipLink.textContent = "Já assisti, mostrar oferta agora";
    }, MIN_WAIT_MS);
    skipLink.addEventListener("click", function (e) {
      e.preventDefault();
      if (!skipLink.disabled) reveal();
    });
  }

  function setupYouTubeApi() {
    var container = document.getElementById(IFRAME_ID);
    if (!container) {
      // Sem vídeo na página: nada a esperar, libera direto.
      reveal();
      return;
    }

    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = function () {
      /* eslint-disable no-new */
      new window.YT.Player(IFRAME_ID, {
        events: {
          onStateChange: function (event) {
            if (event.data === window.YT.PlayerState.ENDED) reveal();
          },
        },
      });
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    enableSkipLinkLater();
    setupYouTubeApi();
    // Fallback: garante a revelação mesmo se a API do YouTube falhar/for bloqueada.
    window.setTimeout(reveal, FALLBACK_MS);
  });
})();
