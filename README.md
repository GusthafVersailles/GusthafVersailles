# Gusthaf Versailles — Arquivo Vivo

Portfólio estático em HTML, CSS e JavaScript. Esta pasta é uma **cópia de testes organizada da v37**; nenhuma publicação é feita automaticamente.

## Estrutura

```text
index.html             Página principal
assets/                Logotipo e prévias da galeria
css/                   Estilos base, motion, Lenis e editorial consolidado
js/                    Engine (relógio único + Lenis), navegação, idiomas, motion e diagnóstico opcional
projetos/              Atelier Noir, Font Pairing e Elegant Fonts completos
vendor/                Sinalizador de instalação opcional do Lenis offline
tools/                 Instalador opcional do Lenis para execução local
docs/                  Histórico e relatório da limpeza
vercel.json            Regras de segurança, rotas legadas e redirects
robots.txt, sitemap.xml
```

## Rodar localmente

Na raiz da pasta, execute `python3 -m http.server 5500` e abra `http://localhost:5500`.
O preview simples via `file://` também pode funcionar, mas um servidor local reproduz melhor a hospedagem.

### Rolagem e animação (v39)
Um único `requestAnimationFrame` (`js/engine.js`) comanda a rolagem **e** toda a coreografia, sempre na mesma ordem: o Lenis avança → medições (só se algo mudou de tamanho) → animações. Nenhuma animação lê layout por quadro.

- **Motores:** Lenis oficial 1.3.27 via CDN (pré-carregado no `<head>`) → fallback local suave se o Lenis não carregar → rolagem nativa em touch e com "reduzir movimento".
- **Ajuste fino da sensação de rolagem:** objeto `CONFIG` no topo de `js/engine.js` (`lerp`, `wheelMultiplier`, duração dos saltos de âncora).
- **Offline / gravação:** execute `bash tools/install-lenis.command` uma vez (precisa de internet na instalação). Depois disso o Lenis é servido localmente, sem depender de CDN.
- **Diagnóstico:** abra com `?gvperf=1`. O painel mostra FPS, long tasks e o custo de JavaScript por quadro. `document.documentElement.dataset.motionEngine` deve ser `lenis` no desktop.
- **Boas práticas para novas animações:** anime só `transform`/`opacity`/`translate`; registre com `GV.onFrame((t, y) => …)` e meça geometria em `GV.onMeasure(…)`, nunca dentro do quadro.

### Desempenho

Use `?gvperf=1` no endereço para ativar o pequeno painel de diagnóstico. O recurso permanece desativado por padrão.

## Verificações

Confira a Hero, Sobre (inclusive Filosofia/Princípios), Processo (acordeões e Escopo), três projetos e galerias horizontais, idiomas PT/EN, Contato, Footer, desktop e mobile.

A organização não é uma alteração no repositório GitHub nem na implantação da Vercel.
