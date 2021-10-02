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
    LibraryContract = await hre.ethers.getContractFactory("LibraryContract");
    lib = await LibraryContract.deploy();
    await lib.deployed();
    Preservation = await hre.ethers.getContractFactory("Preservation");
    target = await Preservation.deploy(lib.address, lib.address);
    await target.deployed();

    expect(await target.owner()).to.equal(signers[0].address);


    PreservationAtt = await hre.ethers.getContractFactory("PreservationAtt");
    const att = await PreservationAtt.deploy();
    await att.deployed();


    tx = await target.setFirstTime(att.address);
    await tx.wait();

    expect(await target.timeZone1Library()).to.equal(att.address);


    target = target.connect(signers[1]);
    await (await target.setFirstTime(att.address)).wait();

    expect(await target.owner()).to.equal(signers[1].address);

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
