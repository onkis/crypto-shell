# logs.tf

# Set up CloudWatch group and log stream and retain logs for 30 days
resource "aws_cloudwatch_log_group" "cs_log_group" {
  name              = "/ecs/cs-app"
  retention_in_days = 30

  tags = {
    Name = "cs-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "cs_log_stream" {
  name           = "cs-log-stream"
  log_group_name = aws_cloudwatch_log_group.cs_log_group.name
}