# variables.tf

variable "aws_region" {
  description = "NoVA"
  default     = "us-east-1"
}

variable "ecs_task_execution_role_name" {
  description = "CS ECS Role"
  default = "TFTestEcsTaskExecutionRole"
}

variable "ecs_auto_scale_role_name" {
  description = "CS ECS auto scale role"
  default = "TFTestEcsAutoScaleRole"
}

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = "2"
}

variable "app_image" {
  description = "Docker image to run in the ECS cluster"
  default     = "onkisdocker/crypto-shell:latest"
}

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 3000
}

variable "app_count" {
  description = "Number of docker containers to run"
  default     = 2
}

variable "health_check_path" {
  default = "/"
}

variable "fargate_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = "1024"
}

variable "fargate_memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = "2048"
}

variable "db_port" {
  description = "postgres db port"
  default     = 5432
}