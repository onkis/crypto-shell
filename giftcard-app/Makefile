.PHONY: clean, build

clean:
	rm -rf ./dist

build:
	node_modules/.bin/esbuild --bundle --sourcemap --outfile=dist/main.mjs --format=esm ./app.js --external:*.wasm --inject:./lib/deno/workers-override.ts
	cp ./lib/driver/**/*.wasm ./dist
	#node_modules/.bin/webpack --mode development