.PHONY: clean, build

clean:
	rm -rf ./dist

build:
	node_modules/.bin/esbuild --bundle --sourcemap --outfile=dist/giftcard_api.mjs --format=esm ./giftcard_api.js --external:*.wasm --inject:./lib/deno/workers-override.ts
	cp ./lib/driver/**/*.wasm ./dist