#.PHONY db-migrate migration-create

clean:
	rm app-built.js

build-app:
	./node_modules/.bin/esbuild app.mjs --bundle --platform=node --external:./node_modules/* --outfile=./app-built.js --format=cjs

db-migrate:
	./node_modules/.bin/knex migrate:latest --knexfile=./db/knexfile.js --migrations-directory=./db/migrations

migration-create:
	./node_modules/.bin/knex migrate:make new_migration --knexfile=./db/knexfile.js --migrations-directory=./db/migrations