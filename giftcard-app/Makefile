.PHONY: clean, build

clean:
	rm -rf ./dist

build:
	node_modules/.bin/webpack --mode development
	node ./scripts/deploy_views.js