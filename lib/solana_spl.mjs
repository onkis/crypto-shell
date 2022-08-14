/**
 * crypto-shell - solana_spl.mjs
 * @author Mike Ball
 */
export const SPL_ADDR = {
  "mainnet-beta":{
   "USDC": {
    "symbol": "USDC",
    "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
   }
  },
  "testnet": {
    "USDC":{
      "symbol": "USDC",
      "address": "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
      //"CpMah17kQEL2wqyMKt3mZBdTnZbkbfx4nqmQMFDP5vwp" this is the real one
    }
  },
  "devnet":{
    "USDC":{
      "symbol": "USDC",
      "address": "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
    }
  }
};



/* taken from https://github.com/solana-labs/token-list
{
  "chainId": 101, //Mainnet-beta
  "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "symbol": "USDC",
  "name": "USD Coin",
  "decimals": 6,
  "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
  "tags": [
    "stablecoin"
  ],
  "extensions": {
    "coingeckoId": "usd-coin",
    "serumV3Usdt": "77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS",
    "website": "https://www.centre.io/"
  }
},  
  
  
  {
  "chainId": 102, //Testnet
  "address": "CpMah17kQEL2wqyMKt3mZBdTnZbkbfx4nqmQMFDP5vwp",
  "symbol": "USDC",
  "name": "USD Coin",
  "decimals": 6,
  "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/CpMah17kQEL2wqyMKt3mZBdTnZbkbfx4nqmQMFDP5vwp/logo.png",
  "tags": [
    "stablecoin"
  ],
  "extensions": {
    "coingeckoId": "usd-coin",
    "website": "https://www.centre.io/"
  }
},
{
  "chainId": 103, //Devnet
  "address": "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
  "symbol": "USDC",
  "name": "USD Coin",
  "decimals": 6,
  "logoURI": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU/logo.png",
  "tags": [
    "stablecoin"
  ],
  "extensions": {
    "coingeckoId": "usd-coin",
    "website": "https://www.centre.io/"
  }
},**/