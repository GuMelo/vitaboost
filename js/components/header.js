/* ==========================================================================
   VitaBoost+ — components/header.js
   Componente reutilizável do cabeçalho (<header class="site-header">),
   compartilhado entre as 3 páginas do funil.

   Uso (dentro do próprio <header id="...">, logo após a tag):
     <script>
       renderHeader("site-header", { variant: "home", homeHref: "#hero" });
     </script>

   Opções:
     variant  "home"   -> logo em imagem + navegação + CTA + botão mobile
              "simple" -> logo em SVG, sem navegação (usado nas páginas
                          de pós-venda e agradecimento)
     homeHref  destino do link da logo (padrão: "index.html")
     gap       token de espaçamento entre logo e badge no variant "simple"
               (padrão: "space-3")
     badge     texto opcional exibido como selo à direita (variant "simple")
   ========================================================================== */

function renderHeader(targetId, options) {
  options = options || {};
  const variant = options.variant || "simple";
  const homeHref = options.homeHref || "index.html";
  const gap = options.gap || "space-3";
  const badge = options.badge || null;

  const target = document.getElementById(targetId);
  if (!target) return;

  const logoMarkup = '<img src="assets/logo.png" alt="Logo VitaBoost+" width="200">';

  const navMarkup = variant === "home" ? `

    <nav id="main-nav" class="nav-links" data-nav-menu aria-label="Navegação principal">
      <a href="#como-funciona">Como funciona</a>
      <a href="#beneficios">Benefícios</a>
      <a href="#depoimentos">Depoimentos</a>
      <a href="#garantia">Garantia</a>
    </nav>

    <a class="btn btn--primary header-cta" href="pos-venda.html">Comprar agora</a>

    <button class="nav-toggle" type="button" data-nav-toggle aria-controls="main-nav" aria-expanded="false" aria-label="Abrir menu de navegação">
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>` : "";

  const badgeMarkup = badge ? `
    <span class="badge">
      <svg class="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12 L10 18 L20 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      ${badge}
    </span>` : "";

  const containerAttr = variant === "home"
    ? ""
    : ` style="justify-content:flex-start; gap:var(--${gap});"`;

  target.innerHTML = `
  <div class="container"${containerAttr}>
    <a href="${homeHref}" class="brand" aria-label="VitaBoost+ — página inicial">
      ${logoMarkup}
    </a>${navMarkup}${badgeMarkup}
  </div>
  `;
}
