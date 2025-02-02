// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Lock {
    address public owner;
    uint256 public unlockTime;

    event Withdrawal(address indexed sender, uint256 amount, uint256 unlockTime);

    constructor(uint256 _unlockTime) payable {
        require(_unlockTime > block.timestamp, "Unlock time should be in the future");
        owner = msg.sender;
        unlockTime = _unlockTime;
    }

    function withdraw() external {
        require(msg.sender == owner, "You aren't the owner");
        require(block.timestamp >= unlockTime, "You can't withdraw yet");

        uint256 amount = address(this).balance;
        payable(owner).transfer(amount);
        
        emit Withdrawal(msg.sender, amount, unlockTime);
    }
}
