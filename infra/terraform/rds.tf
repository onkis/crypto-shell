module "db" {
  source  = "terraform-aws-modules/rds/aws"

  identifier = "crypto-shell-main-db"

  engine            = "postgresql"
  engine_version    = "14.2"
  instance_class    = "db.t3a.micro"
  allocated_storage = 5

  db_name  = "crypto-shell_prod"
  username = "postgres"
  port     = "5432"

  iam_database_authentication_enabled = true

  vpc_security_group_ids = [aws_security_group.rds.id]
  
  maintenance_window = "Sun:00:00-Sun:01:00"
  backup_window      = "01:00-02:00"

  # Enhanced Monitoring - see example for details on how to create the role
  # by yourself, in case you don't want to create it automatically
  monitoring_interval = "30"
  monitoring_role_name = "TFTestRDSMonitoringRole"
  create_monitoring_role = true

 
  major_engine_version = "14"
  
  family = "postgres14"
  # Database Deletion Protection
  deletion_protection = true
}