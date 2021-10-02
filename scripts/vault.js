// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { expect } = require("chai");

var Zeros = "0x0000000000000000000000000000000000000000000000000000000000000000";

function stringToBytes32(str) {
    let bytes = ethers.utils.toUtf8Bytes(str);
    if (bytes.length > 31) { throw new Error('too long'); }
    return ethers.utils.concat([bytes, Zeros]).slice(0, 32);
}

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy

    Vault = await hre.ethers.getContractFactory("Vault");
    const v = await Vault.deploy(stringToBytes32("abc"));
    await v.deployed();

    expect(await v.locked()).to.equal(true);
    const psw = await hre.ethers.provider.getStorageAt(v.address, 1);
    const unlockTx = await v.unlock(psw);
    await unlockTx.wait();

    expect(await v.locked()).to.equal(false);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
