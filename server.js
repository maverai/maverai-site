const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.stl': 'model/stl',
  '.obj': 'model/obj',
  '.mtl': 'text/plain',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  const pathname = req.url.split('?')[0];
  if (pathname === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  let file = req.url === '/' ? '/index.html' : pathname;
  try {
    file = decodeURIComponent(file);
  } catch (_) {}
  file = path.join(__dirname, path.normalize(file).replace(/^[/\\]/, ''));
  const root = path.resolve(__dirname);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(file);
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Serving at http://localhost:${PORT}`);
  console.log('Open the 3D viewer from the RF Tracking Board project.');
});
