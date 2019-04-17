const http = require('http');
const azure = require('azure');

const TOPIC_NAME = 'Numbers';
const SUBSCRIPTION_NAME = 'NumberProcessor';

let serviceBusService = azure.createServiceBusService();

serviceBusService.getSubscription(TOPIC_NAME, SUBSCRIPTION_NAME, (error) => {
  if (error) {
    console.log('service not found, creating...')
    createSubscription();
  }
});

function createSubscription() {
  serviceBusService.createSubscription(TOPIC_NAME, SUBSCRIPTION_NAME, (error) => {

    if (error) {
      console.warn('warning for createSubscription');
      console.warn(error);
    } else {
      // subscription created
      console.log('subscription created');
    }
  });
}

let receivedMessages = [];
let currentValue = null;
let currentSequenceNumber = null;

function getNextMessage() {
  serviceBusService.receiveSubscriptionMessage(TOPIC_NAME, SUBSCRIPTION_NAME, { isPeekLock: true },
    (error, message) => {
      if (!error) {
        // Message received and locked
        console.log(message);
        receivedMessages.push(message);
        setCurrentValue(message);

        serviceBusService.deleteMessage(message, (deleteError) => {
          if (!deleteError) {
            // Message deleted
            console.log('message has been deleted.');
          }
        })
      }
    });
}

function setCurrentValue(message) {
  if(message.brokerProperties.SequenceNumber > currentSequenceNumber){
    currentSequenceNumber = message.brokerProperties.SequenceNumber;
    currentValue = message.customProperties.messagenumber;
  }
}

setInterval(getNextMessage, 1000);

let server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "application/json" });
  let body = {currentValue: currentValue, receivedMessages: receivedMessages};
  response.end(JSON.stringify(body));
});

let port = process.env.PORT || 3001;
server.listen(port);

console.log("Receiver running at http://localhost:%d", port);
