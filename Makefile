#.PHONY db-migrate migration-create test-site

test-site:
	python3 -m http.server --directory ./test_site

clean:
	rm app-built.js
	rm crypo-shell

clean-ui:
	rm -r ./dist

build-app:
	./node_modules/.bin/esbuild ./frontend/donate.js  --outfile=./public/dist/js/bundle.js --bundle --define:global=window --minify
	./node_modules/.bin/esbuild app.mjs --bundle --platform=node --external:./node_modules/* --outfile=./app-built.js --format=cjs

build:
	./node_modules/.bin/caxa --input "./" --output "crypto-shell" -- "{{caxa}}/node_modules/.bin/node" "{{caxa}}/app.mjs"

db-migrate:
	./node_modules/.bin/knex migrate:latest --knexfile=./db/knexfile.js --migrations-directory=./db/migrations

migration-create:
	./node_modules/.bin/knex migrate:make new_migration --knexfile=./db/knexfile.js --migrations-directory=./db/migrations

build-uikit:
	node frontend/uikit_build.js