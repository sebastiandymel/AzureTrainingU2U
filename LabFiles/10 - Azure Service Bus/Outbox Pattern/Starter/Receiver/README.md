# Service Bus Receiver

## Run Application

use `npm start` 

which calls
`npm run docker-build` that builds the container and
`npm run docker-run` that starts the container

Visit [http//:localhost:3001](http//:localhost:3001)

start the debugger to attach to the running process (F5)

## Remove Application

use `npm stop` which calls

`npm run docker-stop` and `npm run docker-rm`