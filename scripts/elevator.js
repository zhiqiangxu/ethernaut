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
    Elevator = await hre.ethers.getContractFactory("Elevator");
    e = await Elevator.deploy();
    await e.deployed();

    expect(await e.top()).to.equal(false);

    ElevatorAtt = await hre.ethers.getContractFactory("ElevatorAtt");
    const et = await ElevatorAtt.deploy();
    await et.deployed();

    const attackTx = await et.attack(e.address, 60);
    await attackTx.wait();

    expect(await e.top()).to.equal(true);


}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
