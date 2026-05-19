const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const rootDir = __dirname;
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const manifestJson = fs.readFileSync(path.join(rootDir, 'manifest.json'), 'utf8');
const serviceWorkerJs = fs.readFileSync(path.join(rootDir, 'sw.js'), 'utf8');

app.disable('x-powered-by');

app.use('/icons', express.static(path.join(rootDir, 'icons')));

app.get('/__/health', (_req, res) => {
  res.status(200).send('ok');
});

app.get('/manifest.json', (_req, res) => {
  res.type('application/manifest+json').send(manifestJson);
});

app.get('/sw.js', (_req, res) => {
  res.type('application/javascript').send(serviceWorkerJs);
});

app.get(/^\/(?!.*\.).*/, (_req, res) => {
  res.type('html').send(indexHtml);
});

app.listen(port, () => {
  console.log(`Bible Matrix listening on port ${port}`);
});
