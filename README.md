# Ask Questions.. Share answers.. Earn Coins..
> Inspired by Stackoverflow, Quora, Askfm.. Powered by Internet Computer..

## Backend Canister (Motoko)

deployed at [cyyh5-jqaaa-aaaag-aakqq-cai](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.ic0.app/?id=cyyh5-jqaaa-aaaag-aakqq-cai)

### Interface
```
answer: (nat, text) -> (Bool);
ask: (text) -> (Bool);
upvote: (text, text) -> (Bool);
balanceOf: (principal) -> (Int) query;
queryAllQuestions: () -> (vec text) query;
```

## Frontend Canister (JavaScript)

deployed at [u75p2-siaaa-aaaap-aafaq-cai](https://u75p2-siaaa-aaaap-aafaq-cai.ic0.app/)

### :camera_flash: Demo

![App](https://github.com/7flash/internet-computer-dapp/blob/master/docs/app.gif)

## :trophy: Tokenomics

Rationale: mint coins to incentivize users for participation.. burn coins to prevent system abuse..

![Tokenomics](https://github.com/7flash/internet-computer-dapp/blob/master/docs/tokenomics.gif)

## :package: Installation (development)

```bash
# Clone the project
git clone git@github.com:7flash/internet-computer-dapp.git 
# Enter the project's folder
cd internet-computer-dapp
# Install dependecies
npm i
# Start the replica, running in the background
dfx start --background
# Deploy canisters to the replica
dfx deploy
# Start the development server
npm start
```

## :cloud: Deployment

```
dfx deploy --network ic
```

## 


## :man: Author

**Berlian Gur**

- Github: [@7flash](https://github.com/7flash)

## :handshake: Contributing

Contributions, issues and feature requests are welcome..

Deployment process must be delegated to DAO..

## :man_astronaut: Show your support

Give a ⭐️ if you like this project!
