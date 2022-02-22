#.PHONY db-migrate migration-create

db-migrate:
	./node_modules/.bin/knex migrate --knexfile=./db/knexfile.js --directory=./db/migrations

migration-create:
	./node_modules/.bin/knex migrate:make --stub --knexfile=./db/knexfile.js --directory=./db/migrations