const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    // 2 arguments: account mneumonic, and a link/url of the network we wanna connect to (i.e. infura link)
    'common decide grocery spawn chimney label awful trouble snack icon champion essence',
    'https://rinkeby.infura.io/v3/1ed0db279080490bb5a02a515d51213e'
);

const web3 = new Web3(provider); // this instance of web3 is completely enabled for Rinkeby network. 
// we've specified an account and a test network to interact anyway we want with the network

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
};
deploy();