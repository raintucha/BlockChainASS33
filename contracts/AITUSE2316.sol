// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AITUSE2316 is ERC20 {
    address public owner;
    mapping(address => uint256) private lastTransactionTimestamp;

    constructor(uint256 initialSupply) ERC20("AITU_GROUP1", "UGT") {
    owner = msg.sender;
    _mint(msg.sender, initialSupply * 10 ** decimals());
}


    function getLatestTransactionTimestamp(address account) public view returns (uint256) {
    return lastTransactionTimestamp[account];
}

    function _update(address from, address to, uint256 value) internal override {
        super._update(from, to, value);
        lastTransactionTimestamp[from] = block.timestamp;
        lastTransactionTimestamp[to] = block.timestamp;
    }
}
