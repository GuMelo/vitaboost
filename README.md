# VitaBoost+ — Case Técnico Frontend (Funil de Vendas)

Case técnico para vaga de Frontend: um funil de vendas fictício de 3 páginas
(Landing Page → Pós-Venda/Upsell → Agradecimento), simulando a jornada de
compra de um suplemento fictício (**VitaBoost+ — Energia + Metabolismo**),
inspirado no formato de páginas de vendas de nutracêuticos com marketing de
resposta direta.

> ⚠️ **Produto e depoimentos fictícios.** Projeto feito apenas para fins de
> avaliação técnica/portfólio.

## 🔗 Links

- **Projeto publicado:** _[adicionar link do deploy aqui]_
- **Repositório:** _[adicionar link do GitHub aqui]_

## 🧱 Stack

- HTML5 semântico
- CSS3 puro (custom properties, grid, flexbox, `clamp()` para tipografia fluida)
- JavaScript vanilla (sem frameworks/bibliotecas de UI)
- Sem build step — nenhuma instalação é necessária para rodar

## 📁 Estrutura do projeto

```
vitaboost/
├── index.html          # 1. Landing Page
├── pos-venda.html       # 2. Página Pós-Venda / Upsell
├── obrigado.html        # 3. Página de Agradecimento
├── css/
│   ├── variables.css    # design tokens (cor, tipografia, espaçamento)
│   ├── base.css         # reset + tipografia + utilitários
│   ├── components.css   # header, footer, carrossel, depoimentos, garantia...
│   └── pages.css        # estilos específicos de cada página
├── js/
│   ├── main.js           # nav mobile, carrossel, estrelas, avatares, scroll reveal
│   └── upsell.js         # lógica de revelação de conteúdo após o vídeo (só na pág. 2)
└── assets/
    └── favicon.svg
```

CSS e JS foram divididos por responsabilidade (tokens / base / componentes /
página) em vez de um único arquivo gigante, visando manutenção e escala.

## ▶️ Como rodar localmente

Não há build nem dependências. Duas opções:

1. **Direto no navegador:** abra `index.html` com duplo clique.
2. **Servidor local (recomendado)**, para o comportamento ficar idêntico ao de produção:
   ```bash
   npx serve .
   # ou
   python3 -m http.server 5500
   ```
   Depois acesse `http://localhost:5500`.

## 🧭 Fluxo da navegação

`index.html` → clique em **"Comprar agora"** → `pos-venda.html` → assista o
vídeo (ou aguarde/clique em "pular") → clique em **qualquer CTA da oferta**
(aceitar ou recusar) → `obrigado.html`.

## 🎨 Decisões de design

- **Conceito:** identidade construída sobre a paleta de marca fornecida pelo
  cliente — seções claras (cinza claro/branco) intercaladas com faixas
  escuras de autoridade (azul-escuro), com o verde como único acento (CTA,
  garantia, estrelas, ícones de destaque).
- **Paleta (definida pelo cliente):** verde `#3FAE4D`, azul-escuro `#183153`,
  cinza claro `#F5F7F8`, branco `#F0F0F0`. Tons como `#58BB63` ou `#22406B`
  que aparecem no CSS são apenas variações de luminosidade dessas 4 cores
  (ex.: para gradientes e texto de destaque em fundo escuro) — nenhuma cor
  fora da paleta foi usada.
- **Tipografia:** Space Grotesk (display) + Inter (corpo).
- **Sem fotos de banco de imagens hotlinkadas:** todo o visual (frasco do
  produto, ícones, selos, avatares dos depoimentos) foi feito em SVG/CSS.
  Decisão técnica deliberada para: (1) performance — zero requisições
  externas de imagem, melhor LCP em mobile; (2) zero risco de link quebrado
  ou direitos de imagem de terceiros; (3) consistência visual perfeita com a
  paleta da marca.
- **Avatares dos depoimentos:** gerados via JS a partir das iniciais do nome
  (manipulação de DOM real, sem placeholder de foto de pessoa real).

## 🎥 Sobre o vídeo da página de Pós-Venda

O `<iframe>` usa como placeholder o trailer "Big Buck Bunny" (Blender
Foundation, licença CC BY 3.0) só para validar a mecânica de player + JS.
Em um cenário real, basta trocar o `src` do iframe pelo vídeo hospedado em
Vturb, Vidalytics, YouTube ou Vimeo — a lógica de revelação de conteúdo em
`js/upsell.js` já funciona com qualquer embed do YouTube (via YouTube IFrame
API) e tem fallback por tempo para não depender só do evento `ended`.

**Regra implementada:** o conteúdo (`#reveal-content`) é revelado quando o
vídeo termina (`onStateChange` → `ENDED`) **ou** após um tempo máximo de
segurança (`FALLBACK_MS`, 40s), o que vier primeiro. Existe também um botão
"pular" liberado após 15s, para não travar o usuário caso o autoplay do
navegador bloqueie o player. Antes de revelar, o container fica com o
atributo `inert` (além de `aria-hidden`), para que links escondidos não
recebam foco de teclado nem sejam lidos por leitor de tela.

## ✅ Diferenciais implementados

- Acessibilidade: skip link, foco visível, `aria-label`/`aria-hidden`
  corretos, `inert` no conteúdo ainda oculto, `prefers-reduced-motion`
  respeitado, contraste checado manualmente na paleta.
- Microinterações: reveal ao rolar (`IntersectionObserver`), carrossel com
  suporte a teclado e swipe, CTA fixo no mobile.
- SEO básico: `title`/`description` por página, Open Graph na LP,
  `noindex` nas páginas internas do funil (pós-venda/obrigado).
- `loading="lazy"` no iframe do vídeo.
- Código modularizado (tokens/base/componentes/páginas).

## 📊 Performance (Lighthouse / PageSpeed Insights)

O relatório de performance depende da URL publicada, então ele deve ser
gerado **depois do deploy**. Passo a passo:

1. Publique o projeto (veja seção abaixo).
2. Rode o relatório de uma das formas:
   - **PageSpeed Insights:** acesse https://pagespeed.web.dev, cole a URL
     publicada e rode para Mobile e Desktop.
   - **Lighthouse no Chrome DevTools:** abra a URL publicada → `F12` →
     aba **Lighthouse** → categoria *Performance* (mobile) → **Analyze page load**.
3. Tire um screenshot do resultado e adicione neste README (ou cole o link
   compartilhável gerado pelo PageSpeed Insights), conforme pedido no
   desafio:

   ```md
   ![Lighthouse Mobile](./docs/lighthouse-mobile.png)
   ```

_(placeholder — substituir pela evidência real após o deploy)_

## 🚀 Deploy

Qualquer uma destas opções funciona (projeto 100% estático):

- **Netlify:** arraste a pasta do projeto em https://app.netlify.com/drop
- **Vercel:** `npx vercel` na pasta do projeto
- **GitHub Pages:** Settings → Pages → Deploy from branch → `main` / `/ (root)`

## 📄 Licença

Projeto fictício para fins de avaliação técnica.
