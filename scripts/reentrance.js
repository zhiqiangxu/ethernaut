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

    const signers = await hre.ethers.getSigners();
    Reentrance = await hre.ethers.getContractFactory("contracts/Reentrance.sol:Reentrance");
    r = await Reentrance.deploy();
    await r.deployed();

    donateTx = await r.donate(signers[0].address, { value: 100 });
    await donateTx.wait();


    {
        balance0 = await r.balanceOf(signers[0].address);
        expect(balance0.toNumber()).to.equal(100);
    }


    ReentranceAtt = await hre.ethers.getContractFactory("ReentranceAtt");
    const rt = await ReentranceAtt.deploy();
    await rt.deployed();

    const attackTx = await rt.attack(r.address, 60, { value: 60 });
    await attackTx.wait();

    expect((await hre.ethers.provider.getBalance(r.address)).toNumber()).to.equal(40);


}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
