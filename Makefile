#.PHONY db-migrate migration-create

db-migrate:
	./node_modules/.bin/knex migrate --knexfile=./db/knexfile.js --directory=./db/migrations

migration-create:
	./node_modules/.bin/knex migrate:make new_migration --knexfile=./db/knexfile.js --migrations-directory=./db/migrations