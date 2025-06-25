// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Coffee {
    // Event to emit when someone buys a coffee
    event NewCoffee(
        address indexed from,
        uint256 timestamp,
        string name,
        string message,
        uint256 amount
    );

    // Struct to hold coffee details
    struct CoffeeMemo {
        address from;
        uint256 timestamp;
        string name;
        string message;
        uint256 amount;
    }

    // Owner of the contract (you)
    address payable public owner;

    // List of all coffees
    CoffeeMemo[] public coffees;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * Buy a coffee for the owner
     * @param _name name of the sender
     * @param _message a nice message from the sender
     */
    function buyCoffee(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Donation must be greater than 0");

        coffees.push(CoffeeMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message,
            msg.value
        ));

        emit NewCoffee(msg.sender, block.timestamp, _name, _message, msg.value);
    }

    /**
     * Withdraw all funds to the owner
     */
    function withdrawTips() public {
        require(msg.sender == owner, "Only owner can withdraw");
        owner.transfer(address(this).balance);
    }

    /**
     * Get all coffee messages
     */
    function getCoffees() public view returns (CoffeeMemo[] memory) {
        return coffees;
    }

    function leaveMessage(string memory _name, string memory _message) public {
    coffees.push(CoffeeMemo(
        msg.sender,
        block.timestamp,
        _name,
        _message,
        0
    ));

    emit NewCoffee(msg.sender, block.timestamp, _name, _message, 0);
}

}
