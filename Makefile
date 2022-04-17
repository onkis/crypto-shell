#.PHONY db-migrate migration-create test-site

build: build-ui
	./node_modules/.bin/caxa --input "./" --output "crypto-shell" -- "{{caxa}}/node_modules/.bin/node" "{{caxa}}/app.mjs"

build-app: build-ui
	./node_modules/.bin/esbuild app.mjs --bundle --platform=node --external:./node_modules/* --outfile=./app-built.js --format=cjs

build-ui:
	node ./scripts/build_all_ui.mjs

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

del-rate-limits:
	node scripts/delete_all_rate_limits.mjs

docker: build-ui
	docker build -t crypto-shell -f ./infra/Dockerfile .