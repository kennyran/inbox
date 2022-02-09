pragma solidity ^0.4.17; // specifys solidity version and lets the compiler know to behave based on that version

//Define the contract
contract Inbox {
    //declare an instance
    // it is a public (accessible by anyone) type string variable in the contract
    // this is a storage variable and will automatically be stored with the contract on the blockchain
    string public message;

    // public function named inbox with an argument string & a name of 'initialMessage'
    // This function will most likely be automatically invoked when deployed to the blockchain
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    // must be called with a string
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
