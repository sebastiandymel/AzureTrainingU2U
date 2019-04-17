const http = require("http");
const os = require('os');
const router = require('./router');

let isHealthy = true;
let isReady = true;

// Handle your routes here, put static pages in ./public and they will server
router.register('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end("V1 request processed by " + os.hostname() + "\n");
});

router.register('/health', function (req, res) {
  if (isHealthy) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Healthy " + os.hostname() + "\n");
  } else {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end("Not healthy " + os.hostname() + "\n");
  }
});

router.register('/stophealth', function (req, res) {
  isHealthy = false;

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end("Health stopped " + os.hostname() + "\n");
});

router.register('/ready', function (req, res) {
  if (isReady) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Ready " + os.hostname() + "\n");
  } else {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end("Not ready " + os.hostname() + "\n");
  }
});

router.register('/stopready', function (req, res) {
  isReady = false;

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end("Ready stopped " + os.hostname() + "\n");
});

router.register('/env', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(`SECRET_USERNAME ${process.env.SECRET_USERNAME} - SECRET_PASSWORD ${process.env.SECRET_PASSWORD}`);
});

router.register('/crash', function (req, res) {
  process.exit(1);
});

// We need a server which relies on our router
var server = http.createServer(function (req, res) {
  handler = router.route(req);
  handler.process(req, res);
});

// Start it up
server.listen(8080);
console.log('Listening on port 8080');