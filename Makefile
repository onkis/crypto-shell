#.PHONY db-migrate migration-create

clean:
	rm -r ./dist/

build-app:
	./node_modules/.bin/esbuild app.mjs --bundle --platform=node --external:./node_modules/* --outdir=./dist --format=cjs

db-migrate:
	./node_modules/.bin/knex migrate:latest --knexfile=./db/knexfile.js --migrations-directory=./db/migrations

migration-create:
	./node_modules/.bin/knex migrate:make new_migration --knexfile=./db/knexfile.js --migrations-directory=./db/migrations