# Building Blocks

## Environment

https://www.katacoda.com/courses/kubernetes/playground

check if kubectl is available

`kubectl version`

check if cluster is running

`kubectl cluster-info`

see nodes

`kubectl get nodes`

## Pods

create pod, (nginx is the hello-world of containers, --restart never makes sure it's a pod, not a deployment)

`kubectl run pod1 --image=u2utraining/nodejs-http-server:v1 --port=8080 --restart=Never`

check pod

`kubectl get pods`

`kubectl get pods/pod1`

`kubectl get pods --watch`

`kubectl desribe pods/pod1`

talking to pod

`kubectl proxy` (execute in new terminal)

`curl http://localhost:8001/version`

`curl http://localhost:8001/api/v1/proxy/namespaces/default/pods/pod1/`

executing stuff on pod

`kubectl exec pod1 env`

`kubectl logs pod1`

getting yaml

`kubectl get pod/pod1 -o yaml`

delete pod

`kubectl delete pod --all`

## Deployments

create (--restart Always is default)

`kubectl run deployment1 --image=u2utraining/nodejs-http-server:v1 --port=8080`

check

`kubectl get deployments`

`kubectl get deployments -o yaml`

auto restart pod

`kubectl get pods`

`kubectl delete pods --all`

`kubectl get pods` a new one will be created automatically

## Services

see default service

`kubectl get services`

expose deployment

`kubectl expose deployment/deployment1 --type="NodePort" --port 8080`

check

`kubectl get services` --> get nodeport

`kubectl get services -o yaml`

`kubectl describe services/deployment1`

talk to pod

`ifconfig docker0` on node01 to get node ip

`kubectl get svc` to get port

`curl <node-ip>:<nodeport>`

check labels (were added automatically)

`kubectl describe deployments/deployment1`

`kubectl describe service/deployment1` (look for selector)

`kubectl get pods -l run=deployment1`
