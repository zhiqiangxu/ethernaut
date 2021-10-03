// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Solver {
    function whatIsTheMeaningOfLife() external view returns (uint256);
}

contract MagicNum {
    address public solver;

    constructor() public {}

    function setSolver(address _solver) public {
        solver = _solver;
    }

    function selfCodeSize() public pure returns (uint256) {
        uint256 x;
        assembly {
            x := codesize()
        }
        return x;
    }

    function solverCodeSize() public view returns (uint256) {
        uint256 x;
        address target = solver;
        assembly {
            x := extcodesize(target)
        }
        return x;
    }

    function isSolved() public view returns (bool) {
        uint256 x;
        address target = solver;
        assembly {
            x := extcodesize(target)
        }

        if (x > 10) {
            return false;
        }

        return Solver(target).whatIsTheMeaningOfLife() == 42;
    }
    /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}
