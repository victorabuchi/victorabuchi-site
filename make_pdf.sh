#!/bin/bash
# Regenerates the downloadable résumé PDFs from the live pages' print layout.
# Run from the site root:  bash make_pdf.sh
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=8768
python3 serve.py $PORT >/dev/null 2>&1 &
SERVER=$!
sleep 1
for pair in "resume/:assets/Victor-Abuchi-Resume.pdf" "fi/resume/:assets/Victor-Abuchi-Resume-fi.pdf"; do
  path="${pair%%:*}"; out="${pair##*:}"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=6000 \
    --print-to-pdf="$PWD/$out" "http://localhost:$PORT/$path" >/dev/null 2>&1
  echo "wrote $out ($(du -h "$out" | cut -f1), $(mdls -name kMDItemNumberOfPages -raw "$out") pages)"
done
kill $SERVER 2>/dev/null || true
