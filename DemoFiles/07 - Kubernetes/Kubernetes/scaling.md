# Scaling

## Environment

https://www.katacoda.com/courses/kubernetes/playground

## Demo

create deployment

`kubectl run deployment1 --image=u2utraining/nodejs-http-server:v1 --port=8080`

expose

`kubectl expose deployment/deployment1 --type="NodePort" --port 8080`

scale

`kubectl scale deployments/deployment1 --replicas=3`

check progress

`kubectl get deployments`

`kubectl get pods -o wide`

`kubectl get deployments/deployment1 -o yaml`

load balancing

`ifconfig docker0` on node01 to get node ip

`kubectl get svc` to get port

`curl <node-ip>:<nodeport>` multiple times