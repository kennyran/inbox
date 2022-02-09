const path = require('path');
const fs = require('fs');
const solc = require('solc');

// generating a path that points directly to the files in the argument
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // passing in the directory name, contracts folder, and inbox.sol file as arguments
// fs is the file system module, specifying utf8 encoding and pointing to inboxPath const 
const source = fs.readFileSync(inboxPath, 'utf8');

// solidity compiler, from this file we are returning the definition of our contract 'Inbox'
module.exports = solc.compile(source, 1).contracts[':Inbox'];