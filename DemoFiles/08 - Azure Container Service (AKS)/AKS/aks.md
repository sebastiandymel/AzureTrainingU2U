# Azure Container Services (AKS)

## Create the cluster

do this up front!

`az aks create --resource-group aksRG --name myAKSCluster --node-count 2 --generate-ssh-keys`

`az aks get-credentials --resource-group aksRG --name myAKSCluster`

## Deploy application

- `kubectl run deploy1 --image u2utraining/nodejs-http-server:v1`
- `kubectl expose deployment/deploy1 --type LoadBalancer --port 8080`
- `kubectl get svc --watch`

wait until external IP is ready

browse to `<external-IP>:8080`

## Kubernetes Dashboard

`az aks browse --resource-group aksRG --name myAKSCluster`

