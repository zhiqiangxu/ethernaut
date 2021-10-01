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
    Fallback = await hre.ethers.getContractFactory("Fallback", signers[1]);
    fb = await Fallback.deploy();

    await fb.deployed();

    expect(await fb.owner()).to.equal(signers[1].address);

    fb = fb.connect(signers[0])


    expect((await fb.getContribution()).toNumber()).to.equal(0);

    const contributeTx = await fb.contribute({ value: 1 })
    await contributeTx.wait();
    expect((await fb.getContribution()).toNumber()).to.gt(0);

    await signers[0].sendTransaction({ to: fb.address, value: 1 })

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
