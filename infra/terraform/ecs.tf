# ecs.tf

resource "aws_ecs_cluster" "cs-main" {
  name = "cs-cluster"
}

data "template_file" "cs_app" {
  template = file("./templates/cs_app.json.tpl")

  vars = {
    app_image      = var.app_image
    app_port       = var.app_port
    fargate_cpu    = var.fargate_cpu
    fargate_memory = var.fargate_memory
    aws_region     = var.aws_region
  }
}

resource "aws_ecs_task_definition" "cs-app" {
  family                   = "cs-app-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  container_definitions    = data.template_file.cs_app.rendered
}

resource "aws_ecs_service" "cs-main" {
  name            = "cs-service"
  cluster         = aws_ecs_cluster.cs-main.id
  task_definition = aws_ecs_task_definition.cs-app.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.cs-private.*.id
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.cs-app.id
    container_name   = "cs-app"
    container_port   = var.app_port
  }

  depends_on = [aws_alb_listener.front_end, aws_iam_role_policy_attachment.ecs_task_execution_role]
}