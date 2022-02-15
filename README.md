# Vanilla Juicenet (Stake) UI

## Installing Dependencies
```bash
git clone git@github.com:vanilladefi/stake.git
cd stake
yarn install
```

## Development

To get the Vanilla Juicenet UI running, you must first copy & define the environment variables in `.env.example` to `.env`. The UI is currently by default configured to run on the **Polygon Mumbai public testnet**.

```bash
cp .env.example .env
```
### Polygon Mainnet

After that's done, you can customize the environment variables to use your own Alchemy API keys or run the UI on top of a different deployed contract address and network. For example, to run the UI on the Polygon mainnet, you must change the `NEXT_PUBLIC_NETWORK` to equal `matic` and the `NEXT_PUBLIC_CHAIN_ID` to equal `137`. Together with this, you must get a Polygon mainnet API key to set in `NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY`.

NOTE: **The `NEXT_PUBLIC_ALCHEMY_ETHEREUM_API_KEY` can be left as-is, but if you run into rate limiting issues, we recommend you get your own API key for the Ethereum mainnet too.** The Ethereum mainnet is _only_ used for fetching the user's VNL balance.

### Local Polygon Mainnet Fork

For new feature development it's good to use a local network rather than a public testnet. To enable this, `NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY` must be removed, the `NEXT_PUBLIC_CHAIN_ID` set to your local testnet's chain ID (`137` for https://github.com/vanilladefi/juicenet-contracts right now.), and `NEXT_PUBLIC_NETWORK` set to `local`.

Remember to use the correct network with your wallets and use test accounts for testing!
