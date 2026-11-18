# Auditoria conservadora de arquivos e dependências

- Fonte: `Arquivo_Vivo_v37_Texto_Centralizado_Teste.zip`.
- **Visual:** nenhuma declaração CSS foi redefinida; os overlays v32–v37 foram apenas concatenados na ordem original.
- **Código morto:** removidas somente regras de CSS cuja classe/ID não aparece em nenhum HTML ou JavaScript do pacote. Esta é uma limpeza conservadora, não um refactor de animações.
- **Remoções:** notas de versões antigas, Dependabot npm sem `package.json`, `favicon.png` duplicado de `assets/gv-original.png`, `og-image.jpg` sem referência no HTML, documentação duplicada de `vendor/`.
- **Mantidos de propósito:** `js/performance-probe.js` (ativado por `?gvperf=1`), `js/engine.js` (motor + fallback local), `js/editorial.js`, `vendor/available.js` e `tools/install-lenis.command` (suporte opcional offline).
- **Sites preservados:** Atelier Noir, Font Pairing e Elegant Fonts, incluindo páginas internas e imagens.
- **Distribuição:** a organização é um ZIP local de testes; nada foi alterado no GitHub/Vercel.

## Verificações técnicas

O código de animação e as traduções do site principal permaneceram byte a byte idênticos. A consolidação do CSS preserva a ordem dos estilos, e os arquivos de projetos foram mantidos sem alterações.

## Resultado dos testes nesta cópia

- `node --check` em todos os arquivos JavaScript: sem erros.
- Todos os 67 caminhos locais referenciados nos HTMLs resolvidos (incluindo rotas em forma de diretório).
- 320, 390, 768, 1024 e 1440 px: propriedades e dimensões dos principais componentes idênticas à v37 em renderização comparativa com movimento reduzido.
- Testadas alternância PT/EN, navegação mobile, abertura de acordeões, contagem de quatro princípios e cinco itens de escopo.
- Galeria horizontal em desktop (1440 px) e emulação mobile (390 px): percorreu os três projetos.
- Os três subprojetos e seus arquivos são idênticos, byte a byte, à origem v37.
- Validação em Chromium automatizado; a fluidez perceptiva real deve continuar sendo conferida em Safari no Mac/iPhone.
