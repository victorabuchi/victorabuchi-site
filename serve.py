#!/usr/bin/env python3
"""Local preview server for this site.

Usage:  python3 serve.py [port]      (default port 8000, then open http://localhost:8000)

It is a plain static server with one difference from `python3 -m http.server`:
it tells the browser never to cache anything, so you always see the latest files.
"""
import http.server
import socketserver
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, max-age=0')
        super().end_headers()


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    with Server(('', port), NoCacheHandler) as httpd:
        print(f'Serving on http://localhost:{port}  (no caching)  -  Ctrl+C to stop')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nStopped.')
