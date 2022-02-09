const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Web3 is capitalized because its is a constructor function (basically a class)
const web3 = new Web3(ganache.provider()); // creates an instance of Web3 and tells it to connect to a local test network.
// in the future ganache.provider will change depending on what network we want to connect to
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // use one of those accounts to deploy the contract
    // need to get access to the contracts bytecode
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ 
        data: bytecode, 
        arguments: ['Hi there!']
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
    
    it('default message', async () => {
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, 'bye')
    });
});


// ****** Example Test Code *******
// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// })

// // no intrinsic link between string 'Car' and class Car. string 'car' is solely for me
// describe('Car', () => {
//     it('is parked', () => {
//         assert.strictEqual(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.strictEqual(car.drive(), 'vroom');
//     });
// });