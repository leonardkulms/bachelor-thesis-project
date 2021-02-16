## setup

### prerequisites

recent npm / yarn installed

ganache (https://www.trufflesuite.com/ganache) installed

truffle is globally installed (if not:
`npm i -g truffle`
)

### general setup:

the client is a submodule, meaning you will have to register it like explained in the following:

`git clone https://github.com/leonardkulms/bachelor-thesis-project`

`cd bachelor-thesis-project`

`yarn install`

`truffle compile`

assumption: a ganache instance is running

`truffle deploy`

Wherever you run truffle deploy, the output of that command will tell you where your contracts are deployed on your local blockchain. So scroll up and you should find
"Replacing AvoToken" below 2_deploy_contracts.js and the contract address it was deployed to.

this contract address is the contractAddress you should paste into the `ethersHelper.js` module.

`cd client`

`yarn install`

`yarn start`

if you run into problems with the 'D' package you might need to run
`npm install d@1.0.1`

get metamask

after installing the browser extension you need to tell metamask that you have a local blockchain network running.
Add 'ganache' with an RPC Server on HTTP://127.0.0.1:7545
If Ganache wants you to set the chain id, try 0x539. If that is wrong it will tell you the right one.
Next, import the 10 ganache accounts with the mnemonic (find this in the ganache application) phrase into metamask. 10 new acounts should be "imported" for you to see.

the first account has owner rights for the admin page and can allow others to purchase tokens.
You will also find that he currently own 1000 AVO.

Only with this account you can allow other addresses (also get these from the ganache app) to buy AVO.

## help

if something is not working out for you, feel free to reach out to me and I'll see if I can help :)
