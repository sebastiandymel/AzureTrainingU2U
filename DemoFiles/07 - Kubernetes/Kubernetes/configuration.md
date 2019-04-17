# Configuration

## Environment

https://www.katacoda.com/courses/kubernetes/playground

## Demo

create secret file (base64 encoded data)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  username: UGVwaXRv
  password: SUxpa2VNZW1lcw==
```

`vi`

right click, paste

press Esc

`:wq secret.yaml`

`cat secret.yaml`

create secret

`kubectl create -f secret.yaml`

create deployment file 

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: http-server
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: http-server
    spec:
      containers:
      - name: http-server
        image: u2utraining/nodejs-http-server-health:v1
        ports:
        - containerPort: 8080
        env:
        - name: SECRET_USERNAME
          valueFrom:
            secretKeyRef:
              name: mysecret
              key: username
        - name: SECRET_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysecret
              key: password
```

create deployment

`kubectl create -f deploy.yaml`

expose deployment

`kubectl expose deployment/http-server --type="NodePort" --port 8080`

check service

`ifconfig docker0` on node01 to get node ip

`kubectl get svc` to get port

`curl <node-ip>:<nodeport>/env`

code in app

```javascript
router.register('/env', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(`SECRET_USERNAME ${process.env.SECRET_USERNAME} - SECRET_PASSWORD ${process.env.SECRET_PASSWORD}`);
});
```
