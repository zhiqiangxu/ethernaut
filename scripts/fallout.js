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
    Fallout = await hre.ethers.getContractFactory("Fallout", signers[1]);

    fb = await Fallout.deploy();

    await fb.deployed();

    expect(await fb.owner()).to.equal('0x0000000000000000000000000000000000000000');

    fb = fb.connect(signers[0]);

    fal1outTx = await fb.Fal1out()
    await fal1outTx.wait();

    expect(await fb.owner()).to.equal(signers[0].address);


}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
