/* ==========================================================================
   VitaBoost+ — components/footer.js
   Componente reutilizável do rodapé (<footer class="site-footer">),
   compartilhado entre as 3 páginas do funil.

   Opções:
     homeHref     destino do link da logo (padrão: "index.html")
     columns      lista de colunas extras do rodapé, cada uma com
                  { title, links: [{ href, label }] }
   ========================================================================== */

function renderFooter(targetId, options) {
  options = options || {};
  const homeHref = options.homeHref || "index.html";
  const columns = options.columns || [];
  const disclaimer = "Este site é um case técnico fictício desenvolvido para fins de avaliação de portfólio; o produto, a marca e os depoimentos não são reais.";

  const target = document.getElementById(targetId);
  if (!target) return;

  const columnsMarkup = columns.map(function (column) {
    let itemsMarkup = column.links.map(function (link) {
      return `<li><a href="${link.href}">${link.label}</a></li>`;
    }).join("\n          ");

    return `
      <div>
        <h4>${column.title}</h4>
        <ul>
          ${itemsMarkup}
        </ul>
      </div>`;
  }).join("");

  const disclaimerMarkup =  `<p class="footer-disclaimer">${disclaimer}</p>`;

  target.innerHTML = `
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${homeHref}" class="brand" aria-label="VitaBoost+ — página inicial">
          <img src="assets/logo.png" alt="Logo VitaBoost+" width="160">
        </a>
        <p>Complexo energético metabólico formulado nos EUA, distribuído no Brasil.</p>
      </div>
      ${columnsMarkup}
    </div>

    <div class="footer-bottom">
      <span>© <span data-year></span> VitaBoost+ · Todos os direitos reservados.</span>
      <div style="display: flex; flex-direction: column; align-items: flex-end;">
        <span>Case Técnico — Vaga Frontend</span>
        <a href="https://gustavomcorrente.vercel.app/" target="_blank">Gustavo M. Corrente</a>
      </div>
      ${disclaimerMarkup}
    </div>
  </div>
  `;
}
