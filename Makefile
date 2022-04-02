#.PHONY db-migrate migration-create test-site

build:
	./node_modules/.bin/caxa --input "./" --output "crypto-shell" -- "{{caxa}}/node_modules/.bin/node" "{{caxa}}/app.mjs"

build-app:
	./node_modules/.bin/esbuild ./frontend/donate.js  --outfile=./public/dist/js/donate_script.js --bundle --define:global=window --minify --inject:frontend/esbuild.inject.js
	./node_modules/.bin/esbuild app.mjs --bundle --platform=node --external:./node_modules/* --outfile=./app-built.js --format=cjs

build-uikit:
	node frontend/uikit_build.js

build-uikit-static:
	node frontend/uikit_static_build.js

build-vue-app:
	node frontend/es_build_app.js

clean:
	rm app-built.js
	rm crypo-shell

clean-ui:
	rm -r ./dist

db-migrate:
	./node_modules/.bin/knex migrate:latest --knexfile=./db/knexfile.js --migrations-directory=./db/migrations

migration-create:
	./node_modules/.bin/knex migrate:make new_migration --knexfile=./db/knexfile.js --migrations-directory=./db/migrations

test-site:
	python3 -m http.server --directory ./test_site