const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const rootDir = __dirname;

const readRequiredFile = (fileName) => {
  const filePath = path.join(rootDir, fileName);

  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Failed to read required file: ${fileName}`);
    throw error;
  }
};

const indexHtml = readRequiredFile('index.html');
const manifestJson = readRequiredFile('manifest.json');
const serviceWorkerJs = readRequiredFile('sw.js');

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

app.get(/.*/, (_req, res) => {
  res.type('html').send(indexHtml);
});

app.listen(port, () => {
  console.log(`Bible Matrix listening on port ${port}`);
});
