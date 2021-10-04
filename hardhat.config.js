require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: "https://rinkeby.arbitrum.io/rpc",
      accounts: ["55fb4957a2dd9194c1cdc8cc40c9e1ff8fa6ce1f6af499d456d2a33a55e0f13b", "d204c1f20ef84d70b26af8347c409904e019a260abebf1f6fefa3f4dec3b8fa9"]
    }
  },
  solidity: {
    compilers: [
      { "version": "0.6.0" },
      { "version": "0.5.0" },
      { "version": "0.8.4" },
    ]
  },
};
