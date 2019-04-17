# Docker

## Prep

start from a clean slate
- `docker rm $(docker ps -a -q)`
- `docker rmi $(docker images -q)`

## Pull and Run Docker Image

show docker engine

show docker hub
- repository
- tags

- `docker pull landerdocker/nodejs-http-server:v1`
- `docker images`

run

- `docker run -d -p 4000:8080 landerdocker/nodejs-http-server:v1`

visit `http://localhost:4000`

show images and containers

- `docker images`
- `docker ps`

stop and remove container

- `docker stop <container-name>`
- `docker rm <container-name>`

## Build Docker Image

make node app

```javascript
const http = require('http');
const os = require('os');

let port = process.env.PORT || 3000;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!' + os.hostname);
}).listen(port, () => console.log('Server running on port' + port));
```

create DockerFile

```dockerfile
FROM node:8-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . /app

ENV PORT 8080
EXPOSE 8080

CMD [ "node", "server.js" ]
```

build

- `docker build -t mynodeapp .`

run

- `docker run -d -p 4000:8080 mynodeapp`

logs

- `docker logs <container-name>`

show layers

- `docker history mynodeapp`

## Docker Volumes

- `docker volume create volume1`
- `docker volume ls`
- `docker volume inspect volume1`

```javascript
const fs = require('fs');

http.createServer(function (req, res) {
  fs.appendFileSync('/data/file1.txt', 'hello');
  let file = fs.readFileSync('/data/file1.txt', "utf8");

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(file);
})
```

`docker run -d -p 4000:8080 --mount source=volume1,target=/data mynodeapp`

- `docker stop <container-name>`
- `docker rm <container-name>`
- `docker volume rm volume1`

## Docker Hub

- `docker login`
- `docker tag mynodeapp landerdocker/mynodeapp:v1`
- `docker images`
- `docker push landerdocker/mynodeapp:v1`

## Docker Compose

create `docker-compose.yml`

```yaml
version: "3"
services:
  web:
    # replace username/repo:tag with your name and image details
    image: username/repo:tag
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: 0.1
          memory: 50M
      restart_policy:
        condition: on-failure
    ports:
      - 4000:8080
    volumes:
    - volume1:/data
    networks:
      - webnet
networks:
  webnet:
volumes:
  volume1:
    driver: local
```

`docker swarm init`

`docker stack deploy -c docker-compose.yml servicedemo`

refresh http://localhost:4000

adjust number of replicas and re-run 

`docker stack deploy -c docker-compose.yml servicedemo`

to update

`docker stack rm getstartedlab`

`docker swarm leave --force`

## Docker Swarm

create virtual switch
1. Launch Hyper-V Manager
2. Click Virtual Switch Manager in the right-hand menu
3. Click Create Virtual Switch of type External
4. Give it the name myswitch, and check the box to share your host machine’s active network adapter

- `docker-machine create -d hyperv --hyperv-virtual-switch "myswitch" myvm1`
- `docker-machine create -d hyperv --hyperv-virtual-switch "myswitch" myvm2`

- `docker-machine ls`

- `docker-machine ssh myvm1 "docker swarm init --advertise-addr <myvm1 ip>"`
- `docker-machine ssh myvm2 "docker swarm join --token <token> <myvm1 ip>:2377"`

- `docker node ls`

configure your shell to talk to myvm1
`docker-machine env myvm1`

`"C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe" env myvm1 | Invoke-Expression`

`docker-machine ls`

`docker stack deploy -c docker-compose.yml servicedemo`

`docker service ls`

`docker stack ps servicedemo`

`docker stack rm servicedemo`