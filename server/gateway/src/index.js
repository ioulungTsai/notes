/**
 * Main application router for gateway
 */
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('get /');
  res.send('<h1>Hello from Express!</h1>');
});

const port = process.env.port || 8080;

app.listen(port, () => {
  console.log(`server up and listening on the port ${port}!`);
});
