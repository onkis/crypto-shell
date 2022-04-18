resource "aws_db_instance" "crypo-shell-main-db" {
  identifier             = "crypo-shell-main-db"
  instance_class         = "db.t3.micro"
  
  #having both sets up auto scaling
  allocated_storage      = 5
  max_allocated_storage  = 100
  
  engine                 = "postgres"
  engine_version         = "14.1"
  family                 = "postgres14" # DB parameter group
  major_engine_version   = "14"         # DB option group


  username               = "crypto-shell-main-db"
  password               = var.db_password
  
  
  port                   = 5432
  
  multi_az               = false
  
  db_subnet_group_name   = aws_db_subnet_group.cs-private.name
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  
  parameter_group_name   = aws_db_parameter_group.education.name
  publicly_accessible    = false
  
  
  
  maintenance_window              = "Sun:00:00-Sun:01:00"
  backup_window                   = "01:00-02:00"


  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]

  create_cloudwatch_log_group     = true
  
  backup_retention_period = 30
  skip_final_snapshot     = false
  deletion_protection     = true
  
  performance_insights_enabled          = true
  performance_insights_retention_period = 7
  create_monitoring_role                = true
  monitoring_interval                   = 60
  monitoring_role_name                  = "cs-db-monitoring-role-name"
  monitoring_role_description           = "CryptoShell PG db Monitoring role"
  
  parameters = [
    {
      name  = "autovacuum"
      value = 1
    },
    {
      name  = "client_encoding"
      value = "utf8"
    }
  ]

}