# Welcome to Cypto Shell. A holding place for initial crypto ideas

Initial Use case: Give the gift of crypto. Allow user to gift crypto to an email address.
Eventually allow a Marketer to upload a list of email address to do similar gifting as a part of a campaign


##Lerna
This project is a lerna(https://github.com/lerna/lerna) repo

Might be necessary to run 

```
npm install -g lerna
```
for some functionality


To Make a "shared" module

```
cd packages
lerna create cs-<packgeName>
```

"cs-" is the namespace for the private crypto shell modules

When you require this module in your package json use
```
"dependencies": {
	"cs-<packageName>": "file:../cs-<packageName>"
  }
```

Then Link the packages
```
lerna bootstrap
```




##Major Components

This will contain the cloudflare app that allows users to setup email => giftcard parings
```
/giftcard-app/
```


This will contain the wallet app. Probably cloudflare and chrome ext based. This will allow a gift recipient to redeem their crypto. Send it to another wallet or take other actions in the ecosystem.
```
/wallet-app
```





## Issues so far with cloudflare
1. Lack of clear "happy" Path within the platform
workers, modules, pages, page functions
which to chose and why? What will have the best support?
Where will the edge cases be?

To me it currently seems like we should implement a single worker, via the module api
and take advantage of the kv asset handler API if it makes sense
```
import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
```

Otherwise we should just roll our own like our initial implementation