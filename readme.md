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
11. "Donate" Button
12. Donation "Account"
13. Solana Program that provides security/chargeback capability ?
14. Unit test setup (mocha?)
15. need static assets for wallet app icon

# Things to install
1. postgres.app https://postgresapp.com/

2. redis
```
  brew install redis
  #to restart the service
  brew services restart redis
```

3. nvm
https://github.com/nvm-sh/nvm#install--update-script

4. node latest (16) and set to default
```
nvm install v16
nvm alias default v16
```

5.
setup a .env file
```
GMAIL_USER=""
GMAIL_PASSWORD=""
REDIS_CONN="redis://127.0.0.1:6379"
PG_CONN="postgresql://postgres:password@127.0.0.1:5432/crypto-shell_dev"
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
