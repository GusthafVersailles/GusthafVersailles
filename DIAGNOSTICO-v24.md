# Arquivo Vivo v24 — diagnóstico de estabilidade (produção)

Esta versão parte diretamente da v22, não da v23.

Em `js/motion.js`, as posições dos elementos são lidas antes de atualizar classes, textos e transformações por quadro, reduzindo potenciais recálculos síncronos de layout. Não são armazenadas coordenadas entre quadros.

Lenis (`lerp: 0.072`), animações, galeria horizontal, breakpoints, textos PT/EN, links, imagens e os três projetos foram preservados.

## Monitor opcional no Safari

Acesse `https://gusthafversailles.com/?gvperf=1`. O painel mostra motor, FPS estimado, percentil 95 de duração de quadros, quadros acima de 25ms, tarefas longas e deslocamento de layout quando o navegador disponibilizar essas métricas. Retire o parâmetro da URL para desativar o monitor.

## Limitação

Os testes automatizados em Chromium não substituem a validação de desempenho no Safari/macOS ou em dispositivos reais. A v23 não foi publicada.
