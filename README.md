# VitaBoost+ — Case Técnico Frontend (Funil de Vendas)

Case técnico para vaga de Frontend: um funil de vendas fictício de 3 páginas
(Landing Page → Pós-Venda/Upsell → Agradecimento), simulando a jornada de
compra de um suplemento fictício (**VitaBoost+ — Energia + Metabolismo**),
inspirado no formato de páginas de vendas de nutracêuticos com marketing de
resposta direta.

> ⚠️ **Produto e depoimentos fictícios.** Projeto feito apenas para fins de
> avaliação técnica/portfólio.

## 🔗 Links

- **Projeto publicado:** _https://vitaboost.vercel.app/_
- **Repositório:** _https://github.com/GuMelo/vitaboost_

## 🧱 Stack

- HTML5 semântico
- CSS3 puro (custom properties, grid, flexbox, `clamp()` para tipografia fluida)
- JavaScript vanilla (sem frameworks/bibliotecas de UI)
- Sem build step — nenhuma instalação é necessária para rodar

## 📁 Estrutura do projeto

```
vitaboost/
├── index.html            # 1. Landing Page
├── pos-venda.html        # 2. Página Pós-Venda / Upsell
├── obrigado.html         # 3. Página de Agradecimento
├── css/
│   ├── variables.css     # design tokens (cor, tipografia, espaçamento)
│   ├── base.css          # reset + tipografia + utilitários
│   ├── components.css    # header, footer, carrossel, depoimentos, garantia...
│   └── pages.css         # estilos específicos de cada página
├── js/
│   ├── components/
│   │   ├── footer.js     # componente de footer para padrão de todas as páginas
│   │   └── header.js     # componente de header para padrão de todas as páginas com variantes
│   ├── main.js           # nav mobile, carrossel, estrelas, avatares, scroll reveal
│   └── upsell.js         # lógica de revelação de conteúdo após o vídeo (só na pág. 2)
└── assets/
    ├── favicon.png
    ├── hero-bottle.png
    ├── logo.png
    └── ...
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

- **Conceito:** seções claras (cinza claro/branco) intercaladas com faixas
  escuras de autoridade (azul-escuro), com o verde como único acento (CTA,
  garantia, estrelas, ícones de destaque).
- **Paleta (definida pelo cliente):** verde `#3FAE4D`, azul-escuro `#183153`,
  cinza claro `#F5F7F8`, branco `#F0F0F0`. Tons como `#58BB63` ou `#22406B`
  que aparecem no CSS são apenas variações de luminosidade dessas 4 cores
  (ex.: para gradientes e texto de destaque em fundo escuro) — nenhuma cor
  fora da paleta foi usada.
- **Tipografia:** Space Grotesk (display) + Inter (corpo).
- **Sem fotos de banco de imagens hotlinkadas:** todo o visual (frasco do
  produto, ícones, selos, avatares dos depoimentos) foi criado com auxílio de IA.
  Decisão técnica deliberada para: (1) performance — zero requisições
  externas de imagem, melhor LCP em mobile; (2) zero risco de link quebrado
  ou direitos de imagem de terceiros; (3) consistência visual perfeita com a
  paleta da marca.

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

## 🚀 Deploy

Deploy realizado pela Vercel:

- **Vercel:** https://vitaboost.vercel.app/

## 📄 Licença

Projeto fictício para fins de avaliação técnica.
