const http = require('http');
const azure = require('azure');
const repo = require('./repository');
const ev = require('./events');

const TOPIC_NAME = 'Numbers';

let serviceBusService = azure.createServiceBusService();

serviceBusService.createTopicIfNotExists(TOPIC_NAME, (error) => {
  if (!error) {
    console.log('topic created or exists.');
  }
});


function updateNumber(number) {

  //add ready event
  let event = new ev.NumberIntegrationEvent(number, ev.EventState.READY);
  repo.addEvent(event);

  //update local data
  repo.setNumber(number);

  //send message
  sendMessage(number, error => {
    if (error) {
      console.error(error);
    } else {
      //mark event as published
      repo.updateEvent(event, ev.EventState.PUBLISHED);
    }

  });
}

function sendMessage(number, callback) {
  let message = {
    body: `This is Message #${number}`,
    customProperties: {
      messagenumber: number
    }
  };

  serviceBusService.sendTopicMessage(TOPIC_NAME, message, error => callback(error));
}

//check if messages were sent
setInterval(() => {
  let messagenumber = repo.getNumber();

  repo
  .getReadyEvents()
  .forEach(e => {

    //check if send is necessary
    if(e.number === messagenumber){
      sendMessage(e.number);

      //mark event as published
      repo.updateEvent(e, ev.EventState.PUBLISHED);      
    } else {
      //mark event as cancelled
      repo.updateEvent(e, ev.EventState.CANCELLED);
    }

  });

}, 5000);

const server = http.createServer(function (request, response) {
  const numberToMake = repo.getNumber() + 1;
  updateNumber(numberToMake);

  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(`Message ${numberToMake} sent`);
});

const port = process.env.PORT || 3000;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
