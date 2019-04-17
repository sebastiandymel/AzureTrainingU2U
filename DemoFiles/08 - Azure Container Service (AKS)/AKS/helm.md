# Helm

## Deploy Wordpress

- make sure you already have an AKS
- `helm init`
- `helm install stable/wordpress`
- `kubectl get svc --watch`
- wait for external-ip and browse
- `helm list`
- `helm delete <generated-name>`

## Demo Create
`helm create <some name>` and show folder content
