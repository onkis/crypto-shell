# Welcome to Cypto Shell. A holding place for initial crypto ideas

The crypto ecosystem moves very quickly. Being able to adapt rapidly is important

This branch is all about building a "traditional" node/express/knex app shell

1. express shell <Done>
2. Simple "pug" views <Done>
3. Model Layer (knex) <Done>
4. build for deployment with esbuild/caxa? (single files?) <Done>
5. login <Done>
6. Logger?
7. use .env for secrets <Done>
8. deployment
9. "Merchant/Non Profit" fake page <DONE>
10. Solana Pay "Button" deployed to merchant page. Hardcoded accounts <DONE>
11. "Donate" Button <Done>
12. Donation "Account" <DONE>
13. Solana Program that provides security/chargeback capability ?
14. Unit test setup (mocha?)
15. need static assets for wallet app icon
16. Admin App + donate script gen [MY]
17. Donation With USDC [MY]
18. Donation Modal With QR Code
19. All Settings must be configurable/preview in admin "app"
20. Save indication
21. User Profile information

# Things to install
TODO: postgres is no longer required... might remove this
1. postgres.app https://postgresapp.com/ 

  TODO: redis is no longer required
2. redis
```
  brew install redis
  #to restart the service
  brew services restart redis
```

3. nvm
https://github.com/nvm-sh/nvm#install--update-script

4. node latest (18) and set to default
```
nvm install v18
nvm alias default v18
```

5.
setup a .env file
```
HOTMAIL_USER=""
HOTMAIL_PASS=""
COOKIE_SECRET=""
SQLITE_FILE="/some/path/to/crypt-shell/data/cs-dev.sqlite"
S3_BUCKET=""
S3_ACCESS_KEY=""
S3_ACCESS_KEY_SECRET=""
```

# Using the Solana CLI reference

Installation
```
brew install solana
```

Airdrop 1 SOL testnet
```
solana airdrop 1 <ADDRESS> --url https://api.testnet.solana.com
```

Airdrop 1 SOL devnet
```
solana airdrop 1 <ADDRESS> --url https://api.devnet.solana.com
```

# UIKit
Docs here https://www.creative-tim.com/learning-lab/vue/overview/material-dashboard/
