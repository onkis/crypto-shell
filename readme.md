# Welcome to Cypto Shell. A holding place for initial crypto ideas

The crypto ecosystem moves very quickly. Being able to adapt rapidly is important

This branch is all about building a "traditional" node/express/knex app shell

Try the production build at rotipay.com https://rotipay.com/


1. nvm
https://github.com/nvm-sh/nvm#install--update-script

2. node latest (18) and set to default
```
nvm install v18
nvm alias default v18
```

3.
setup a .env file
```
HOTMAIL_USER=""
HOTMAIL_PASS=""
COOKIE_SECRET=""
SQLITE_FILE="/some/path/to/crypt-shell/data/cs-dev.sqlite"
S3_BUCKET=""
S3_ACCESS_KEY=""
S3_ACCESS_KEY_SECRET=""
BASE_URL="localhost:3000"
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
