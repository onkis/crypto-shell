# Giftcard Application
A cloudflare serverless application

This project was built with Nodejs v16

Install cloudflare wrangler
```
npm install -g @cloudflare/wrangler
```

Install npm packages
```
npm install
```


login to cloudflare account. This might not be required
```
wrangler login
```


to run the application locally
```
wrangler dev
```
then visit http://127.0.0.1:8787/


Connecting to Postgres

To connect to a local postgres db you'll need to have a local
postgres db running ()
https://postgresapp.com/

install cloudflare's tunnel service
```
brew install cloudflare/cloudflare/cloudflared
```
More on that Tunnel service here: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/create-tunnel

instructions followed
https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide

Setup a tunnel config like this
~/.cloudflared/config.yml
```
url: tcp://localhost:5432
tunnel: d794ce22-e94d-4222-8d6d-258a8df71b16
credentials-file: /Users/mike/.cloudflared/d794ce22-e94d-4222-8d6d-258a8df71b16.json
```



## Builds

The wrangler cli tool is configured by the [wrangler.toml](https://developers.cloudflare.com/workers/cli-wrangler/configuration) file
In the toml file a "build" step is specified
The build command is "make build"

The make task ensures the /dist directory is removed
and can be modified to run any additional scripts/steps