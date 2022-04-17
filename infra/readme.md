# Infra
This folder contains all the production configuration. To run this you will need docker installed
and Terraform.

Docker Install[https://docs.docker.com/desktop/mac/install/]

Terraform Install
First Add the hashicorp tap
```
brew tap hashicorp/tap
```

Install Terraform
```
brew install hashicorp/tap/terraform
```


Here are a few useful commands:

Build docker image
```
docker build -t crypto-shell .
```

Tag the build
```
docker tag crypto-shell onkisdocker/crypto-shell
```

Publish docker image
```
docker push onkisdocker/crypto-shell
```

Terraform Commands

See what an apply will do
```
terraform plan
```

```
terraform apply
```

destroy infra
```
terraform destroy
```