const http = require('http');

let server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "application/json" });
  let body = {currentValue: 1, receivedMessages: []};
  response.end(JSON.stringify(body));
});

let port = process.env.PORT || 3001;
server.listen(port);

console.log("Receiver running at http://localhost:%d", port);