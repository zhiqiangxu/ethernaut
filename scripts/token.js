// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { expect, BigNumber } = require("chai");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const signers = await hre.ethers.getSigners();
    Token = await hre.ethers.getContractFactory("Token", signers[1]);

    token = await Token.deploy(100);

    await token.deployed();

    expect((await token.balanceOf(signers[0].address)).toNumber()).to.equal(0);

    token = token.connect(signers[0]);

    transferTx = await token.transfer('0x0000000000000000000000000000000000000000', 10)
    await transferTx.wait();

    expect((await token.balanceOf(signers[0].address)).toString()).to.equal("115792089237316195423570985008687907853269984665640564039457584007913129639926");


}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
