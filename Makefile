#.PHONY db-migrate migration-create test-site deploy

build: build-ui
	./node_modules/.bin/caxa --exclude "frontend/*" "data/*" ".git/*" ".env" "test_site/*" "infra/*" "build/*" --input "./" --output "crypto-shell" -- "{{caxa}}/node_modules/.bin/node" "{{caxa}}/app.mjs" 

build-app: build-ui
	./node_modules/.bin/esbuild app.mjs --bundle --platform=node --external:./node_modules/* --outfile=./app-built.js --format=cjs

build-ui:
	NODE_ENV="production" BASE_URL="rotipay.com" node ./scripts/build_all_ui.mjs

clean:
	rm app-built.js
	rm crypo-shell

clean-ui:
	rm -r ./dist

db-migrate:
	./node_modules/.bin/knex migrate:latest --knexfile=./db/knexfile.js

migration-create:
	./node_modules/.bin/knex migrate:make new_migration --knexfile=./db/knexfile.js

deploy:
	node ./scripts/download-build.mjs
	ansible-playbook -i ./infra/hosts.yml ./infra/deploy.yml

test-site:
	python3 -m http.server --directory ./test_site

del-rate-limits:
	node scripts/delete_all_rate_limits.mjs

docker: build-ui
	docker build -t crypto-shell -f ./infra/Dockerfile .