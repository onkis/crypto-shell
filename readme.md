# Welcome to Cypto Shell. A holding place for initial crypto ideas

The crypto ecosystem moves very quickly. Being able to adapt rapidly is important

This branch is all about building a "traditional" node/express/knex app shell

1. express shell <Done>
2. Simple "pug" views <Done>
3. Model Layer (knex) <Done>
4. build for deployment with esbuild/caxa? (single files?) <Done>
5. login
6. Logger?
7. use .env for secrets 
8. deployment
9. "Merchant/Non Profit" fake page <DONE>
10. Solana Pay "Button" deployed to merchant page. Hardcoded accounts <DONE>
11. "Donate" Button
12. Donation "Account"
13. Solana Program that provides security/chargeback capability ?
14. Unit test setup (mocha?)


# Using the Solana CLI refrence

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