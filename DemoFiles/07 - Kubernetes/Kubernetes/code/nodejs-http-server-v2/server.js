const http = require("http");
const os = require('os');

const server = http.createServer(function (request, response) {
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });

  response.end("V2 request processed by " + os.hostname() + "\n");
}).listen(8080);
console.log('Listening on port 8080');