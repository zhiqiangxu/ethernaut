// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { expect } = require("chai");
const { getContractAddress } = require('@ethersproject/address');


async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy

    const signers = await hre.ethers.getSigners();
    MagicNum = await hre.ethers.getContractFactory("MagicNum");
    target = await MagicNum.deploy();
    await target.deployed();

    /**
     * $ cat ctor.yul 
        {
            codecopy(0,12,10)
            return(0, 10)
        }

        $ cat ret.yul 
        {
            mstore(0,42)
            return(0,0x20)
        }
     */

    var bytecode = "0x600a600c600039600a6000f3602a60005260206000f3";
    tx = await signers[0].sendTransaction({ data: bytecode })
    // const tx = await hre.ethers.provider.sendTransaction({ from: signers[0], data: bytecode, to: 0x0000000000000000000000000000000000000000 });



    const targetAddr = getContractAddress({ from: signers[0].address, nonce: tx.nonce - 1 });
    const solverAddr = getContractAddress({ from: signers[0].address, nonce: tx.nonce });


    const targetCode = await hre.ethers.provider.getCode(targetAddr);
    const solverCode = await hre.ethers.provider.getCode(solverAddr);
    console.log("solverCode", solverCode, "targetCode", targetCode, "solverAddr", solverAddr, "solverCodeSize", await target.solverCodeSize(), "selfCodeSize", await target.selfCodeSize());



    tx = await target.setSolver(solverAddr);
    await tx.wait();

    expect(await target.solver()).to.equal(solverAddr);



    expect(await target.isSolved()).to.equal(true);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
