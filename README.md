# Gusthaf Versailles — Arquivo Vivo v22

Portfólio publicado em HTML/CSS/JavaScript, com galeria horizontal cinematográfica, navegação PT/EN e três projetos integrados.

## Estrutura

- `index.html` — site principal
- `assets/` — logo e imagens da galeria
- `css/` e `js/` — estilos, animações, navegação e traduções
- `projetos/AtelierNoir/`, `projetos/FontPairing/`, `projetos/ElegantFonts/` — aplicações completas
- `vendor/` — integração opcional do Lenis (CDN com fallback quando indisponível)
- `vercel.json` — headers, compatibilidade de rotas antigas e caminhos dos projetos

## Desenvolvimento

Execute `python3 -m http.server 5500` e abra `http://localhost:5500`. Teste o fluxo Hero → Sobre → Processo → Projetos → CTA → Footer, e as versões PT/EN e mobile.

## Backup

A versão anterior à migração foi preservada na branch `backup-original-before-arquivo-vivo-v22-2026-11-04`.
