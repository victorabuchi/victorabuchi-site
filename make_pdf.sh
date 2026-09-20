#!/bin/bash
# Regenerates the downloadable résumé PDFs from the live pages' print layout.
# Run from the site root:   bash make_pdf.sh
#
# The street address is NOT in the website. If a local, git-ignored file called
# .pdf-address exists (line 1 = English address line, line 2 = Finnish), it is
# injected into a temporary copy of the page, so it appears in the PDF only.
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=8768
ADDR_FILE=".pdf-address"

python3 serve.py $PORT >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
sleep 1

render() {   # $1 = page path, $2 = output pdf, $3 = line number in .pdf-address
  local tmp; tmp=$(mktemp /tmp/resume-XXXXXX.html)
  curl -s "http://localhost:$PORT/$1" > "$tmp"
  python3 - "$tmp" "$ADDR_FILE" "$3" "$PORT" <<'PY'
import html, os, sys
page, addr_file, line_no, port = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
text = open(page, encoding='utf-8').read()
addr = ''
if os.path.exists(addr_file):
    lines = open(addr_file, encoding='utf-8').read().splitlines()
    if len(lines) >= line_no:
        addr = lines[line_no - 1].strip()
if addr:
    text = text.replace('<!--pdf-address-->', '<li>' + html.escape(addr) + '</li>')
text = text.replace('<head>', '<head><base href="http://localhost:%s/">' % port, 1)
open(page, 'w', encoding='utf-8').write(text)
PY
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=6000 \
    --print-to-pdf="$PWD/$2" "file://$tmp" >/dev/null 2>&1
  rm -f "$tmp"
  echo "wrote $2 ($(du -h "$2" | cut -f1))"
}

render "resume/"    "assets/Victor-Abuchi-Resume.pdf"    1
render "fi/resume/" "assets/Victor-Abuchi-Resume-fi.pdf" 2
