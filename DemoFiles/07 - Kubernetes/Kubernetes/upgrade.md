# Upgrade

## Environment

https://www.katacoda.com/courses/kubernetes/playground

## Demo

create (--restart Always is default)

`kubectl run deployment1 --image=u2utraining/nodejs-http-server:v1 --port=8080 --replicas 3`

expose deployment

`kubectl expose deployment/deployment1 --type="NodePort" --port 8080`

check deployment

`kubectl get pods`

check service

`ifconfig docker0` on node01 to get node ip

`kubectl get svc` to get port

`curl <node-ip>:<nodeport>` multiple times

update image

`kubectl set image deployments/deployment1 deployment1=u2utraining/nodejs-http-server:v2`

check deployment

`kubectl get pods`

`kubectl rollout status deployments/deployment1`

check service

`curl <node-ip>:<nodeport>` multiple times