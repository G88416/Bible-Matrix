const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const rootDir = __dirname;

app.disable('x-powered-by');
app.use(express.static(rootDir));

app.get('/__/health', (_req, res) => {
  res.status(200).send('ok');
});

app.get(/^\/(?!.*\.).*/, (_req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Bible Matrix listening on port ${port}`);
});
