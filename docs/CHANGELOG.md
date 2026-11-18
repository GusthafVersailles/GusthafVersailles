## v39 — Fluidez para gravação (relógio único, só compositor)
**Rolagem**
- Novo `js/engine.js`: um único `requestAnimationFrame` avança o Lenis e roda todas as animações no mesmo quadro (substitui `lenis-integration.js` e `cinematic-scroll-local.js`). Lenis pré-carregado no `<head>`; a carga tardia deixou de bloquear ou trocar o motor no meio do uso.
- Âncoras do menu e "Voltar ao início" com curva ease-in-out e duração proporcional à distância (1,1–2,4 s), iguais em Lenis, fallback local e touch.
- `unpkg` removido da lista de fontes do Lenis (a CSP do `vercel.json` já o bloqueava).

**Causas de travada eliminadas**
- `.editorial-word`: a transição de 1,15 s era reiniciada a cada quadro pela variável `--editorial-drift`. Agora a deriva usa a propriedade `translate` (sem transição).
- Geometria medida uma vez (e quando algo muda de tamanho): ~20 `getBoundingClientRect` por quadro → 0. Layouts durante a rolagem: 412 → 14.
- Removidas as custom properties `--hero-progress`, `--panel-progress` e `--outro-reveal` (invalidavam o estilo de subárvores inteiras; duas nem eram consumidas).
- `backdrop-filter` removido do header (fundo 95% opaco: o blur era imperceptível e repintava a cada quadro).
- Barra de progresso: `width` → `transform: scaleX` (era repintada ~370× por passagem). `.gallery-meter span` promovido a camada própria (repintava o palco 1440×814 a cada quadro).
- Reveals sem `clip-path`, `scale` ou `filter: blur`; só `opacity` + `transform`. `will-change` aplicado apenas perto da entrada e removido ao final.

**Animações mais elegantes**
- Abertura: título em duas linhas com máscara, cortina na marca, campo com zoom suave, arco girando, header e frase em fade. Só começa com as fontes prontas e sem o "pisca" de conteúdo visível → oculto → animado.
- Reveals escalonados (90 ms) com curva expo-out de 1,35 s.
- Galeria: profundidade em 3 planos (prévia, texto e letra-fantasma em velocidades diferentes); trilha alinhada ao pixel físico.
- Hero: paralaxe sutil no campo da marca.
- Acordeão do Processo com altura animada (Web Animations API), ícone `+` girando, um item aberto por vez, teclado preservado. Sem JS continua sendo o `<details>` nativo.

**Preservado:** layout idêntico de 320 a 1440 px (mesma altura total e mesma geometria dos componentes), textos, idiomas, galeria, CSP e subprojetos. O destaque do passo atual no Processo continua inativo como no v38 (depende de `#method-active-number`, que não existe no HTML).

## v38 — Organização e limpeza conservadora
- Consolidado o CSS de versões v32–v37 em um arquivo.
- Removidas regras órfãs comprovadas por ausência de elementos/classes em HTML/JS.
- Removidos duplicados e documentos obsoletos.
- Movido instalador opcional para `tools/`.
- Mantidos todos os projetos, animações e conteúdo.

## v24 — Otimização de estabilidade da rolagem (produção)
- Leituras de posição agrupadas antes das escritas de animação por frame.
- Sem mudanças na configuração do Lenis ou no movimento da galeria.
- Monitor de diagnóstico opcional com `?gvperf=1`.
- Projetos e redirecionamentos da v22 preservados.

# Histórico consolidado

## v22 — Textos, ícones e estrutura do pacote
- Removido “mais forte” do parágrafo do CTA e “stronger” da tradução inglesa.
- Removidos somente os rótulos “Ano, 2026” e “Year, 2026” dos três dossiês, preservando papéis e descrições.
- Setas dos links “Ver projeto” criadas em SVG para renderização igual em mobile e desktop (sem emoji).
- Separados arquivos do site em `css/`, `js/`, `assets/`, `vendor/` e `projetos/`.
- Removidos 16 previews e notas históricas da raiz do pacote; README e histórico consolidados.
- Corrigidos os links internos do Atelier Noir e os caminhos relativos das páginas do Elegant Fonts para funcionar em arquivos locais.
- Removidos scripts de rastreamento das cópias locais dos projetos, não necessários para apresentação.

## Versões anteriores
- v18: revisão textual e PT/EN.
- v19: exibição integral das imagens dos projetos.
- v20: composição 40/60 e nomes em uma linha.
- v21: molduras discretas e iniciais em baixa opacidade no mobile.

## Mantido
Rolagem horizontal da galeria, revelações do Sobre, navegação, acordeão do Processo, CTA, rodapé e integrações Lenis/fallback.

## v34 — Leitura do Sobre
- Parágrafos visualmente unificados, conteúdo original preservado.
- Melhor compasso tipográfico e intervalos do Sobre, sem mudança de identidade.
