// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor () ERC20('Optimism NFT Token', "ONC") {
        _mint(msg.sender, 700 * (10 ** uint256(decimals()))); // 700 ONC tokens
    }
}
