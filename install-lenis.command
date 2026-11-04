#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p vendor
URL='https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js'
echo 'Instalando Lenis oficial 1.3.27 para uso offline...'
curl --fail --location --retry 2 "$URL" -o 'vendor/lenis.min.js.tmp'
test -s vendor/lenis.min.js.tmp
mv vendor/lenis.min.js.tmp vendor/lenis.min.js
printf '%s\n' 'window.GV_VENDOR_LENIS_PRESENT = true;' > vendor/available.js
echo 'Lenis instalado localmente com sucesso.'
