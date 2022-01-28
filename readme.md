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