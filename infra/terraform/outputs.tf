# outputs.tf

output "alb_hostname" {
  value = aws_alb.cs-main.dns_name
}