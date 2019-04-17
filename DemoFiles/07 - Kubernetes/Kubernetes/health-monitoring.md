# Health Monitoring

## Environment

https://www.katacoda.com/courses/kubernetes/playground

## Demo

create file

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: http-server
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: http-server
    spec:
      containers:
      - name: http-server
        image: u2utraining/nodejs-http-server:health
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          timeoutSeconds: 1
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 15
          timeoutSeconds: 1
          periodSeconds: 10
```

`vi`
right click, paste

press Esc

`:wq deploy.yaml`

`cat deploy.yaml`

create deployment

`kubectl create -f deploy.yaml`

expose deployment

`kubectl expose deployment/http-server --type="NodePort" --port 8080`

check service

`ifconfig docker0` on node01 to get node ip

`kubectl get svc` to get port

`curl <node-ip>:<nodeport>` multiple times

check pods

`kubectl get pods` should be ready

`curl <node-ip>:<nodeport>/health` --> ok

`curl <node-ip>:<nodeport>/ready` --> ok

stop readyness

`curl <node-ip>:<nodeport>/stopready` --> ok

`kubectl get pods` should be not ready, now routed only other pod

stop health

`curl <node-ip>:<nodeport>/stophealth` --> ok

`kubectl get pods` should restart

after restart

`kubectl get pods` see # restarts

`curl <node-ip>:<nodeport>/health` --> ok

`curl <node-ip>:<nodeport>/ready` --> ok

