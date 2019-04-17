const http = require('http');
const repo = require('./repository');

//Add code here

const server = http.createServer(function (request, response) {
  const numberToMake = repo.getNumber() + 1;

  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(`Message ${numberToMake} sent`);
});

const port = process.env.PORT || 3000;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
