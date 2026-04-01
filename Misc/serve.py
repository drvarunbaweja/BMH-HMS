import os, http.server, socketserver

os.chdir('/Users/varunbaweja/Downloads/BMH-HMS')
PORT = 5500
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(('', PORT), Handler) as httpd:
    httpd.serve_forever()
